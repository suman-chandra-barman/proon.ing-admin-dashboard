import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useGetUsersQuery } from "@/redux/features/users/usersApi";
import RecentUsersSkeleton from "../skeletons/RecentUsersSkeleton";



export default function RecentUsersCard() {
  const {
    data: users = [],
    isLoading,
    isFetching,
    isError,
  } = useGetUsersQuery();

  const recentUsers = users.slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Recent Users</CardTitle>
        <Link
          to="/user-management"
          className="text-sm font-medium text-[#4DC8FF] hover:underline"
        >
          All users <ArrowRight className="inline h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading || isFetching ? (
          <RecentUsersSkeleton />
        ) : isError ? (
          <p className="text-sm text-muted-foreground">
            Failed to load recent users.
          </p>
        ) : recentUsers.length ? (
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {user.username?.[0]?.toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.username}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email || "-"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{user.subscription_plan}</Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No users found.</p>
        )}
      </CardContent>
    </Card>
  );
}
