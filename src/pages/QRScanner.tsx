
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Scanner from "@/components/Scanner";
import PerformanceRecorder from "@/components/PerformanceRecorder";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
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
import { 
  Student,
  Class,
  recordAttendance,
  getStudentById,
  getClassById,
  sampleStudents,
  sampleClasses
} from "@/lib/data";
import { toast } from "sonner";
import { ArrowLeft, CheckCheck, QrCode, UserCheck, ClipboardCheck, DoorOpen } from "lucide-react";

const QRScanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const classIdParam = searchParams.get("classId");
  
  const [selectedClass, setSelectedClass] = useState<Class | null>(
    classIdParam ? getClassById(classIdParam) || null : null
  );
  const [recentScans, setRecentScans] = useState<{
    student: Student;
    time: Date;
    success: boolean;
  }[]>([]);
  const [activeTab, setActiveTab] = useState("scan");

  useEffect(() => {
    if (classIdParam) {
      const foundClass = getClassById(classIdParam);
      if (foundClass) {
        setSelectedClass(foundClass);
      }
    }
  }, [classIdParam]);

  const handleScan = (data: string) => {
    // Extract student ID from QR data (format: STxxx-QR)
    const studentId = data.split("-")[0];
    
    if (!studentId) {
      toast.error("Invalid QR code format");
      return;
    }
    
    // Find student by ID
    const student = sampleStudents.find(s => s.studentId === studentId);
    
    if (!student) {
      toast.error("Student not found");
      return;
    }
    
    if (!selectedClass) {
      toast.error("Please select a class first");
      return;
    }
    
    try {
      // Record attendance
      recordAttendance(student.id, selectedClass.id, true);
      
      // Add to recent scans
      setRecentScans([
        {
          student,
          time: new Date(),
          success: true
        },
        ...recentScans
      ]);
      
      // Show success message
      toast.success(`Entrance recorded for ${student.name}`);
      
      // Switch to recent tab
      setTimeout(() => {
        setActiveTab("recent");
      }, 1000);
    } catch (error) {
      console.error("Error recording attendance:", error);
      toast.error("Failed to record entrance");
    }
  };

  const handleClassChange = (classId: string) => {
    const foundClass = getClassById(classId);
    setSelectedClass(foundClass || null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageTransition className="page-container">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="page-title">Attendance & Performance</h1>
        </div>

        <Tabs defaultValue="entrance" className="mb-6">
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="entrance">
              <DoorOpen className="h-4 w-4 mr-2" />
              Entrance Scanner
            </TabsTrigger>
            <TabsTrigger value="recent">
              <UserCheck className="h-4 w-4 mr-2" />
              Recent Entrances
            </TabsTrigger>
            <TabsTrigger value="teacher">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Teacher Console
            </TabsTrigger>
          </TabsList>

          <TabsContent value="entrance">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base font-medium md:text-lg">
                          Entrance Scanner
                        </CardTitle>
                        <CardDescription>
                          Scan student QR codes to record entrances
                        </CardDescription>
                      </div>
                      <div className="w-[200px]">
                        <Select
                          value={selectedClass?.id}
                          onValueChange={handleClassChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            {sampleClasses.map((classItem) => (
                              <SelectItem key={classItem.id} value={classItem.id}>
                                {classItem.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-center mb-4">
                      {selectedClass ? (
                        <div className="py-2">
                          <p className="text-sm text-muted-foreground">Currently recording entrances for</p>
                          <p className="font-medium">{selectedClass.name}</p>
                        </div>
                      ) : (
                        <div className="py-2">
                          <p className="text-sm text-muted-foreground">Please select a class before scanning</p>
                        </div>
                      )}
                    </div>
                    <Scanner onScan={handleScan} />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium md:text-lg">Instructions</CardTitle>
                  <CardDescription>How to use the scanner</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-primary/10 text-primary p-1.5 rounded-full mr-2">
                        <span className="font-medium text-sm">1</span>
                      </div>
                      <p className="text-sm">Select a class from the dropdown menu</p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-primary/10 text-primary p-1.5 rounded-full mr-2">
                        <span className="font-medium text-sm">2</span>
                      </div>
                      <p className="text-sm">Position the QR code within the scanner frame</p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-primary/10 text-primary p-1.5 rounded-full mr-2">
                        <span className="font-medium text-sm">3</span>
                      </div>
                      <p className="text-sm">The system will automatically record entrance</p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-primary/10 text-primary p-1.5 rounded-full mr-2">
                        <span className="font-medium text-sm">4</span>
                      </div>
                      <p className="text-sm">View recent scans in the "Recent Entrances" tab</p>
                    </div>
                  </div>

                  <div className="bg-amber-50 text-amber-800 p-3 rounded-md text-sm mt-6">
                    <p className="font-medium mb-1">Note:</p>
                    <p>Ensure good lighting conditions for optimal scanning performance.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium md:text-lg">Recent Entrances</CardTitle>
                <CardDescription>
                  {selectedClass 
                    ? `Showing entrances for ${selectedClass.name}` 
                    : "All recorded entrances"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentScans.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="flex justify-center">
                        <div className="bg-muted rounded-full p-5">
                          <CheckCheck className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </div>
                      <h3 className="mt-4 font-medium">No entrances recorded</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Scan QR codes to record student entrances
                      </p>
                    </div>
                  ) : (
                    <motion.div layout className="space-y-3">
                      <AnimatePresence>
                        {recentScans.map((scan, index) => (
                          <motion.div
                            key={`${scan.student.id}-${scan.time.getTime()}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center p-3 bg-card border rounded-lg"
                          >
                            <div
                              className="w-10 h-10 rounded-full mr-3 bg-cover bg-center flex-shrink-0"
                              style={{
                                backgroundImage: scan.student.avatar
                                  ? `url(${scan.student.avatar})`
                                  : undefined,
                                backgroundColor: !scan.student.avatar
                                  ? "hsl(var(--muted))"
                                  : undefined,
                              }}
                            >
                              {!scan.student.avatar && (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground font-medium">
                                  {scan.student.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">
                                {scan.student.name}
                              </p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <span className="truncate">
                                  ID: {scan.student.studentId}
                                </span>
                                <span className="mx-1.5">•</span>
                                <span className="truncate">
                                  {scan.time.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            </div>
                            <div className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              Present
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Button
                  variant="outline"
                  onClick={() => navigate("/history")}
                >
                  View Full Attendance History
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="teacher">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium md:text-lg">Teacher Performance Console</CardTitle>
                <CardDescription>
                  Record and track student performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <Select
                    value={selectedClass?.id}
                    onValueChange={handleClassChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select class to filter students" />
                    </SelectTrigger>
                    <SelectContent>
                      {sampleClasses.map((classItem) => (
                        <SelectItem key={classItem.id} value={classItem.id}>
                          {classItem.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <PerformanceRecorder classId={selectedClass?.id} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </PageTransition>
    </div>
  );
};

export default QRScanner;
