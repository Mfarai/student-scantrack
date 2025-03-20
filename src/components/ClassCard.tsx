
/**
 * ClassCard Component
 * 
 * Displays information about a class in a card format with actions
 * for editing, deleting, and taking attendance.
 */

import { motion } from "framer-motion";
import { Class } from "@/lib/data";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Clock, 
  MoreVertical, 
  Edit, 
  Trash2, 
  QrCode 
} from "lucide-react";

interface ClassCardProps {
  /** Class data to display */
  classItem: Class;
  /** Function to call when edit action is triggered */
  onEdit: (classItem: Class) => void;
  /** Function to call when delete action is triggered */
  onDelete: (id: string) => void;
  /** Function to call when take attendance action is triggered */
  onScanAttendance: (id: string) => void;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Card component to display class information
 * 
 * @param classItem - Class data to display
 * @param onEdit - Edit handler function
 * @param onDelete - Delete handler function
 * @param onScanAttendance - Attendance scanner handler function
 * @param className - Optional additional CSS classes
 */
const ClassCard = ({
  classItem,
  onEdit,
  onDelete,
  onScanAttendance,
  className,
}: ClassCardProps) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="h-full hover:shadow-md transition-shadow overflow-hidden group">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge 
              variant="outline" 
              className="px-2 py-0 text-xs font-normal"
            >
              ID: {classItem.id}
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
                <DropdownMenuItem onClick={() => onEdit(classItem)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onScanAttendance(classItem.id)}>
                  <QrCode className="mr-2 h-4 w-4" />
                  Take Attendance
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive" 
                  onClick={() => onDelete(classItem.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardTitle className="text-base mt-2">{classItem.name}</CardTitle>
          <CardDescription>{classItem.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 pb-2">
          <div className="flex items-start space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="text-sm">{classItem.schedule}</div>
          </div>
          <div className="flex items-start space-x-2">
            <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="text-sm">
              <span className="font-medium">{classItem.totalStudents}</span> Students
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-1">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => onScanAttendance(classItem.id)}
          >
            <QrCode className="h-3.5 w-3.5 mr-2" />
            Take Attendance
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ClassCard;
