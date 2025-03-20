
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Search, Award, ClipboardCheck } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { 
  Student, 
  sampleStudents, 
  getStudentById,
  getClassById,
  sampleClasses 
} from "@/lib/data";

interface PerformanceFormValues {
  studentId: string;
  activityType: string;
  score: string;
  comments: string;
}

interface PerformanceRecorderProps {
  classId?: string;
  className?: string;
}

const PerformanceRecorder = ({ classId, className }: PerformanceRecorderProps) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [savedRecords, setSavedRecords] = useState<{
    student: Student;
    activityType: string;
    score: string;
    comments: string;
    timestamp: Date;
  }[]>([]);

  const selectedClass = classId ? getClassById(classId) : null;
  
  const form = useForm<PerformanceFormValues>({
    defaultValues: {
      studentId: "",
      activityType: "quiz",
      score: "",
      comments: ""
    }
  });

  // Filter students based on search term and selected class
  const filteredStudents = sampleStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !classId || student.class === selectedClass?.name;
    return matchesSearch && matchesClass;
  });

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    form.setValue("studentId", student.id);
  };

  const handleSubmit = (values: PerformanceFormValues) => {
    if (!selectedStudent) {
      toast.error("Please select a student first");
      return;
    }

    // In a real app, we would save this to the database
    // For now, we'll just add it to our local state
    const newRecord = {
      student: selectedStudent,
      activityType: values.activityType,
      score: values.score,
      comments: values.comments,
      timestamp: new Date()
    };

    setSavedRecords([newRecord, ...savedRecords]);
    
    // Reset form and selected student
    form.reset();
    setSelectedStudent(null);
    
    toast.success(`Performance recorded for ${selectedStudent.name}`);
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium md:text-lg">
              Select Student
            </CardTitle>
            <CardDescription>
              {selectedClass 
                ? `Recording performance for ${selectedClass.name}` 
                : "Search and select a student"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name or ID..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <ScrollArea className="h-[250px] border rounded-md">
                <div className="p-2 space-y-1">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <div
                        key={student.id}
                        className={`flex items-center p-2 rounded-md cursor-pointer ${
                          selectedStudent?.id === student.id
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-accent"
                        }`}
                        onClick={() => handleSelectStudent(student)}
                      >
                        <div
                          className="w-8 h-8 rounded-full mr-3 bg-cover bg-center flex-shrink-0"
                          style={{
                            backgroundImage: student.avatar
                              ? `url(${student.avatar})`
                              : undefined,
                            backgroundColor: !student.avatar
                              ? "hsl(var(--muted))"
                              : undefined,
                          }}
                        >
                          {!student.avatar && (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-medium">
                              {student.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {student.name}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="truncate">ID: {student.studentId}</span>
                            <span className="mx-1.5">•</span>
                            <span className="truncate">{student.class}</span>
                          </div>
                        </div>
                        {selectedStudent?.id === student.id && (
                          <Check className="h-4 w-4 ml-2 text-primary" />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>No students found</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium md:text-lg">
              <div className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-primary" />
                Record Performance
              </div>
            </CardTitle>
            <CardDescription>
              {selectedStudent 
                ? `Recording for ${selectedStudent.name}` 
                : "Select a student first"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="activityType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={!selectedStudent}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select activity type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="quiz">Quiz</SelectItem>
                          <SelectItem value="assignment">Assignment</SelectItem>
                          <SelectItem value="exam">Exam</SelectItem>
                          <SelectItem value="project">Project</SelectItem>
                          <SelectItem value="participation">Class Participation</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="score"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Performance Score</FormLabel>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        className="flex space-x-2"
                        disabled={!selectedStudent}
                      >
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="A" />
                          </FormControl>
                          <FormLabel className="cursor-pointer">A</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="B" />
                          </FormControl>
                          <FormLabel className="cursor-pointer">B</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="C" />
                          </FormControl>
                          <FormLabel className="cursor-pointer">C</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="D" />
                          </FormControl>
                          <FormLabel className="cursor-pointer">D</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="F" />
                          </FormControl>
                          <FormLabel className="cursor-pointer">F</FormLabel>
                        </FormItem>
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comments</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Add notes about student performance..." 
                          className="resize-none" 
                          {...field}
                          disabled={!selectedStudent}
                        />
                      </FormControl>
                      <FormDescription>
                        Optional feedback or notes about the performance
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={!selectedStudent}
                >
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  Save Performance Record
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {savedRecords.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base font-medium md:text-lg">
              Recently Saved Records
            </CardTitle>
            <CardDescription>
              Performance records from this session
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-3">
                {savedRecords.map((record, index) => (
                  <div 
                    key={index} 
                    className="p-3 border rounded-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div
                          className="w-8 h-8 rounded-full mr-3 bg-cover bg-center"
                          style={{
                            backgroundImage: record.student.avatar
                              ? `url(${record.student.avatar})`
                              : undefined,
                            backgroundColor: !record.student.avatar
                              ? "hsl(var(--muted))"
                              : undefined,
                          }}
                        >
                          {!record.student.avatar && (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-medium">
                              {record.student.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{record.student.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {record.student.studentId} • {record.student.class}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-primary/10 text-primary font-semibold px-2 py-1 rounded">
                          {record.score}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="inline-block px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-xs mb-2">
                        {record.activityType.charAt(0).toUpperCase() + record.activityType.slice(1)}
                      </span>
                      {record.comments && (
                        <p className="text-muted-foreground">{record.comments}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Recorded on {record.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => setSavedRecords([])}
            >
              Clear Records
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default PerformanceRecorder;
