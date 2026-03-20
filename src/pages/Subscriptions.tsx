import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { FaEye, FaEdit } from "react-icons/fa";
import PaymentDetailsModal from "@/components/modals/PaymentDetailsModal";
import ChangeSubscriptionModal from "@/components/modals/ChangeSubscriptionModal";

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

const mockSubscriptions: Subscription[] = [
  {
    id: 1,
    user: "John Doe",
    email: "john.doe@example.com",
    plan: "Pro",
    status: "Active",
    amount: "$25.00",
    billingPeriod: "Monthly",
    nextBilling: "2026-04-20",
    paymentMethod: "Visa •••• 4242",
  },
  {
    id: 2,
    user: "Jane Smith",
    email: "jane.smith@example.com",
    plan: "Enterprise",
    status: "Active",
    amount: "$99.00",
    billingPeriod: "Monthly",
    nextBilling: "2026-04-15",
    paymentMethod: "MasterCard •••• 5555",
  },
  {
    id: 3,
    user: "Bob Johnson",
    email: "bob.j@example.com",
    plan: "Free",
    status: "Active",
    amount: "$0.00",
    billingPeriod: "-",
    nextBilling: "-",
    paymentMethod: "-",
  },
  {
    id: 4,
    user: "Alice Williams",
    email: "alice.w@example.com",
    plan: "Pro",
    status: "Cancelled",
    amount: "$25.00",
    billingPeriod: "Monthly",
    nextBilling: "-",
    paymentMethod: "Visa •••• 1234",
  },
  {
    id: 5,
    user: "Charlie Brown",
    email: "charlie.b@example.com",
    plan: "Pro",
    status: "Active",
    amount: "$25.00",
    billingPeriod: "Yearly",
    nextBilling: "2027-01-10",
    paymentMethod: "AmEx •••• 8888",
  },
];

export default function Subscriptions() {
  const [isPaymentDetailsOpen, setIsPaymentDetailsOpen] = useState(false);
  const [isChangeSubscriptionOpen, setIsChangeSubscriptionOpen] =
    useState(false);
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);

  const handleViewPayment = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsPaymentDetailsOpen(true);
  };

  const handleChangeSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsChangeSubscriptionOpen(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Subscriptions</h1>

      <Card>
        <CardHeader>
          <CardTitle>Active Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Billing Period</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSubscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">
                    {subscription.user}
                  </TableCell>
                  <TableCell>{subscription.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{subscription.plan}</Badge>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="font-medium">
                    {subscription.amount}
                  </TableCell>
                  <TableCell>{subscription.billingPeriod}</TableCell>
                  <TableCell>{subscription.nextBilling}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewPayment(subscription)}
                      >
                        <FaEye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleChangeSubscription(subscription)}
                      >
                        <FaEdit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modals */}
      <Dialog
        open={isPaymentDetailsOpen}
        onOpenChange={setIsPaymentDetailsOpen}
      >
        {selectedSubscription && (
          <PaymentDetailsModal
            subscription={selectedSubscription}
            onClose={() => setIsPaymentDetailsOpen(false)}
          />
        )}
      </Dialog>

      <Dialog
        open={isChangeSubscriptionOpen}
        onOpenChange={setIsChangeSubscriptionOpen}
      >
        {selectedSubscription && (
          <ChangeSubscriptionModal
            subscription={selectedSubscription}
            onClose={() => setIsChangeSubscriptionOpen(false)}
          />
        )}
      </Dialog>
    </div>
  );
}
