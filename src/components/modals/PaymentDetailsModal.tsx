import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
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

interface PaymentDetailsModalProps {
  subscription: Subscription;
  onClose: () => void;
}

export default function PaymentDetailsModal({
  subscription,
}: PaymentDetailsModalProps) {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Payment Details</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">User</span>
            <span className="text-sm font-medium">{subscription.user}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="text-sm font-medium">{subscription.email}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Plan</span>
            <Badge variant="outline">{subscription.plan}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge
              variant={
                subscription.status === "Active"
                  ? "default"
                  : subscription.status === "Cancelled"
                    ? "destructive"
                    : "secondary"
              }
            >
              {subscription.status}
            </Badge>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Amount</span>
            <span className="text-sm font-bold">{subscription.amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Billing Period
            </span>
            <span className="text-sm font-medium">
              {subscription.billingPeriod}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Next Billing</span>
            <span className="text-sm font-medium">
              {subscription.nextBilling}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Payment Method
            </span>
            <span className="text-sm font-medium">
              {subscription.paymentMethod}
            </span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
