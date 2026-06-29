"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/inputs/index";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setIsLoading, setUser } from "@/store/slices/auth-slice";
import { signIn } from "@/lib/supabase/auth";
import EyeCloseIcon from "../ui/icons/eye-close";
import EyeOpenIcon from "../ui/icons/eye-open";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [showPasswordVisibility, setShowPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPasswordVisibility((prev) => !prev);
  };

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim()) {
      setFormError("Email is required");
      return;
    }

    if (!password.trim()) {
      setFormError("Password is required");
      return;
    }

    setLoading(true);

    const { data, error } = await signIn(email, password);

    if (error) {
      dispatch(setIsLoading(false));
      setLoading(false);
      setFormError(error.message);
      return;
    }

    if (data.user && data.session) {
      dispatch(setUser({ user: data.user, session: data.session }));
      router.push("/dashboard");
      return;
    }

    console.log("Logging in with:", email, password);
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6 w-full">
      {formError && (
        <div className="p-3 text-sm text-state-error-text bg-state-error-bg border border-state-error-border rounded-md">
          {formError}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-navy font-semibold">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="johndoe@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-subtle focus-visible:ring-sky"
          disabled={loading}
        />
      </div>

      <div className="space-y-1.5">
        <div className="space-y-2 relative">
          <Label htmlFor="password" className="text-navy font-semibold">
            Password
          </Label>

          <Input
            id="password"
            type={showPasswordVisibility ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-subtle focus-visible:ring-sky"
            disabled={loading}
          />

          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="text-xs text-navy mt-1 hover:underline focus:outline-none cursor-pointer absolute right-2 top-[54%] transform -translate-y-1/2"
          >
            {showPasswordVisibility ? (
              <EyeCloseIcon className="size-5" />
            ) : (
              <EyeOpenIcon className="size-5" />
            )}
          </button>
        </div>

        <Link
          href="/forgot-password"
          className="block text-sm text-right font-medium text-cobalt hover:text-navy transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full hover:bg-cobalt bg-navy text-white transition-all shadow-sm hover:shadow-md cursor-pointer"
        disabled={loading}
      >
        {loading ? "Signing in ..." : "Sign In"}
      </Button>
    </form>
  );
}
