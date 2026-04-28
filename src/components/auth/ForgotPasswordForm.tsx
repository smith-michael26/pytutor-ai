"use client";

import { useState } from "react";
import { Input } from "@/components/ui/inputs/index";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    // Supabase password reset logic will go here
    console.log("Sending password reset link to:", email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4 py-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-state-success-bg border border-state-success-border">
          <svg
            className="h-6 w-6 text-state-success-text"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-navy">Check your email</h3>
        <p className="text-sm text-slate">
          We&apos;ve sent a password reset link to{" "}
          <span className="font-semibold">{email}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleReset} className="space-y-5 w-full">
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

      <Button
        type="submit"
        className="w-full hover:bg-cobalt cursor-pointer bg-navy text-white transition-all shadow-sm hover:shadow-md mt-2"
      >
        Send Reset Link
      </Button>
    </form>
  );
}
