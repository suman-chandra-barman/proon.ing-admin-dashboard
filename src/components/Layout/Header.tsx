import { useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog } from "@/components/ui/dialog";
import NotificationModal from "../modals/NotificationModal";

export default function Header() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <>
      <header className="fixed left-64 right-0 top-0 z-30 flex h-16 items-center justify-end border-b border-sidebar-border bg-card px-6 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Notification Icon */}
          <button
            onClick={() => setIsNotificationOpen(true)}
            className="relative rounded-full p-1 hover:bg-accent"
          >
            <IoNotifications className="h-4 w-4 text-muted-foreground" />
            <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-xs flex items-center justify-center">
              3
            </Badge>
          </button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar>
                  <AvatarImage src="/avatar.png" alt="Admin" />
                  <AvatarFallback className="bg-gray-500 text-white">AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">
                    admin@proon.ing
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FaUserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Notification Modal */}
      <Dialog open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
        <NotificationModal onClose={() => setIsNotificationOpen(false)} />
      </Dialog>
    </>
  );
}
