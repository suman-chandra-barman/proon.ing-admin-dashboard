import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetScansTodayBucketsQuery } from "@/redux/features/dashboard/dashboardApi";
import ScansTodaySkeleton from "@/components/skeletons/ScansTodaySkeleton";

export default function ScansTodayCard() {
  const { data, isLoading, isFetching, isError } =
    useGetScansTodayBucketsQuery();

  const chartData = (data?.buckets ?? []).map((bucket) => ({
    name: bucket.label,
    scans: bucket.count,
  }));

  const isEmpty = !isLoading && !isError && chartData.length === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scans Today</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || isFetching ? (
          <ScansTodaySkeleton />
        ) : isError ? (
          <div className="flex h-[300px] items-center justify-center text-sm text-destructive">
            Failed to load scans.
          </div>
        ) : isEmpty ? (
          <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
            No scan data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: 8,
                }}
                labelStyle={{ color: "#e2e8f0" }}
                itemStyle={{ color: "#cbd5f5" }}
              />
              <Bar dataKey="scans" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
