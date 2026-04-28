"use client";

import { useState } from "react";
import { Input } from "@/components/ui/inputs/index";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function CreateAccountForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Supabase signup logic will be integrated here later
    console.log("Registering:", { fullName, email, password });
  };

  return (
    <form onSubmit={handleRegister} className="space-y-5 w-full">
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
        />
      </div>

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

      <Button
        type="submit"
        className="w-full cursor-pointer hover:bg-cobalt bg-navy text-white transition-all shadow-sm hover:shadow-md mt-2"
      >
        Create Account
      </Button>
    </form>
  );
}
