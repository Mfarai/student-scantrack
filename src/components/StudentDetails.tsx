
import React from "react";
import { Student, getAttendanceByStudentId, getAttendanceSummary } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { formatDistanceToNow } from "date-fns";
import { Mail, Calendar, Clock, User, Award, BookOpen, CheckCircle2, XCircle } from "lucide-react";

interface StudentDetailsProps {
  student: Student;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ student }) => {
  // Get attendance records for this student
  const attendanceRecords = getAttendanceByStudentId(student.id);
  const summary = getAttendanceSummary(attendanceRecords);

  // For the attendance history chart
  const attendanceHistory = attendanceRecords
    .slice(0, 5)
    .map(record => ({
      date: formatDistanceToNow(record.date, { addSuffix: true }),
      status: record.present ? "Present" : "Absent",
      timeIn: record.timeIn ? record.timeIn.toLocaleTimeString() : "N/A",
      className: record.className,
    }));

  // For the performance chart (mock data since we don't have real performance data)
  const performanceData = [
    { subject: "Participation", score: 85 },
    { subject: "Assignments", score: 92 },
    { subject: "Quizzes", score: 78 },
    { subject: "Projects", score: 88 },
    { subject: "Exams", score: 76 },
  ];

  // For the attendance pie chart
  const attendanceData = [
    { name: "Present", value: summary.present },
    { name: "Absent", value: summary.absent },
  ];
  const COLORS = ["#10b981", "#ef4444"];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Student ID</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-xl font-bold">{student.studentId}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{student.email}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{student.class}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Overall</span>
                <span className="text-sm font-medium">{summary.percentage}%</span>
              </div>
              <Progress value={summary.percentage} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="performance">
            <Award className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="attendance">
            <Calendar className="h-4 w-4 mr-2" />
            Attendance
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
              <CardDescription>
                Student's performance across different assessment areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    score: {},
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent labelClassName="font-medium" />
                        }
                      />
                      <Bar
                        dataKey="score"
                        fill="var(--color-score, hsl(var(--primary)))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Overall Grade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">A-</span>
                  <span className="text-muted-foreground text-sm">83.8% Average</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Assignments Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-2xl font-bold">15/16</span>
                  </div>
                  <span className="text-muted-foreground text-sm">93.75% Completion</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Recent Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-green-500">+4.2%</span>
                  <span className="text-muted-foreground text-sm">Since Last Month</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="attendance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Summary</CardTitle>
                <CardDescription>
                  Overall attendance statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attendanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {attendanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs">Present</p>
                    <p className="text-xl font-bold flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                      {summary.present}/{summary.total}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs">Absent</p>
                    <p className="text-xl font-bold flex items-center justify-center">
                      <XCircle className="h-4 w-4 text-red-500 mr-1" />
                      {summary.absent}/{summary.total}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Attendance</CardTitle>
                <CardDescription>
                  Last 5 attendance records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendanceHistory.length > 0 ? (
                    attendanceHistory.map((record, index) => (
                      <div key={index} className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
                        <div className="flex gap-2">
                          {record.status === "Present" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                          )}
                          <div>
                            <p className="font-medium">{record.className}</p>
                            <p className="text-xs text-muted-foreground">{record.date}</p>
                          </div>
                        </div>
                        {record.status === "Present" && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {record.timeIn}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      No attendance records found
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDetails;
