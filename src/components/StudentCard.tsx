
import { useState } from "react";
import { motion } from "framer-motion";
import { Student } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MoreVertical, Edit, Trash2, QrCode } from "lucide-react";
import QRCodeGenerator from "./QRCodeGenerator";
import StudentDetails from "./StudentDetails";
import { cn } from "@/lib/utils";

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
  className?: string;
}

const StudentCard = ({
  student,
  onEdit,
  onDelete,
  className,
}: StudentCardProps) => {
  const [showQrCode, setShowQrCode] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={className}
      >
        <Card className="h-full hover:shadow-md transition-shadow overflow-hidden group">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Badge variant="outline" className="px-2 py-0 text-xs font-normal">
                ID: {student.studentId}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-70 group-hover:opacity-100"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(student)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowQrCode(true)}>
                    <QrCode className="mr-2 h-4 w-4" />
                    Show QR Code
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => onDelete(student.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardTitle 
              className="text-base mt-2 cursor-pointer hover:text-primary transition-colors"
              onClick={() => setShowDetails(true)}
            >
              {student.name}
            </CardTitle>
            <CardDescription>
              <span className="flex items-center text-xs">
                <Mail className="h-3 w-3 mr-1" />
                {student.email}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full mr-3 bg-cover bg-center",
                  !student.avatar && "bg-muted flex items-center justify-center"
                )}
                style={
                  student.avatar ? { backgroundImage: `url(${student.avatar})` } : {}
                }
              >
                {!student.avatar && (
                  <span className="text-muted-foreground font-medium">
                    {student.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Class</p>
                <p className="text-sm font-medium">{student.class}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setShowQrCode(true)}
            >
              <QrCode className="h-3.5 w-3.5 mr-2" />
              View QR Code
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <Dialog open={showQrCode} onOpenChange={setShowQrCode}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Student QR Code</DialogTitle>
            <DialogDescription>
              Scan this code to mark attendance for {student.name}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <QRCodeGenerator
              value={student.qrCode}
              title={student.name}
              subtitle={`Student ID: ${student.studentId}`}
              size={220}
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Student Information</DialogTitle>
            <DialogDescription>
              Detailed information and performance for {student.name}
            </DialogDescription>
          </DialogHeader>
          <StudentDetails student={student} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StudentCard;
