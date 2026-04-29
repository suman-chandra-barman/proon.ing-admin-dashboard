import { Card, CardContent } from "@/components/ui/card";
import { useGetDashboardStatsQuery } from "@/redux/features/dashboard/dashboardApi";
import { FaUsers, FaUserCheck, FaDollarSign } from "react-icons/fa";
import { MdOutlineQrCodeScanner } from "react-icons/md";

const numberFormatter = new Intl.NumberFormat();

type DashboardStats = {
  total_users?: number;
  total_active_users?: number;
  total_scans?: number;
  total_subscribers?: number;
};

export default function StatsCards() {
  const { data: stats, isLoading, isError } = useGetDashboardStatsQuery();

  const formatStat = (value?: number) => {
    if (isLoading) return "Loading...";
    if (isError || value === undefined || value === null) return "--";
    return numberFormatter.format(value);
  };

  const statsCards = [
    {
      title: "Total Users",
      value: formatStat((stats as DashboardStats | undefined)?.total_users),
      icon: FaUsers,
    },
    {
      title: "Active Users",
      value: formatStat(
        (stats as DashboardStats | undefined)?.total_active_users,
      ),
      icon: FaUserCheck,
    },
    {
      title: "Total Scans",
      value: formatStat((stats as DashboardStats | undefined)?.total_scans),
      icon: MdOutlineQrCodeScanner,
    },
    {
      title: "Subscriptions",
      value: formatStat(
        (stats as DashboardStats | undefined)?.total_subscribers,
      ),
      icon: FaDollarSign,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
