
import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  sampleAttendanceRecords,
  sampleStudents,
  sampleClasses,
  getAttendanceSummary,
} from "@/lib/data";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  Download,
  FileDown,
  Filter,
  RefreshCcw,
  Search,
  UserCheck,
  UserX,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const AttendanceHistory = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [attendanceFilter, setAttendanceFilter] = useState<"all" | "present" | "absent">("all");

  // Filter attendance records based on selection
  const filteredRecords = sampleAttendanceRecords.filter((record) => {
    // Filter by date
    const dateMatches = selectedDate
      ? record.date.toDateString() === selectedDate.toDateString()
      : true;

    // Filter by class
    const classMatches = selectedClass
      ? record.classId === selectedClass
      : true;

    // Filter by student
    const studentMatches = selectedStudent
      ? record.studentId === selectedStudent
      : true;

    // Filter by attendance status
    const statusMatches =
      attendanceFilter === "all"
        ? true
        : attendanceFilter === "present"
        ? record.present
        : !record.present;

    return dateMatches && classMatches && studentMatches && statusMatches;
  });

  // Get summary stats
  const summary = getAttendanceSummary(filteredRecords);

  const handleReset = () => {
    setSelectedDate(new Date());
    setSelectedClass(null);
    setSelectedStudent(null);
    setAttendanceFilter("all");
  };

  const handleExport = () => {
    try {
      // Create CSV content
      const headers = [
        "Student Name",
        "Student ID", 
        "Class",
        "Date",
        "Status",
        "Time In"
      ];
      
      const csvContent = filteredRecords.map(record => [
        record.studentName,
        record.studentId,
        record.className,
        format(record.date, "MM/dd/yyyy"),
        record.present ? "Present" : "Absent",
        record.timeIn ? format(record.timeIn, "HH:mm:ss") : "-"
      ]);
      
      // Convert to CSV string
      const csvString = [
        headers.join(","),
        ...csvContent.map(row => row.join(","))
      ].join("\n");
      
      // Create download link
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      
      // Set link properties
      const fileName = `attendance_report_${format(new Date(), "yyyyMMdd")}.csv`;
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Attendance report exported successfully");
    } catch (error) {
      console.error("Error exporting attendance:", error);
      toast.error("Failed to export attendance report");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageTransition className="page-container">
        <div className="flex items-center justify-between mb-6">
          <h1 className="page-title">Attendance History</h1>
          <Button variant="outline" onClick={handleExport} className="gap-2">
            <FileDown className="h-4 w-4" />
            Export
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-base font-medium md:text-lg">
                    Filters
                  </CardTitle>
                  <CardDescription>Refine attendance records</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleReset}
                  title="Reset Filters"
                >
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Date</label>
                  <div className="relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            format(selectedDate, "PPP")
                          ) : (
                            <span>Select date</span>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Class</label>
                  <Select
                    value={selectedClass || ""}
                    onValueChange={(value) => setSelectedClass(value || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Classes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Classes</SelectItem>
                      {sampleClasses.map((classItem) => (
                        <SelectItem key={classItem.id} value={classItem.id}>
                          {classItem.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Student</label>
                  <Select
                    value={selectedStudent || ""}
                    onValueChange={(value) => setSelectedStudent(value || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Students" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Students</SelectItem>
                      {sampleStudents.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center">
                  <label className="text-sm font-medium mr-3">Status:</label>
                  <div className="flex space-x-2">
                    <Button
                      variant={attendanceFilter === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAttendanceFilter("all")}
                      className="text-xs h-8"
                    >
                      All
                    </Button>
                    <Button
                      variant={attendanceFilter === "present" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAttendanceFilter("present")}
                      className="text-xs h-8"
                    >
                      <UserCheck className="h-3.5 w-3.5 mr-1" />
                      Present
                    </Button>
                    <Button
                      variant={attendanceFilter === "absent" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAttendanceFilter("absent")}
                      className="text-xs h-8"
                    >
                      <UserX className="h-3.5 w-3.5 mr-1" />
                      Absent
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium md:text-lg">Summary</CardTitle>
              <CardDescription>Attendance statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <div className="text-sm text-muted-foreground mb-1">Total Records</div>
                  <div className="text-3xl font-bold">{summary.total}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <div className="text-sm text-muted-foreground mb-1">Present</div>
                    <div className="text-2xl font-semibold text-green-600">
                      {summary.present}
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="text-sm text-muted-foreground mb-1">Absent</div>
                    <div className="text-2xl font-semibold text-red-600">
                      {summary.absent}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-1 flex justify-between">
                    <span>Attendance Rate</span>
                    <span>{summary.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${summary.percentage}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        summary.percentage >= 90
                          ? "bg-green-500"
                          : summary.percentage >= 75
                          ? "bg-blue-500"
                          : summary.percentage >= 60
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base font-medium md:text-lg">
                  Attendance Records
                </CardTitle>
                <CardDescription>
                  {filteredRecords.length} records found
                </CardDescription>
              </div>
              <Tabs defaultValue="list" className="w-full sm:w-auto">
                <TabsList className="grid grid-cols-2 w-full sm:w-[200px]">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="detail">Details</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="list" className="w-full">
              <TabsContent value="list" className="m-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Student</th>
                        <th className="text-left p-4 font-medium">Class</th>
                        <th className="text-left p-4 font-medium">Date</th>
                        <th className="text-left p-4 font-medium">Time</th>
                        <th className="text-left p-4 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRecords.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-4 text-center text-muted-foreground">
                            No records found with the current filters
                          </td>
                        </tr>
                      ) : (
                        filteredRecords.map((record) => (
                          <tr
                            key={record.id}
                            className="border-b hover:bg-muted/50 transition-colors"
                          >
                            <td className="p-4">{record.studentName}</td>
                            <td className="p-4">{record.className}</td>
                            <td className="p-4">
                              {format(record.date, "MMM dd, yyyy")}
                            </td>
                            <td className="p-4">
                              {record.timeIn
                                ? format(record.timeIn, "hh:mm a")
                                : "-"}
                            </td>
                            <td className="p-4">
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
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="detail" className="m-0">
                <div className="p-4 sm:p-6">
                  {filteredRecords.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      No records found with the current filters
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredRecords.map((record) => (
                        <motion.div
                          key={record.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{record.studentName}</h3>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                record.present
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {record.present ? "Present" : "Absent"}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {record.className}
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <div className="text-muted-foreground">Date</div>
                              <div>{format(record.date, "MMM dd, yyyy")}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Time</div>
                              <div>
                                {record.timeIn
                                  ? format(record.timeIn, "hh:mm a")
                                  : "-"}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </PageTransition>
    </div>
  );
};

export default AttendanceHistory;
