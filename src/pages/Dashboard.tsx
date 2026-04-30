import StatsCards from "@/components/cards/StatsCards";
import RecentUsersCard from "@/components/cards/RecentUsersCard";
import RecentActivityCard from "@/components/cards/RecentActivityCard";
import ActivityOverviewCard from "@/components/cards/ActivityOverviewCard";
import ScansTodayCard from "@/components/cards/ScansTodayCard";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <StatsCards />

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Activity Overview */}
        <ActivityOverviewCard />

        {/* Recent Users */}
        <RecentUsersCard />
      </div>

      {/* Recent Users and Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Scans Today */}
        <ScansTodayCard />

        {/* Recent Activity */}
        <RecentActivityCard />
      </div>
    </div>
  );
}
