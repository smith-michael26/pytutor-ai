"use client";

import { useState } from "react";
import { Input } from "@/components/ui/inputs/index";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { checkEmailExists, resetPassword } from "@/lib/supabase/auth";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim()) {
      setFormError("Email is required");
      return;
    }

    setLoading(true);

    const emailExists = await checkEmailExists(email);

    if (!emailExists) {
      setLoading(false);
      setFormError("No account found with that email");
      return;
    }

    const { error } = await resetPassword(email);

    if (error) {
      setFormError(error.message);
      setLoading(false);
      return;
    }

    setIsSubmitted(true);
    setLoading(false);
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

      <Button
        type="submit"
        className="w-full hover:bg-cobalt cursor-pointer bg-navy text-white transition-all shadow-sm hover:shadow-md mt-2"
        disabled={loading}
      >
        Send Reset Link
      </Button>
    </form>
  );
}
