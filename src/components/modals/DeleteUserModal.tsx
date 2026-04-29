import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { AdminUser } from "@/redux/features/users/usersApi";

interface DeleteUserModalProps {
  user: AdminUser;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export default function DeleteUserModal({
  user,
  onClose,
  onConfirm,
  isDeleting = false,
}: DeleteUserModalProps) {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Delete User</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this user? This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <div className="rounded-lg border p-4 space-y-1">
          <p className="text-sm font-medium">{user.username}</p>
          <p className="text-sm text-muted-foreground">
            {user.email || "No email"}
          </p>
          <p className="text-sm text-muted-foreground">
            Plan: {user.subscription_plan}
          </p>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={onConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete User"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
