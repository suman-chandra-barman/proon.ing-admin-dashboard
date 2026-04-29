import { useMemo, useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSubscriptionsQuery } from "@/redux/features/subscriptions/subscriptionsApi";

export default function Subscriptions() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const {
    data: subscriptions = [],
    isLoading,
    isFetching,
    isError,
  } = useGetSubscriptionsQuery();

  const totalPages = Math.max(
    1,
    Math.ceil(subscriptions.length / itemsPerPage),
  );
  const safePage = Math.min(currentPage, totalPages);

  const paginatedSubscriptions = useMemo(() => {
    const startIndex = (safePage - 1) * itemsPerPage;
    return subscriptions.slice(startIndex, startIndex + itemsPerPage);
  }, [subscriptions, safePage]);

  const startIndex = (safePage - 1) * itemsPerPage;

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
              {isLoading || isFetching
                ? Array.from({ length: itemsPerPage }).map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-40" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                    </TableRow>
                  ))
                : paginatedSubscriptions.map((subscription) => {
                    const statusLabel =
                      subscription.status?.toLowerCase() === "active"
                        ? "Active"
                        : subscription.status;
                    return (
                      <TableRow key={subscription.user}>
                        <TableCell className="font-medium">
                          {subscription.user_name}
                        </TableCell>
                        <TableCell>{subscription.email || "-"}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {subscription.purchased_subscription_plan}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              subscription.status?.toLowerCase() === "active"
                                ? "default"
                                : subscription.status?.toLowerCase() ===
                                    "cancelled"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {statusLabel}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          ${subscription.amount}
                        </TableCell>
                        <TableCell>{subscription.billing_period}</TableCell>
                      </TableRow>
                    );
                  })}
              {!isLoading && !isFetching && !paginatedSubscriptions.length && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    {isError
                      ? "Failed to load subscriptions."
                      : "No subscriptions found."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="text-muted-foreground">
              Showing {paginatedSubscriptions.length ? startIndex + 1 : 0}-
              {startIndex + paginatedSubscriptions.length} of{" "}
              {subscriptions.length}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={safePage === 1 || isLoading || isFetching}
              >
                Previous
              </Button>
              <span className="text-muted-foreground">
                Page {safePage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={safePage === totalPages || isLoading || isFetching}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
