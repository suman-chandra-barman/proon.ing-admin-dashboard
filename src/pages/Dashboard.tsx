import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaUsers, FaUserCheck, FaDollarSign } from "react-icons/fa";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const statsCards = [
  {
    title: "Total Users",
    value: "12,543",
    icon: FaUsers,
    trend: "+12.5%",
    trendPositive: true,
  },
  {
    title: "Active Users",
    value: "8,234",
    icon: FaUserCheck,
    trend: "+8.2%",
    trendPositive: true,
  },
  {
    title: "Total Scans",
    value: "$45,231",
    icon: FaDollarSign,
    trend: "+23.1%",
    trendPositive: true,
  },
  {
    title: "Subscriptions",
    value: "1,234",
    icon: MdOutlineQrCodeScanner,
    trend: "-2.4%",
    trendPositive: false,
  },
];

const activityData = [
  { name: "Mon", users: 400, scans: 240 },
  { name: "Tue", users: 300, scans: 139 },
  { name: "Wed", users: 200, scans: 980 },
  { name: "Thu", users: 278, scans: 390 },
  { name: "Fri", users: 189, scans: 480 },
  { name: "Sat", users: 239, scans: 380 },
  { name: "Sun", users: 349, scans: 430 },
];

const scansData = [
  { name: "6am", scans: 65 },
  { name: "9am", scans: 85 },
  { name: "12pm", scans: 75 },
  { name: "3pm", scans: 90 },
  { name: "6pm", scans: 80 },
  { name: "9pm", scans: 45 },
  { name: "12pm", scans: 40 },
];

const recentUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    plan: "Pro",
    joinedAt: "2 hours ago",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.c@example.com",
    plan: "Enterprise",
    joinedAt: "5 hours ago",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.d@example.com",
    plan: "Free",
    joinedAt: "1 day ago",
  },
];

const recentActivity = [
  {
    id: 1,
    user: "John Doe",
    action: "Upgraded to Pro plan",
    time: "5 minutes ago",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Completed AI scan",
    time: "15 minutes ago",
  },
  {
    id: 3,
    user: "Robert Brown",
    action: "Registered new account",
    time: "1 hour ago",
  },
  {
    id: 4,
    user: "Alice Green",
    action: "Downloaded report",
    time: "2 hours ago",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

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
                    <p
                      className={`text-xs mt-2 ${
                        stat.trendPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.trend} from last month
                    </p>
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

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Activity Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  name="Users"
                />
                <Line
                  type="monotone"
                  dataKey="scans"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  name="Scans"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`/avatar-${user.id}.png`} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{user.plan}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {user.joinedAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users and Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Scans Today */}
        <Card>
          <CardHeader>
            <CardTitle>Scans Today</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scansData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="scans" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
