import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  name: string;
  email: string;
  plan: string;
  status: string;
  scansUsed: number;
  scansLimit: number;
}

interface DeleteUserModalProps {
  user: User;
  onClose: () => void;
}

export default function DeleteUserModal({
  user,
  onClose,
}: DeleteUserModalProps) {
  const handleDelete = () => {
    console.log("Deleting user:", user.id);
    onClose();
  };

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
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <p className="text-sm text-muted-foreground">Plan: {user.plan}</p>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" variant="destructive" onClick={handleDelete}>
          Delete User
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
