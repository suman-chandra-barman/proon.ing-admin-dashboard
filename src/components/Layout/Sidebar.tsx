import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import { MdSubscriptions } from "react-icons/md";
import logo from "@/assets/logo.svg";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: MdDashboard,
  },
  {
    title: "User Management",
    href: "/user-management",
    icon: FaUsers,
  },
  {
    title: "AI Models",
    href: "/ai-models",
    icon: RiRobot2Fill,
  },
  {
    title: "Subscriptions",
    href: "/subscriptions",
    icon: MdSubscriptions,
  },
  // {
  //   title: "Analytics",
  //   href: "/analytics",
  //   icon: IoAnalytics,
  // },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-card shadow-sm">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-sidebar-border px-6">
          <Link to="/">
            <img src={logo} alt="Proon Logo" className="h-8" />
          </Link>
          <span className="ml-2 text-sm font-semibold bg-linear-to-r from-[#4DC8FF] via-[#9C27B0] to-[#FF40E0] bg-clip-text text-transparent">
            proon.ing
          </span>
          <span className="ml-2 text-[10px] font-semibold rounded px-2 bg-gray-800">
            ADMIN
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                  isActive
                    ? "bg-[#4DC8FF2E] text-[#4DC8FF] shadow-sm"
                    : "text-muted-foreground hover:bg-[#84cff12e] hover:text-[#4DC8FF]",
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <Button variant="outline" className="m-4">
          <LogOut className="h-4 w-4" />
          <span className="ml-2">Sign Out</span>
        </Button>
      </div>
    </aside>
  );
}
