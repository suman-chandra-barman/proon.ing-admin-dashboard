import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Subscription {
  id: number;
  user: string;
  email: string;
  plan: string;
  status: string;
  amount: string;
  billingPeriod: string;
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
    paymentMethod: "AmEx •••• 8888",
  },
];

export default function Subscriptions() {
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
