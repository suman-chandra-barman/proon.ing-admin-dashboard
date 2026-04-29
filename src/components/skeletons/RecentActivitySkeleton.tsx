import { Skeleton } from "../ui/skeleton";

function RecentActivitySkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={`recent-activity-skeleton-${index}`} className="flex gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentActivitySkeleton;