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
import { Badge } from "@/components/ui/badge";

interface Subscription {
  id: number;
  user: string;
  email: string;
  plan: string;
  status: string;
  amount: string;
  billingPeriod: string;
  nextBilling: string;
  paymentMethod: string;
}

interface ChangeSubscriptionModalProps {
  subscription: Subscription;
  onClose: () => void;
}

export default function ChangeSubscriptionModal({
  subscription,
  onClose,
}: ChangeSubscriptionModalProps) {
  const [newPlan, setNewPlan] = useState(subscription.plan);
  const [billingPeriod, setBillingPeriod] = useState(
    subscription.billingPeriod,
  );

  const handleSubmit = () => {
    console.log("Changing subscription to:", newPlan, billingPeriod);
    onClose();
  };

  const getPlanPrice = (plan: string, period: string) => {
    const prices: Record<string, Record<string, string>> = {
      Free: { Monthly: "$0", Yearly: "$0" },
      Pro: { Monthly: "$25", Yearly: "$250" },
      Enterprise: { Monthly: "$99", Yearly: "$990" },
    };
    return prices[plan]?.[period] || "$0";
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Change Subscription</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="rounded-lg border p-4 space-y-2 bg-accent/50">
          <p className="text-sm font-medium">Current Subscription</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Plan</span>
            <Badge variant="outline">{subscription.plan}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Amount</span>
            <span className="text-sm font-medium">{subscription.amount}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>New Plan</Label>
            <Select value={newPlan} onValueChange={setNewPlan}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Pro">Pro</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Billing Period</Label>
            <Select value={billingPeriod} onValueChange={setBillingPeriod}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="Yearly">Yearly (Save 17%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border p-4 bg-primary/5">
            <p className="text-sm text-muted-foreground mb-2">New Amount</p>
            <p className="text-2xl font-bold text-primary">
              {getPlanPrice(newPlan, billingPeriod)}
              <span className="text-sm font-normal text-muted-foreground">
                /{billingPeriod === "Monthly" ? "month" : "year"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Change Subscription</Button>
      </DialogFooter>
    </DialogContent>
  );
}
