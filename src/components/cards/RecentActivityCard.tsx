import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetScansQuery } from "@/redux/features/scans/scansApi";
import RecentActivitySkeleton from "../skeletons/RecentActivitySkeleton";

function formatConfidence(value: number | null | undefined) {
  if (typeof value !== "number") {
    return "-";
  }
  return `${Math.round(value * 100)}%`;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
}

export default function RecentActivityCard() {
  const {
    data: scans = [],
    isLoading,
    isFetching,
    isError,
  } = useGetScansQuery();

  const recentScans = [...scans]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 4);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || isFetching ? (
          <RecentActivitySkeleton />
        ) : isError ? (
          <p className="text-sm text-muted-foreground">
            Failed to load recent activity.
          </p>
        ) : recentScans.length ? (
          <div className="space-y-4">
            {recentScans.map((scan) => {
              const displayName =
                scan.user_name || scan.user_email || "Unknown user";
              return (
                <div key={scan.id} className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{displayName}</span> ran a{" "}
                      <span className="font-medium">{scan.mode}</span> scan
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Detected: {scan.detected_label} · Confidence:{" "}
                      {formatConfidence(scan.confidence)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(scan.created_at)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No recent activity yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
