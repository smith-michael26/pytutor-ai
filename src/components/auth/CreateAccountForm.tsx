"use client";

import { useState } from "react";
import { Input } from "@/components/ui/inputs/index";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { setIsLoading, setUser } from "@/store/slices/auth-slice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/supabase/auth";
import EyeCloseIcon from "../ui/icons/eye-close";
import EyeOpenIcon from "../ui/icons/eye-open";

export default function CreateAccountForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPasswordVisibility, setShowPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPasswordVisibility((prev) => !prev);
  };

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!fullName.trim()) {
      setFormError("Fullname is required");
      return;
    }
    if (!email.trim()) {
      setFormError("Email is required");
      return;
    }
    if (!password) {
      setFormError("Password is required");
      return;
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    setLoading(true);
    dispatch(setIsLoading(true));

    const { data, error } = await signUp(fullName, email, password);

    if (error) {
      dispatch(setIsLoading(false));
      setLoading(false);
      setFormError(error.message);
      return;
    }

    if (data.user && data.session) {
      dispatch(setUser({ user: data.user, session: data.session }));
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-5 w-full">
      {formError && (
        <div className="p-3 text-sm text-state-error-text bg-state-error-bg border border-state-error-border rounded-md">
          {formError}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-navy font-semibold">
          Full Name
        </Label>
        <Input
          id="fullName"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="border-subtle focus-visible:ring-sky"
          disabled={loading}
        />
      </div>

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

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-navy font-semibold">
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="border-subtle focus-visible:ring-sky"
          disabled={loading}
        />
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer hover:bg-cobalt bg-navy text-white transition-all shadow-sm hover:shadow-md mt-2"
        disabled={loading}
      >
        {loading ? "Creating Account ..." : "Create Account"}
      </Button>
    </form>
  );
}
