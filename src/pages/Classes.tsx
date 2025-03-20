import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import ClassCard from "@/components/ClassCard";
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
  Class, 
  sampleClasses, 
  addClass, 
  updateClass, 
  deleteClass 
} from "@/lib/data";
import { PlusCircle, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Form schema for class creation/editing
const classSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(2, "Description is required"),
  schedule: z.string().min(2, "Schedule is required"),
  totalStudents: z.coerce.number().min(0, "Total students must be a positive number"),
});

type ClassFormValues = z.infer<typeof classSchema>;

const Classes = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<Class[]>(sampleClasses);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [classToEdit, setClassToEdit] = useState<Class | null>(null);
  const [classToDelete, setClassToDelete] = useState<string | null>(null);
  
  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      description: "",
      schedule: "",
      totalStudents: 0,
    },
  });

  const filteredClasses = classes.filter(
    (classItem) =>
      classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.schedule.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClass = () => {
    setClassToEdit(null);
    form.reset({
      name: "",
      description: "",
      schedule: "",
      totalStudents: 0,
    });
    setOpenDialog(true);
  };

  const handleEditClass = (classItem: Class) => {
    setClassToEdit(classItem);
    form.reset({
      name: classItem.name,
      description: classItem.description,
      schedule: classItem.schedule,
      totalStudents: classItem.totalStudents,
    });
    setOpenDialog(true);
  };

  const handleDeleteClass = (id: string) => {
    setClassToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteClass = () => {
    if (classToDelete) {
      const deleted = deleteClass(classToDelete);
      setClasses(classes.filter((c) => c.id !== deleted));
      toast.success("Class deleted successfully");
      setDeleteDialogOpen(false);
      setClassToDelete(null);
    }
  };

  const handleScanAttendance = (id: string) => {
    navigate(`/scanner?classId=${id}`);
  };

  const onSubmit = (data: ClassFormValues) => {
    if (classToEdit) {
      // Update existing class
      const updated = updateClass({
        ...classToEdit,
        ...data,
      });
      setClasses(
        classes.map((c) => (c.id === updated.id ? updated : c))
      );
      toast.success("Class updated successfully");
    } else {
      // Add new class
      const newClassData: Omit<Class, "id"> = {
        name: data.name,
        description: data.description,
        schedule: data.schedule,
        totalStudents: data.totalStudents,
      };
      
      const newClass = addClass(newClassData);
      setClasses([...classes, newClass]);
      toast.success("Class added successfully");
    }
    setOpenDialog(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageTransition className="page-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <h1 className="page-title">Classes</h1>
          <div className="flex w-full sm:w-auto gap-2">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
            <Button onClick={handleAddClass}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Class
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {filteredClasses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center p-8"
            >
              <div className="bg-muted rounded-full p-6 mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No classes found</h3>
              <p className="text-muted-foreground text-center mt-1 mb-6">
                {searchTerm
                  ? `No results for "${searchTerm}"`
                  : "Try adding a new class"}
              </p>
              <Button onClick={handleAddClass}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Class
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredClasses.map((classItem) => (
                <ClassCard
                  key={classItem.id}
                  classItem={classItem}
                  onEdit={handleEditClass}
                  onDelete={handleDeleteClass}
                  onScanAttendance={handleScanAttendance}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {classToEdit ? "Edit Class" : "Add New Class"}
              </DialogTitle>
              <DialogDescription>
                {classToEdit
                  ? "Update the class information below."
                  : "Enter the details for the new class."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Computer Science 101" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Introduction to Computer Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="schedule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Schedule</FormLabel>
                      <FormControl>
                        <Input placeholder="Mon, Wed 10:00 AM - 11:30 AM" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="totalStudents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Students</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">
                    {classToEdit ? "Update Class" : "Add Class"}
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
                class and all related attendance records.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDeleteClass}
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

export default Classes;
