import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sampleStudents, sampleClasses } from "@/lib/data";
import { PlusCircle, Users, BookOpen, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Teachers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRecordingOpen, setIsRecordingOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [performance, setPerformance] = useState("");
  const [grade, setGrade] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmitPerformance = () => {
    if (!selectedStudent || !selectedClass || !performance) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill all required fields",
      });
      return;
    }

    toast({
      title: "Performance recorded",
      description: "Student performance has been successfully recorded",
    });

    setSelectedStudent("");
    setSelectedClass("");
    setPerformance("");
    setGrade("");
    setNotes("");
    setIsRecordingOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageTransition className="page-container">
        <div className="flex items-center justify-between mb-6">
          <h1 className="page-title">Teacher Dashboard</h1>
          <Button onClick={() => setIsRecordingOpen(true)}>Record Student Performance</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Record Performance</CardTitle>
              <CardDescription>Evaluate student class participation and understanding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Track student progress, engagement, and understanding in real-time.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => setIsRecordingOpen(true)} 
                variant="outline" 
                className="w-full"
              >
                Record Now
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Students</CardTitle>
              <CardDescription>View and edit student information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Access detailed student profiles and attendance histories.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => navigate("/students")} 
                variant="outline" 
                className="w-full"
              >
                <Users className="mr-2 h-4 w-4" />
                View Students
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Classes</CardTitle>
              <CardDescription>View and edit class information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Set up and organize classes, schedules, and student groups.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => navigate("/classes")} 
                variant="outline" 
                className="w-full"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                View Classes
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Recent Student Activities</CardTitle>
            <CardDescription>Track latest performance and attendance records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                No recent activities yet. Start recording student performance to see data here.
              </p>
              <Button 
                onClick={() => setIsRecordingOpen(true)} 
                variant="outline" 
                className="gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                New Performance Record
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Classes</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/classes")}
                  className="gap-1"
                >
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sampleClasses.slice(0, 3).map((cls) => (
                  <div key={cls.id} className="flex justify-between items-center p-2 rounded-md hover:bg-accent cursor-pointer">
                    <div>
                      <p className="font-medium">{cls.name}</p>
                      <p className="text-xs text-muted-foreground">{cls.schedule}</p>
                    </div>
                    <span className="text-sm">{cls.totalStudents} students</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Students</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/students")}
                  className="gap-1"
                >
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sampleStudents.slice(0, 3).map((student) => (
                  <div key={student.id} className="flex justify-between items-center p-2 rounded-md hover:bg-accent cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                      >
                        <span className="text-muted-foreground font-medium">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.class}</p>
                      </div>
                    </div>
                    <span className="text-sm">ID: {student.studentId}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </PageTransition>

      <Dialog open={isRecordingOpen} onOpenChange={setIsRecordingOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Record Student Performance</DialogTitle>
            <DialogDescription>
              Enter details about the student's performance in class
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="student">Student</Label>
              <Select 
                value={selectedStudent} 
                onValueChange={setSelectedStudent}
              >
                <SelectTrigger id="student">
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  {sampleStudents.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} - {student.studentId}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="class">Class</Label>
              <Select 
                value={selectedClass} 
                onValueChange={setSelectedClass}
              >
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {sampleClasses.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="performance">Performance</Label>
              <Select 
                value={performance} 
                onValueChange={setPerformance}
              >
                <SelectTrigger id="performance">
                  <SelectValue placeholder="Select performance level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="average">Average</SelectItem>
                  <SelectItem value="needsImprovement">Needs Improvement</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="grade">Grade (Optional)</Label>
              <Input
                id="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="Enter grade if applicable"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional notes about student performance"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmitPerformance}>
              Record Performance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Teachers;
