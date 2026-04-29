import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVerifyOtpMutation } from "@/redux/features/auth/authApi";

type LocationState = {
  email?: string;
};

function getErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (
      error as {
        data?: { message?: string; data?: { non_field_errors?: string[] } };
      }
    ).data;
    return (
      data?.data?.non_field_errors?.[0] ??
      data?.message ??
      "Verification failed. Please try again."
    );
  }
  return "Verification failed. Please try again.";
}

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialEmail = (location.state as LocationState | null)?.email ?? "";
  const [email, setEmail] = useState(initialEmail);
  const [otpCode, setOtpCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      await verifyOtp({ email, otp_code: otpCode }).unwrap();
      navigate("/reset-password", { state: { email, otpCode } });
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <AuthShell
      title="Verify OTP"
      description="Enter the OTP sent to your email."
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
        {errorMessage ? (
          <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {errorMessage}
          </p>
        ) : null}
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify OTP"}
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
