import { useState } from "react";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog } from "@/components/ui/dialog";
import { FaUserCircle, FaSignOutAlt, FaLock } from "react-icons/fa";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import EditProfileModal from "@/components/modals/EditProfileModal";
import ChangePasswordModal from "@/components/modals/ChangePasswordModal";

type ProfileUser = {
  name?: string;
  email?: string;
  profile_image?: string;
  profile_image_url?: string;
  image?: string;
};

function getFirstWord(value: string) {
  return value.trim().split(/\s+/)[0] ?? "";
}

export default function ProfileDropdown() {
  useGetMeQuery(undefined);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user as ProfileUser | null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const resolvedName = user?.name?.trim() || "Admin";
  const resolvedEmail = user?.email ?? "admin@proon.ing";
  const profileImage =
    user?.profile_image_url ?? user?.profile_image ?? user?.image ?? "";
  const fallbackText = getFirstWord(resolvedName).charAt(0).toUpperCase() || "A";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:cursor-pointer">
            <Avatar>
              <AvatarImage src={profileImage} alt={resolvedName} />
              <AvatarFallback className="bg-gray-500 text-white">
                {fallbackText}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end" sideOffset={8}>
          {/* User Info Header */}
          <div className="flex items-center gap-3 px-3 py-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={profileImage} alt={resolvedName} />
              <AvatarFallback className="bg-gray-500 text-white text-xs">
                {fallbackText}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold">{resolvedName}</p>
              <p className="text-xs text-muted-foreground">{resolvedEmail}</p>
            </div>
          </div>

          <DropdownMenuSeparator />

          {/* Menu Items */}
          <div className="py-1">
            <DropdownMenuItem
              className="cursor-pointer px-3 py-2.5  hover:bg-[#84cff12e]! hover:text-[#4DC8FF]!"
              onSelect={() => setIsEditOpen(true)}
            >
              <FaUserCircle className="mr-3 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Edit Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer px-3 py-2.5 hover:bg-[#84cff12e]! hover:text-[#4DC8FF]!"
              onSelect={() => setIsPasswordOpen(true)}
            >
              <FaLock className="mr-3 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Change Password</span>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator />

          {/* Logout */}
          <div className="py-1">
            <DropdownMenuItem
              className="cursor-pointer px-3 py-2.5 text-red-600 focus:text-red-600 hover:bg-red-400!"
              onSelect={handleLogout}
            >
              <FaSignOutAlt className="mr-3 h-4 w-4" />
              <span className="text-sm font-medium">Log out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        {isEditOpen ? (
          <EditProfileModal
            initialName={resolvedName}
            initialImageUrl={profileImage || null}
            onClose={() => setIsEditOpen(false)}
          />
        ) : null}
      </Dialog>

      <Dialog open={isPasswordOpen} onOpenChange={setIsPasswordOpen}>
        {isPasswordOpen ? (
          <ChangePasswordModal onClose={() => setIsPasswordOpen(false)} />
        ) : null}
      </Dialog>
    </>
  );
}
