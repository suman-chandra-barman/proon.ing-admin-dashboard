import ProfileDropdown from "../dropdowns/ProfileDropdown";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-sidebar-border bg-card px-4 shadow-sm md:left-64 md:px-6">
      <div className="flex items-center gap-3 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="ml-auto flex items-center gap-4">
        {/* Profile Dropdown */}
        <ProfileDropdown />
      </div>
    </header>
  );
}
