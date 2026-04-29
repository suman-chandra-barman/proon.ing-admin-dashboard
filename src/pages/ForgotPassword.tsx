import { useState } from "react";
import { Link, useNavigate } from "react-router";
import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";

function getErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    return data?.message ?? "Request failed. Please try again.";
  }
  return "Request failed. Please try again.";
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      await forgotPassword({ email }).unwrap();
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <AuthShell
      title="Reset your password"
      description="Enter your email to receive the OTP."
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@proon.ing"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        {errorMessage ? (
          <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {errorMessage}
          </p>
        ) : null}
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </Button>
      </form>
      <div className="text-center text-sm text-slate-300">
        <Link to="/login" className="text-[#4DC8FF] hover:text-[#9C27B0]">
          Back to sign in
        </Link>
      </div>
    </AuthShell>
  );
}
