import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy">Reset your password</h1>
        <p className="text-slate text-sm mt-1">Enter your new password.</p>
      </div>

      <ResetPasswordForm />
    </div>
  );
}
