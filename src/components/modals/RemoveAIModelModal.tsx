import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AIModel {
  id: number;
  name: string;
  provider: string;
  description: string;
  status: "Active" | "Degraded" | "Inactive";
  requestsToday: string;
  avgLatency: string;
  usage: number;
  subscriptionTier: string;
  icon: React.ReactElement;
  iconBg: string;
  gradientFrom: string;
  gradientTo: string;
}

interface RemoveAIModelModalProps {
  model: AIModel;
  onClose: () => void;
}

export default function RemoveAIModelModal({
  model,
  onClose,
}: RemoveAIModelModalProps) {
  const handleRemove = () => {
    console.log("Removing model:", model.id);
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Remove AI Model</DialogTitle>
        <DialogDescription>
          Are you sure you want to remove this AI model? Users will no longer
          have access to it.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 space-y-2">
          <p className="text-sm font-medium text-red-900">{model.name}</p>
          <p className="text-sm text-red-700">{model.description}</p>
          <p className="text-sm text-red-700">
            Current users on this model will be notified
          </p>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleRemove}>
          Remove Model
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
