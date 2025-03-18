
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { QrCode, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate("/dashboard");
    }, 5000); // Auto redirect after 5 seconds
    
    return () => clearTimeout(redirectTimer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mb-8"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white">
            <QrCode className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">ScanTrack</h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-muted-foreground mb-8 leading-relaxed"
        >
          A streamlined school attendance tracking system. Simply generate QR codes for students and scan them to record attendance effortlessly.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button 
            onClick={() => navigate("/dashboard")} 
            size="lg"
            className="gap-2"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full"
      >
        <FeatureCard
          title="QR Attendance"
          description="Generate and scan QR codes for quick and accurate attendance tracking."
          delay={0.8}
        />
        <FeatureCard
          title="Class Management"
          description="Organize students by classes and track attendance for each session."
          delay={1}
        />
        <FeatureCard
          title="Detailed Reports"
          description="View comprehensive attendance statistics and export records."
          delay={1.2}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="mt-12 text-sm text-muted-foreground"
      >
        Redirecting to dashboard in a few seconds...
      </motion.div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ title, description, delay }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow"
  >
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </motion.div>
);

export default Index;
