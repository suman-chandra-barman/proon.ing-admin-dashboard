import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import logo from "@/assets/logo.svg";

type AuthShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function AuthShell({
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1f2b4d,transparent_55%),radial-gradient(circle_at_bottom,#2a0f37,transparent_45%)] opacity-80" />
        <div className="relative w-full max-w-md">
          <Card className="border-white/10 bg-slate-900/70 shadow-xl backdrop-blur">
            <CardHeader className="items-center justify-center text-center">
              <div className="flex items-center justify-center mb-2">
                <img src={logo} alt="Proon Logo" className="h-16" />
              </div>
              <CardTitle className="font-semibold">{title}</CardTitle>
              {description ? (
                <CardDescription className="text-slate-300">
                  {description}
                </CardDescription>
              ) : null}
            </CardHeader>
            <CardContent className="space-y-4">{children}</CardContent>
          </Card>
          {footer ? (
            <div className="mt-6 text-center text-xs text-slate-400">
              {footer}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
