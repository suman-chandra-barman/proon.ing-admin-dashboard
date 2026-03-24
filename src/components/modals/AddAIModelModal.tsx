import { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export interface AddAIModelFormData {
  name: string;
  provider: string;
  modelType: "Chat" | "Object Identification";
  description: string;
  apiKey: string;
  status: "Active" | "Degraded" | "Inactive";
  subscriptionTier: string;
}

interface AddAIModelModalProps {
  onAdd: (formData: AddAIModelFormData) => void;
  onClose: () => void;
}

const initialForm: AddAIModelFormData = {
  name: "",
  provider: "OpenAI",
  modelType: "Chat",
  description: "",
  apiKey: "",
  status: "Active",
  subscriptionTier: "Pro",
};

export default function AddAIModelModal({
  onAdd,
  onClose,
}: AddAIModelModalProps) {
  const [formData, setFormData] = useState<AddAIModelFormData>(initialForm);

  const handleClose = () => {
    setFormData(initialForm);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      return;
    }

    onAdd({
      ...formData,
      name: formData.name.trim(),
      provider: formData.provider.trim(),
      description: formData.description.trim(),
    });

    setFormData(initialForm);
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add AI Model</DialogTitle>
        <DialogDescription>
          Create a new AI model entry and assign it to a model class.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="model-name">Model Name</Label>
            <Input
              id="model-name"
              placeholder="e.g. GPT-4.1"
              value={formData.name}
              onChange={(e) =>
                setFormData((current) => ({
                  ...current,
                  name: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="model-provider">Provider</Label>
            <Input
              id="model-provider"
              placeholder="e.g. OpenAI"
              value={formData.provider}
              onChange={(e) =>
                setFormData((current) => ({
                  ...current,
                  provider: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Model Class</Label>
              <Select
                value={formData.modelType}
                onValueChange={(value: "Chat" | "Object Identification") =>
                  setFormData((current) => ({
                    ...current,
                    modelType: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Chat">Chat</SelectItem>
                  <SelectItem value="Object Identification">
                    Object Identification
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "Active" | "Degraded" | "Inactive") =>
                  setFormData((current) => ({
                    ...current,
                    status: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Degraded">Degraded</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Subscription Tier</Label>
            <Select
              value={formData.subscriptionTier}
              onValueChange={(value) =>
                setFormData((current) => ({
                  ...current,
                  subscriptionTier: value,
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Pro">Pro</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model-description">Description</Label>
            <Input
              id="model-description"
              placeholder="Short description"
              value={formData.description}
              onChange={(e) =>
                setFormData((current) => ({
                  ...current,
                  description: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="model-api-key">API Key</Label>
            <Input
              id="model-api-key"
              type="password"
              placeholder="Enter provider API key"
              value={formData.apiKey}
              onChange={(e) =>
                setFormData((current) => ({
                  ...current,
                  apiKey: e.target.value,
                }))
              }
              required
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit">Add Model</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
