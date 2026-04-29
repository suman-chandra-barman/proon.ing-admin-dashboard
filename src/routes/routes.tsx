import { createBrowserRouter } from "react-router";
import MainLayout from "@/components/Layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import UserManagement from "@/pages/UserManagement";
import Subscriptions from "@/pages/Subscriptions";
import Login from "@/pages/Login";
import ForgotPassword from "@/pages/ForgotPassword";
import VerifyOtp from "@/pages/VerifyOtp";
import ResetPassword from "@/pages/ResetPassword";
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicRoute from "@/routes/PublicRoute";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "user-management",
            element: <UserManagement />,
          },
          // {
          //   path: "ai-models",
          //   element: <AIModels />,
          // },
          {
            path: "subscriptions",
            element: <Subscriptions />,
          },
          // {
          //   path: "analytics",
          //   element: <Analytics />,
          // },
        ],
      },
    ],
  },
]);

export default router;
