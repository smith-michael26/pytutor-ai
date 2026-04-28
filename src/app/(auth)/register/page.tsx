import CreateAccountForm from "@/components/auth/CreateAccountForm";

export default function RegisterPage() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy">Create your account</h1>
        <p className="text-slate text-sm mt-1">
          Join PyTutor AI to start your Python programming journey.
        </p>
      </div>

      <CreateAccountForm />
    </div>
  );
}
