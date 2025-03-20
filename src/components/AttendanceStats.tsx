
/**
 * AttendanceStats Component
 * 
 * Displays a summary of attendance statistics with animated visuals.
 * Used on the Dashboard and other pages to provide a quick overview
 * of attendance metrics.
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AttendanceSummary } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserCheck, UserX, Users } from "lucide-react";

interface AttendanceStatsProps {
  /** Title for the stats card */
  title: string;
  /** Attendance data to display */
  data: AttendanceSummary;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Attendance Statistics Card
 * 
 * @param title - Title of the statistics card
 * @param data - Attendance summary data to display
 * @param className - Optional additional CSS classes
 */
const AttendanceStats = ({ title, data, className }: AttendanceStatsProps) => {
  const { total, present, absent, percentage } = data;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium md:text-lg">{title}</CardTitle>
        <CardDescription>Attendance overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard
            title="Total"
            value={total}
            icon={<Users className="w-4 h-4" />}
            color="bg-blue-50 text-blue-600"
            delay={0}
          />
          <StatsCard
            title="Present"
            value={present}
            icon={<UserCheck className="w-4 h-4" />}
            color="bg-green-50 text-green-600"
            delay={0.1}
          />
          <StatsCard
            title="Absent"
            value={absent}
            icon={<UserX className="w-4 h-4" />}
            color="bg-red-50 text-red-600"
            delay={0.2}
          />
          <StatsCard
            title="Percentage"
            value={`${percentage}%`}
            color="bg-purple-50 text-purple-600"
            delay={0.3}
          />
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Attendance Rate</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className={cn(
                "h-full rounded-full",
                percentage >= 90
                  ? "bg-green-500"
                  : percentage >= 75
                  ? "bg-blue-500"
                  : percentage >= 60
                  ? "bg-yellow-500"
                  : "bg-red-500"
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface StatsCardProps {
  /** Title of the stat */
  title: string;
  /** Value to display */
  value: number | string;
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** CSS color classes for the icon background */
  color: string;
  /** Animation delay for staggered entrance */
  delay: number;
}

/**
 * Individual statistic card component
 * 
 * @param title - Title of the statistic
 * @param value - Value to display
 * @param icon - Optional icon
 * @param color - CSS color classes
 * @param delay - Animation delay
 */
const StatsCard = ({ title, value, icon, color, delay }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className="bg-card rounded-lg p-3 flex items-center space-x-3 shadow-sm border"
    >
      {icon && (
        <div className={cn("p-2 rounded-md", color)}>
          {icon}
        </div>
      )}
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </motion.div>
  );
};

export default AttendanceStats;
