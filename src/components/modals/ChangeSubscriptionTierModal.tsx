import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

interface AIModel {
  id: number;
  name: string;
  description: string;
  features: string[];
  status: string;
  price: string;
  scansPerMonth: number;
}

interface ChangeSubscriptionTierModalProps {
  model: AIModel;
  onClose: () => void;
}

const tiers = [
  {
    name: "Basic",
    price: "$10/month",
    scans: 100,
    features: ["Basic support", "Standard response time", "Email support"],
  },
  {
    name: "Pro",
    price: "$25/month",
    scans: 500,
    features: [
      "Priority support",
      "Faster response",
      "API access",
      "Custom training",
    ],
  },
  {
    name: "Enterprise",
    price: "$99/month",
    scans: 2000,
    features: [
      "24/7 Premium support",
      "Instant response",
      "Full API access",
      "Custom models",
      "Dedicated account manager",
    ],
  },
];

export default function ChangeSubscriptionTierModal({
  model,
  onClose,
}: ChangeSubscriptionTierModalProps) {
  const [selectedTier, setSelectedTier] = useState("Pro");

  const handleSubmit = () => {
    console.log("Changing tier to:", selectedTier);
    onClose();
  };

  const currentTier = tiers.find((t) => t.name === selectedTier);

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>Change Subscription Tier - {model.name}</DialogTitle>
      </DialogHeader>
      <div className="space-y-6 py-4">
        <div className="space-y-2">
          <Label>Select Tier</Label>
          <Select value={selectedTier} onValueChange={setSelectedTier}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tiers.map((tier) => (
                <SelectItem key={tier.name} value={tier.name}>
                  {tier.name} - {tier.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {currentTier && (
          <div className="rounded-lg border p-6 space-y-4">
            <div>
              <h3 className="text-xl font-bold">{currentTier.name}</h3>
              <p className="text-2xl font-bold text-primary mt-2">
                {currentTier.price}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {currentTier.scans} scans per month
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Features included:</p>
              <ul className="space-y-2">
                {currentTier.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <FaCheck className="h-3 w-3 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Confirm Change</Button>
      </DialogFooter>
    </DialogContent>
  );
}
