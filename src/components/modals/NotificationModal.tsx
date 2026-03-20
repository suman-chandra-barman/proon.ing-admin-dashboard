import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface NotificationModalProps {
  onClose: () => void;
}

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

export default function NotificationModal({ onClose }: NotificationModalProps) {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Notifications</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={notification.avatar} />
              <AvatarFallback>{notification.user[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm">
                <span className="font-medium">{notification.user}</span>{" "}
                {notification.action}
              </p>
              <p className="text-xs text-muted-foreground">
                {notification.time}
              </p>
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full" onClick={onClose}>
          Mark all as read
        </Button>
      </div>
    </DialogContent>
  );
}
