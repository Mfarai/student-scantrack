
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import AttendanceStats from "@/components/AttendanceStats";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  todayAttendance,
  weeklyAttendance,
  monthlyAttendance,
  sampleStudents,
  sampleClasses,
  sampleAttendanceRecords,
} from "@/lib/data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  QrCode,
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // Calculate attendance distribution for pie chart
  const attendanceDistribution = [
    { name: "Present", value: todayAttendance.present },
    { name: "Absent", value: todayAttendance.absent },
  ];

  // Colors for pie chart
  const COLORS = ["#4f46e5", "#f97316"];

  // Weekly attendance data for bar chart
  const weeklyData = [
    { day: "Mon", present: 35, absent: 5 },
    { day: "Tue", present: 33, absent: 7 },
    { day: "Wed", present: 38, absent: 2 },
    { day: "Thu", present: 32, absent: 8 },
    { day: "Fri", present: 30, absent: 10 },
    { day: "Sat", present: 0, absent: 0 },
    { day: "Sun", present: 0, absent: 0 },
  ];

  const recentAttendance = sampleAttendanceRecords
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageTransition className="page-container">
        <div className="flex items-center justify-between mb-6">
          <h1 className="page-title">Dashboard</h1>
          <Button 
            onClick={() => navigate("/scanner")}
            className="gap-2"
          >
            <QrCode className="h-4 w-4" />
            Take Attendance
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <AttendanceStats title="Today" data={todayAttendance} className="lg:col-span-2" />
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium md:text-lg">Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <QuickAction
                icon={<QrCode className="h-5 w-5" />}
                title="Scan QR Code"
                description="Take attendance by scanning"
                onClick={() => navigate("/scanner")}
                delay={0}
              />
              <QuickAction
                icon={<Users className="h-5 w-5" />}
                title="Manage Students"
                description={`${sampleStudents.length} students total`}
                onClick={() => navigate("/students")}
                delay={0.1}
              />
              <QuickAction
                icon={<BookOpen className="h-5 w-5" />}
                title="Manage Classes"
                description={`${sampleClasses.length} classes available`}
                onClick={() => navigate("/classes")}
                delay={0.2}
              />
              <QuickAction
                icon={<Calendar className="h-5 w-5" />}
                title="Attendance History"
                description="View detailed reports"
                onClick={() => navigate("/history")}
                delay={0.3}
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium md:text-lg">Weekly Attendance</CardTitle>
              <CardDescription>Attendance trends this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                      contentStyle={{ 
                        borderRadius: "0.5rem",
                        border: "1px solid hsl(var(--border))",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                      }}
                    />
                    <Bar 
                      dataKey="present" 
                      stackId="a" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]} 
                      name="Present"
                    />
                    <Bar 
                      dataKey="absent" 
                      stackId="a" 
                      fill="#f87171" 
                      radius={[4, 4, 0, 0]} 
                      name="Absent"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium md:text-lg">Today's Status</CardTitle>
              <CardDescription>Present vs absent students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attendanceDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {attendanceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-base font-medium md:text-lg">Recent Activity</CardTitle>
                  <CardDescription>Latest attendance records</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1"
                  onClick={() => navigate("/history")}
                >
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Student</th>
                      <th className="text-left py-3 px-4 font-medium">Class</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAttendance.map((record) => (
                      <tr key={record.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-4">{record.studentName}</td>
                        <td className="py-3 px-4">{record.className}</td>
                        <td className="py-3 px-4">
                          {record.date.toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              record.present
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {record.present ? "Present" : "Absent"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {record.timeIn
                            ? record.timeIn.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    </div>
  );
};

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  delay: number;
}

const QuickAction = ({ icon, title, description, onClick, delay }: QuickActionProps) => {
  return (
    <motion.div
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay }}
      className="flex items-center p-3 rounded-lg border hover:bg-accent hover-scale cursor-pointer"
      onClick={onClick}
    >
      <div className="p-2 rounded-md bg-primary/10 text-primary mr-3">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </motion.div>
  );
};

export default Dashboard;
