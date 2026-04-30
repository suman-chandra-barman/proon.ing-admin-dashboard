import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import logo from "@/assets/logo.svg";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { Sheet, SheetContent } from "../ui/sheet";

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
  // {
  //   title: "AI Models",
  //   href: "/ai-models",
  //   icon: RiRobot2Fill,
  // },
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

type SidebarProps = {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
};

export default function Sidebar({
  mobileOpen,
  onMobileOpenChange,
}: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  React.useEffect(() => {
    onMobileOpenChange(false);
  }, [location.pathname, onMobileOpenChange]);

  const navContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Link to="/">
          <img src={logo} alt="Proon Logo" className="h-8" />
        </Link>
        <span className="ml-2 bg-linear-to-r from-[#4DC8FF] via-[#9C27B0] to-[#FF40E0] bg-clip-text text-sm font-semibold text-transparent">
          proon.ing
        </span>
        <span className="ml-2 rounded bg-gray-800 px-2 text-[10px] font-semibold">
          ADMIN
        </span>
      </div>

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

      <Button variant="outline" className="m-4" onClick={handleLogout}>
        <LogOut className="h-4 w-4" />
        <span className="ml-2">Sign Out</span>
      </Button>
    </div>
  );

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-sidebar-border bg-card shadow-sm md:block">
        {navContent}
      </aside>

      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="w-72 border-r border-sidebar-border bg-card p-0 text-foreground sm:w-80"
        >
          {navContent}
        </SheetContent>
      </Sheet>
    </>
  );
}
