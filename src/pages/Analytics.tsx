import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { FaUsers, FaDollarSign, FaChartLine } from "react-icons/fa";
import { MdOutlineQrCodeScanner } from "react-icons/md";

const statsCards = [
  {
    title: "Total Revenue",
    value: "$125,430",
    icon: FaDollarSign,
    trend: "+18.2%",
  },
  {
    title: "Total Scans",
    value: "45,234",
    icon: MdOutlineQrCodeScanner,
    trend: "+12.5%",
  },
  {
    title: "Active Users",
    value: "8,234",
    icon: FaUsers,
    trend: "+8.7%",
  },
  {
    title: "Conversion Rate",
    value: "24.5%",
    icon: FaChartLine,
    trend: "+3.2%",
  },
];

const revenueData = [
  { month: "Jan", revenue: 4200, expenses: 2400 },
  { month: "Feb", revenue: 3800, expenses: 2100 },
  { month: "Mar", revenue: 5100, expenses: 2800 },
  { month: "Apr", revenue: 4600, expenses: 2500 },
  { month: "May", revenue: 5800, expenses: 3100 },
  { month: "Jun", revenue: 6200, expenses: 3300 },
  { month: "Jul", revenue: 7100, expenses: 3600 },
];

const userGrowthData = [
  { month: "Jan", users: 1000 },
  { month: "Feb", users: 1500 },
  { month: "Mar", users: 2200 },
  { month: "Apr", users: 2800 },
  { month: "May", users: 3500 },
  { month: "Jun", users: 4200 },
  { month: "Jul", users: 5000 },
];

const planDistribution = [
  { name: "Free", value: 400, color: "#94a3b8" },
  { name: "Pro", value: 300, color: "#8b5cf6" },
  { name: "Enterprise", value: 100, color: "#06b6d4" },
];

const scansPerDayData = [
  { day: "Mon", scans: 120 },
  { day: "Tue", scans: 150 },
  { day: "Wed", scans: 180 },
  { day: "Thu", scans: 160 },
  { day: "Fri", scans: 200 },
  { day: "Sat", scans: 90 },
  { day: "Sun", scans: 85 },
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

      {/* Revenue Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stackId="2"
                stroke="#ef4444"
                fill="#ef4444"
                name="Expenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Growth */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  name="Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Plan Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Scans Per Day */}
      <Card>
        <CardHeader>
          <CardTitle>Scans Per Day (This Week)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scansPerDayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="scans" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
