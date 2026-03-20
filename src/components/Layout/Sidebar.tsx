import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import { MdSubscriptions } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import logo from "@/assets/logo.svg";

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
  {
    title: "Analytics",
    href: "/analytics",
    icon: IoAnalytics,
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-card shadow-sm">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-sidebar-border px-6">
          <img src={logo} alt="Proon Logo" className="h-8" />
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
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
