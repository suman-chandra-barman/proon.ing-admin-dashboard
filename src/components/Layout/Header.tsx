import ProfileDropdown from "../dropdowns/ProfileDropdown";

export default function Header() {
  return (
    <header className="fixed left-64 right-0 top-0 z-30 flex h-16 items-center justify-end border-b border-sidebar-border bg-card px-6 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Profile Dropdown */}
        <ProfileDropdown />
      </div>
    </header>
  );
}
