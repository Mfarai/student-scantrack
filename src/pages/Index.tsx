
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { QrCode, Users, BookOpen, ArrowRight, BarChart3, Calendar } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-28">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                  <QrCode className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">ScanTrack</h1>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Attendance Made <span className="text-primary">Effortless</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-[600px]">
                A modern QR-based attendance tracking system designed for schools. Streamline attendance, 
                monitor performance, and save valuable teaching time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to="/dashboard" className="gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <Link to="/scanner" className="gap-2">
                    Try Scanner <QrCode className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative lg:right-0 rounded-lg overflow-hidden shadow-2xl bg-white p-2 hidden lg:block"
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
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              ScanTrack provides all the tools you need to manage attendance efficiently
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<QrCode className="h-6 w-6" />}
              title="QR Code Scanning"
              description="Generate unique QR codes for students and scan them quickly for instant attendance tracking"
              delay={0.1}
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Student Management"
              description="Easily add, edit, and organize student records in a clean, intuitive interface"
              delay={0.2}
            />
            <FeatureCard
              icon={<BookOpen className="h-6 w-6" />}
              title="Class Organization"
              description="Group students by classes and track attendance for each session separately"
              delay={0.3}
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Performance Analytics"
              description="View detailed attendance statistics and identify attendance patterns"
              delay={0.4}
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6" />}
              title="Attendance History"
              description="Access comprehensive attendance records and filter by date, class, or student"
              delay={0.5}
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Teacher Tools"
              description="Empower teachers with tools to record and monitor student performance"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Simplify Attendance?</h2>
              <p className="text-muted-foreground mb-8">
                Join schools that have already transformed their attendance process with ScanTrack.
                Save time, reduce errors, and focus more on teaching.
              </p>
              <Button asChild size="lg">
                <Link to="/dashboard" className="gap-2">
                  Start Now <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatCard number="95%" label="Reduction in attendance errors" />
              <StatCard number="83%" label="Time saved on attendance" />
              <StatCard number="100+" label="Schools using ScanTrack" />
              <StatCard number="15k+" label="Students tracked daily" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 md:py-12">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white">
                <QrCode className="w-4 h-4" />
              </div>
              <span className="font-semibold">ScanTrack</span>
            </div>
            <div className="flex gap-8">
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/scanner" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Scanner
              </Link>
              <Link to="/students" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Students
              </Link>
              <Link to="/classes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Classes
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ScanTrack. All rights reserved.
            </p>
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
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
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
  <div className="bg-white p-6 rounded-xl border shadow-sm">
    <p className="text-3xl font-bold text-primary mb-1">{number}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

export default Index;
