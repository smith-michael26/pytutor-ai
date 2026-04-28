"use client";

import { useState } from "react";
import Link from "next/link"; // Imported Next.js Link
import { Input } from "@/components/ui/inputs/index";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // We will add Supabase authentication logic here later
    console.log("Logging in with:", email, password);
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6 w-full">
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
        />
      </div>

      <div className="space-y-1.5">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-navy font-semibold">
            Password
          </Label>

          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-subtle focus-visible:ring-sky"
          />
        </div>

        {/* Updated to Next.js Link, added 'block' to ensure right alignment */}
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
      >
        Log In
      </Button>
    </form>
  );
}
