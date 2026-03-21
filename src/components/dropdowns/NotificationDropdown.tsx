import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IoNotifications } from "react-icons/io5";

const notifications = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "upgraded to Pro plan",
    time: "2 minutes ago",
    avatar: "/avatar1.png",
  },
  {
    id: 2,
    user: "Mike Chen",
    action: "completed 50 AI scans",
    time: "15 minutes ago",
    avatar: "/avatar2.png",
  },
  {
    id: 3,
    user: "Emily Davis",
    action: "joined as new user",
    time: "1 hour ago",
    avatar: "/avatar3.png",
  },
];

export default function NotificationDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative rounded-full p-1 hover:bg-accent">
          <IoNotifications className="h-4 w-4 text-muted-foreground" />
          <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-xs flex items-center justify-center">
            {notifications.length}
          </Badge>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" sideOffset={8}>
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold text-sm">Notifications</h3>
          <Badge variant="secondary" className="h-5 px-2 text-xs">
            {notifications.length} new
          </Badge>
        </div>
        <div className="max-h-[400px] overflow-y-auto py-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-3 px-4 py-3 hover:bg-[#84cff12e] cursor-pointer transition-colors"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={notification.avatar} />
                <AvatarFallback>{notification.user[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm leading-tight">
                  <span className="font-medium">{notification.user}</span>{" "}
                  <span className="text-muted-foreground">
                    {notification.action}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t p-2">
          <Button variant="ghost" className="w-full text-sm" size="sm">
            Mark all as read
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
