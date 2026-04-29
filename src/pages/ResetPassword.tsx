import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";

type LocationState = {
  email?: string;
  otpCode?: string;
};

function getErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    return data?.message ?? "Reset failed. Please try again.";
  }
  return "Reset failed. Please try again.";
}

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialEmail = (location.state as LocationState | null)?.email ?? "";
  const initialOtp = (location.state as LocationState | null)?.otpCode ?? "";
  const [email, setEmail] = useState(initialEmail);
  const [otpCode, setOtpCode] = useState(initialOtp);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      await resetPassword({
        email,
        otp_code: otpCode,
        new_password: newPassword,
      }).unwrap();
      navigate("/login", { replace: true });
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <AuthShell
      title="Set new password"
      description="Create a new password to regain access."
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
        <div className="space-y-2">
          <Label htmlFor="otp">OTP code</Label>
          <Input
            id="otp"
            type="text"
            inputMode="numeric"
            placeholder="Enter 6 digit code"
            value={otpCode}
            onChange={(event) => setOtpCode(event.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">New password</Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="New password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>
        {errorMessage ? (
          <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {errorMessage}
          </p>
        ) : null}
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Reset password"}
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
