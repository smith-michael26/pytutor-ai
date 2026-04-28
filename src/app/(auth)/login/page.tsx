import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy">Log in to PyTutor</h1>
        <p className="text-slate text-sm mt-1">
          Enter your details to pick up where you left off.
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
