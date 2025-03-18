
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import StudentCard from "@/components/StudentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Student, 
  sampleStudents, 
  sampleClasses, 
  addStudent, 
  updateStudent, 
  deleteStudent 
} from "@/lib/data";
import { UserPlus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Form schema for student creation/editing
const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  studentId: z.string().min(2, "Student ID is required"),
  email: z.string().email("Invalid email address"),
  class: z.string().min(1, "Class is required"),
});

const Students = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>(sampleStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      studentId: "",
      email: "",
      class: "",
    },
  });

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    setStudentToEdit(null);
    form.reset({
      name: "",
      studentId: "",
      email: "",
      class: "",
    });
    setOpenDialog(true);
  };

  const handleEditStudent = (student: Student) => {
    setStudentToEdit(student);
    form.reset({
      name: student.name,
      studentId: student.studentId,
      email: student.email,
      class: student.class,
    });
    setOpenDialog(true);
  };

  const handleDeleteStudent = (id: string) => {
    setStudentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteStudent = () => {
    if (studentToDelete) {
      const deleted = deleteStudent(studentToDelete);
      setStudents(students.filter((s) => s.id !== deleted));
      toast.success("Student deleted successfully");
      setDeleteDialogOpen(false);
      setStudentToDelete(null);
    }
  };

  const onSubmit = (data: z.infer<typeof studentSchema>) => {
    if (studentToEdit) {
      // Update existing student
      const updated = updateStudent({
        ...studentToEdit,
        ...data,
      });
      setStudents(
        students.map((s) => (s.id === updated.id ? updated : s))
      );
      toast.success("Student updated successfully");
    } else {
      // Add new student
      const newStudent = addStudent(data);
      setStudents([...students, newStudent as Student]);
      toast.success("Student added successfully");
    }
    setOpenDialog(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageTransition className="page-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <h1 className="page-title">Students</h1>
          <div className="flex w-full sm:w-auto gap-2">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
            <Button onClick={handleAddStudent}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {filteredStudents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center p-8"
            >
              <div className="bg-muted rounded-full p-6 mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No students found</h3>
              <p className="text-muted-foreground text-center mt-1 mb-6">
                {searchTerm
                  ? `No results for "${searchTerm}"`
                  : "Try adding a new student"}
              </p>
              <Button onClick={handleAddStudent}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onEdit={handleEditStudent}
                  onDelete={handleDeleteStudent}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {studentToEdit ? "Edit Student" : "Add New Student"}
              </DialogTitle>
              <DialogDescription>
                {studentToEdit
                  ? "Update the student's information below."
                  : "Enter the details for the new student."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student ID</FormLabel>
                      <FormControl>
                        <Input placeholder="ST001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@school.edu"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sampleClasses.map((classItem) => (
                            <SelectItem
                              key={classItem.id}
                              value={classItem.name}
                            >
                              {classItem.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">
                    {studentToEdit ? "Update Student" : "Add Student"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                student and all related attendance records.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDeleteStudent}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PageTransition>
    </div>
  );
};

export default Students;
