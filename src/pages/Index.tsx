
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { QrCode, Users, BookOpen, ArrowRight, BarChart3, Calendar, Check } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-28">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col gap-6"
            >
              <motion.div 
                variants={fadeInUp}
                className="flex items-center gap-2 mb-2"
              >
                <motion.div 
                  className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <QrCode className="w-5 h-5" />
                </motion.div>
                <h1 className="text-2xl font-bold tracking-tight">ScanTrack</h1>
              </motion.div>
              
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter"
              >
                Attendance Made <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Effortless</span>
              </motion.h2>
              
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-muted-foreground max-w-[600px]"
              >
                A modern QR-based attendance tracking system designed for schools. Streamline attendance, 
                monitor performance, and save valuable teaching time.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 mt-2"
              >
                <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700">
                  <Link to="/dashboard" className="gap-2">
                    Get Started 
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto group">
                  <Link to="/scanner" className="gap-2">
                    Try Scanner 
                    <motion.div
                      animate={{ rotate: [0, 15, 0, -15, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                      <QrCode className="w-4 h-4 group-hover:text-primary transition-colors" />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative lg:right-0 rounded-lg overflow-hidden shadow-2xl bg-white p-2 hidden lg:block"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&h=600&q=80"
                  alt="Teacher taking attendance"
                  className="w-full h-auto rounded-lg object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <QrCode className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Quick Attendance</h3>
                      <p className="text-xs text-muted-foreground">Scan student QR codes in seconds</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 right-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(0,122,255,0.05)_0,transparent_50%)]"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(59,130,246,0.08)_0,transparent_50%)]"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Key Features</h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              ScanTrack provides all the tools you need to manage attendance efficiently
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <FeatureCard
              icon={<QrCode className="h-6 w-6" />}
              title="QR Code Scanning"
              description="Generate unique QR codes for students and scan them quickly for instant attendance tracking"
              color="from-blue-500 to-cyan-400"
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Student Management"
              description="Easily add, edit, and organize student records in a clean, intuitive interface"
              color="from-indigo-500 to-purple-500"
            />
            <FeatureCard
              icon={<BookOpen className="h-6 w-6" />}
              title="Class Organization"
              description="Group students by classes and track attendance for each session separately"
              color="from-orange-400 to-pink-500"
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Performance Analytics"
              description="View detailed attendance statistics and identify attendance patterns"
              color="from-emerald-500 to-teal-400"
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6" />}
              title="Attendance History"
              description="Access comprehensive attendance records and filter by date, class, or student"
              color="from-red-500 to-orange-500"
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Teacher Tools"
              description="Empower teachers with tools to record and monitor student performance"
              color="from-purple-500 to-blue-500"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5 relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Simplify Attendance?</h2>
              <p className="text-muted-foreground mb-8">
                Join schools that have already transformed their attendance process with ScanTrack.
                Save time, reduce errors, and focus more on teaching.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700">
                <Link to="/dashboard" className="gap-2">
                  Start Now 
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <StatCard number="95%" label="Reduction in attendance errors" />
              <StatCard number="83%" label="Time saved on attendance" />
              <StatCard number="100+" label="Schools using ScanTrack" />
              <StatCard number="15k+" label="Students tracked daily" />
            </motion.div>
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute bottom-0 right-0 -z-10 w-full h-full">
          <div className="absolute bottom-0 right-0 w-[70%] h-[70%] bg-[radial-gradient(circle_at_100%_100%,rgba(59,130,246,0.08)_0,transparent_50%)]"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 md:py-12">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-md flex items-center justify-center text-white">
                <QrCode className="w-4 h-4" />
              </div>
              <span className="font-semibold">ScanTrack</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex gap-8"
            >
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link to="/scanner" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Scanner
              </Link>
              <Link to="/students" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Students
              </Link>
              <Link to="/classes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Classes
              </Link>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm text-muted-foreground"
            >
              © {new Date().getFullYear()} ScanTrack. All rights reserved.
            </motion.p>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => (
  <motion.div
    variants={fadeInUp}
    className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300"
    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
  >
    <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${color} text-white flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

interface StatCardProps {
  number: string;
  label: string;
}

const StatCard = ({ number, label }: StatCardProps) => (
  <motion.div
    variants={fadeInUp}
    className="bg-white p-6 rounded-xl border shadow-sm"
    whileHover={{ y: -5, boxShadow: "0 4px 20px -5px rgba(0, 0, 0, 0.1)" }}
  >
    <motion.p 
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 mb-1"
    >
      {number}
    </motion.p>
    <div className="flex items-center gap-1.5">
      <Check className="w-4 h-4 text-green-500" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  </motion.div>
);

export default Index;
