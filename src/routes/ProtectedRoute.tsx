import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "@/redux/hooks";

export default function ProtectedRoute() {
  const token = useAppSelector((state) => state.auth.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
