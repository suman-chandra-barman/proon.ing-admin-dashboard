import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/redux/hooks";

export default function PublicRoute() {
  const token = useAppSelector((state) => state.auth.token);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
