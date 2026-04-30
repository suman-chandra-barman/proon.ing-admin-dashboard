import { useEffect, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUpdateProfileMutation } from "@/redux/features/auth/authApi";

type EditProfileModalProps = {
  initialName: string;
  initialImageUrl?: string | null;
  onClose: () => void;
};

function getErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    return data?.message ?? "Profile update failed. Please try again.";
  }
  return "Profile update failed. Please try again.";
}

function getFirstWord(value: string) {
  return value.trim().split(/\s+/)[0] ?? "";
}

export default function EditProfileModal({
  initialName,
  initialImageUrl,
  onClose,
}: EditProfileModalProps) {
  const [name, setName] = useState(initialName);
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const displayName = name.trim() || initialName || "Admin";
  const fallbackText = getFirstWord(displayName) || "Admin";
  const imageUrl = previewUrl ?? initialImageUrl ?? undefined;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Name is required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    if (file) {
      formData.append("profile_image", file);
    }

    try {
      await updateProfile(formData).unwrap();
      onClose();
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>
          Update your display name and profile image.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-muted/40 p-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={imageUrl} alt={displayName} />
            <AvatarFallback className="bg-gray-500 text-white text-xs">
              {fallbackText}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{displayName}</p>
            <p className="text-xs text-muted-foreground">
              Leave the image empty to keep current.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile-name">Name</Label>
          <Input
            id="profile-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile-image">Profile image</Label>
          <Input
            id="profile-image"
            type="file"
            accept="image/*"
            onChange={(event) =>
              setFile(event.target.files ? event.target.files[0] : null)
            }
          />
        </div>

        {errorMessage ? (
          <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {errorMessage}
          </p>
        ) : null}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
