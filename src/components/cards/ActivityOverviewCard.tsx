import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useGetWeekendWeeklyScansQuery } from "@/redux/features/dashboard/dashboardApi";
import ActivityOverviewSkeleton from "@/components/skeletons/ActivityOverviewSkeleton";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
});

const formatWeekLabel = (weekStart: string) => {
  if (!weekStart) return "";
  const parsed = new Date(`${weekStart}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return weekStart;
  return dateFormatter.format(parsed);
};

export default function ActivityOverviewCard() {
  const { data, isLoading, isFetching, isError } =
    useGetWeekendWeeklyScansQuery();

  const weeks = Array.isArray(data) ? data : [];

  const chartData = weeks.map((day) => ({
    name: formatWeekLabel(day.date),
    scans: day.count ?? 0,
  }));

  const isEmpty = !isLoading && !isError && chartData.length === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || isFetching ? (
          <ActivityOverviewSkeleton />
        ) : isError ? (
          <div className="flex h-[300px] items-center justify-center text-sm text-destructive">
            Failed to load activity.
          </div>
        ) : isEmpty ? (
          <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
            No activity data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="scans"
                stroke="#8b5cf6"
                strokeWidth={2}
                name="Scans"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
