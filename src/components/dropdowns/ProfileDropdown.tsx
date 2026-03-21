import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function ProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src="/avatar.png" alt="Admin" />
            <AvatarFallback className="bg-gray-500 text-white">
              AD
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" sideOffset={8}>
        {/* User Info Header */}
        <div className="flex items-center gap-3 px-3 py-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/avatar.png" alt="Admin User" />
            <AvatarFallback className="bg-gray-500 text-white text-lg">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@proon.ing</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        <div className="py-1">
          <DropdownMenuItem className="cursor-pointer px-3 py-2.5  hover:bg-[#84cff12e]! hover:text-[#4DC8FF]!">
            <FaUserCircle className="mr-3 h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer px-3 py-2.5 hover:bg-[#84cff12e]! hover:text-[#4DC8FF]!">
            <FaCog className="mr-3 h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Settings</span>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* Logout */}
        <div className="py-1">
          <DropdownMenuItem className="cursor-pointer px-3 py-2.5 text-red-600 focus:text-red-600 hover:bg-red-400!">
            <FaSignOutAlt className="mr-3 h-4 w-4" />
            <span className="text-sm font-medium">Log out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
