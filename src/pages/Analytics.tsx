import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FaUsers, FaChartLine } from "react-icons/fa";
import { MdOutlineQrCodeScanner } from "react-icons/md";

const statsCards = [
  {
    title: "Total Users",
    value: "125,430",
    icon: FaUsers,
    trend: "+18.2%",
  },
  {
    title: "Avg Daily Scans",
    value: "45,234",
    icon: MdOutlineQrCodeScanner,
    trend: "+12.5%",
  },
  {
    title: "System Uptime",
    value: "8,234",
    icon: FaChartLine,
    trend: "+8.7%",
  },
  {
    title: "Avg Response",
    value: "24.5%",
    icon: FaChartLine,
    trend: "+3.2%",
  },
];

const userGrowthData = [
  { date: "Mar 8", totalUsers: 2000, newUsers: 1800 },
  { date: "Mar 9", totalUsers: 2400, newUsers: 2200 },
  { date: "Mar 10", totalUsers: 2800, newUsers: 2500 },
  { date: "Mar 11", totalUsers: 3200, newUsers: 2900 },
  { date: "Mar 12", totalUsers: 3800, newUsers: 3400 },
  { date: "Mar 13", totalUsers: 4200, newUsers: 3900 },
  { date: "Mar 14", totalUsers: 4800, newUsers: 4400 },
];

const scansPerDayData = [
  { day: "Mon", scans: 320, errors: 45 },
  { day: "Tue", scans: 380, errors: 35 },
  { day: "Wed", scans: 420, errors: 50 },
  { day: "Thu", scans: 360, errors: 40 },
  { day: "Fri", scans: 450, errors: 55 },
  { day: "Sat", scans: 280, errors: 30 },
  { day: "Sun", scans: 250, errors: 25 },
];

const systemPerformanceData = [
  { time: "00:00", cpu: 30, memory: 45, responseTime: 220 },
  { time: "04:00", cpu: 25, memory: 42, responseTime: 210 },
  { time: "08:00", cpu: 45, memory: 55, responseTime: 280 },
  { time: "12:00", cpu: 38, memory: 50, responseTime: 250 },
  { time: "16:00", cpu: 42, memory: 52, responseTime: 265 },
  { time: "20:00", cpu: 35, memory: 48, responseTime: 240 },
  { time: "24:00", cpu: 28, memory: 44, responseTime: 215 },
];

const performanceStatsCards = [
  {
    title: "Avg CPU Usage",
    value: "34.2%",
    status: "Good",
    statusColor: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
  },
  {
    title: "Avg Memory Usage",
    value: "48.7%",
    status: "Normal",
    statusColor: "text-pink-400",
    bgColor: "bg-pink-500/10",
  },
  {
    title: "Error Rate",
    value: "0.89%",
    status: "Low",
    statusColor: "text-red-400",
    bgColor: "bg-red-500/10",
  },
  {
    title: "Avg Response Time",
    value: "248ms",
    status: "Fast",
    statusColor: "text-green-400",
    bgColor: "bg-green-500/10",
  },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>

      {/* Stats Cards */}
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
                    <p className="text-xs mt-2 text-green-600">{stat.trend}</p>
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

      {/* User Growth */}
      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userGrowthData}>
              <defs>
                <linearGradient
                  id="totalUsersGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient
                  id="newUsersGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f1f1f",
                  border: "1px solid #333",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="totalUsers"
                stroke="#8b5cf6"
                fill="url(#totalUsersGradient)"
                strokeWidth={2}
                name="Total Users"
              />
              <Area
                type="monotone"
                dataKey="newUsers"
                stroke="#ec4899"
                fill="url(#newUsersGradient)"
                strokeWidth={2}
                name="New Users"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Scans Per Day */}
        <Card>
          <CardHeader>
            <CardTitle>Scans Per Day</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scansPerDayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="day" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f1f1f",
                    border: "1px solid #333",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="scans"
                  fill="#8b5cf6"
                  radius={[8, 8, 0, 0]}
                  name="Scans"
                />
                <Bar
                  dataKey="errors"
                  fill="#ec4899"
                  radius={[8, 8, 0, 0]}
                  name="Errors"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Performance */}
        <Card>
          <CardHeader>
            <CardTitle>System Performance (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={systemPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="time" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f1f1f",
                    border: "1px solid #333",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cpu"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="CPU %"
                />
                <Line
                  type="monotone"
                  dataKey="memory"
                  stroke="#ec4899"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Memory %"
                />
                <Line
                  type="monotone"
                  dataKey="responseTime"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Response Time (ms)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {performanceStatsCards.map((stat) => {
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full ${stat.bgColor} ${stat.statusColor}`}
                    >
                      {stat.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
