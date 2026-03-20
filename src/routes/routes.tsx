import { createBrowserRouter } from "react-router";
import MainLayout from "@/components/Layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import UserManagement from "@/pages/UserManagement";
import AIModels from "@/pages/AIModels";
import Subscriptions from "@/pages/Subscriptions";
import Analytics from "@/pages/Analytics";

const router = createBrowserRouter([
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
      {
        path: "ai-models",
        element: <AIModels />,
      },
      {
        path: "subscriptions",
        element: <Subscriptions />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
    ],
  },
]);

export default router;
