"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/inputs/index";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updatePassword } from "@/lib/supabase/auth";
import EyeOpenIcon from "../ui/icons/eye-open";
import EyeCloseIcon from "../ui/icons/eye-close";

export default function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showPasswordVisibility, setShowPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPasswordVisibility((prev) => !prev);
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!newPassword || !confirmPassword) {
      setFormError("Both password fields are required");
      return;
    }

    if (newPassword.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    setLoading(true);

    const { error } = await updatePassword(newPassword);

    if (error) {
      setFormError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-5 py-4 w-full">
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
        <div>
          <h3 className="text-lg font-medium text-navy">Password Reset</h3>
          <p className="text-sm text-slate mt-1">
            Your password has been updated successfully.
          </p>
        </div>

        <Button
          onClick={() => router.push("/dashboard")}
          className="w-full hover:bg-cobalt cursor-pointer bg-navy text-white transition-all shadow-sm"
        >
          Go to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      {formError && (
        <div className="p-3 text-sm text-state-error-text bg-state-error-bg border border-state-error-border rounded-md">
          {formError}
        </div>
      )}

      <div className="space-y-2 relative">
        <Label htmlFor="new-password" className="text-navy font-semibold">
          New Password
        </Label>
        <Input
          id="new-password"
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
        <Label htmlFor="confirm-password" className="text-navy font-semibold">
          Confirm Password
        </Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="Type it again"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="border-subtle focus-visible:ring-sky"
          disabled={loading}
        />
      </div>

      <Button
        type="submit"
        className="w-full hover:bg-cobalt cursor-pointer bg-navy text-white transition-all shadow-sm hover:shadow-md mt-2 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Updating..." : "Reset Password"}
      </Button>
    </form>
  );
}
