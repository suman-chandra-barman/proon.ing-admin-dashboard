import * as React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileOpenChange={setMobileSidebarOpen}
      />
      <Header onMenuClick={() => setMobileSidebarOpen(true)} />
      <main className="pt-16 p-4 sm:p-6 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
}
