import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import type { Location } from "react-router";
import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { Eye, EyeOff } from "lucide-react";

type LocationState = {
  from?: Location;
};

function getErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    return data?.message ?? "Login failed. Please try again.";
  }
  return "Login failed. Please try again.";
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [login, { isLoading }] = useLoginMutation();
  const location = useLocation();
  const navigate = useNavigate();

  const from = (location.state as LocationState | null)?.from?.pathname ?? "/";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      await login({ email, password }).unwrap();
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <AuthShell
      title="Admin Portal"
      description="Sign in to manage the dashboard."
      footer={
        <span>
          Protected Admin Interface — Unauthorized access is prohibited
        </span>
      }
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
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        {errorMessage ? (
          <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {errorMessage}
          </p>
        ) : null}
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in to Dashboard"}
        </Button>
      </form>
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span>Forgot your password?</span>
        <Link
          to="/forgot-password"
          className="text-[#4DC8FF] hover:text-[#9C27B0]"
        >
          Reset password
        </Link>
      </div>
    </AuthShell>
  );
}
