import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy">Forgot your password?</h1>
        <p className="text-slate text-sm mt-1">
          Enter your email and we&apos;ll send you a link to reset it.
        </p>
      </div>

      <ForgotPasswordForm />
    </div>
  );
}
