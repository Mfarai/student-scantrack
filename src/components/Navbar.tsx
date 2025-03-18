
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  QrCode, 
  BarChart3, 
  Users, 
  BookOpen, 
  Calendar, 
  Menu, 
  X 
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: JSX.Element;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    title: "Students",
    href: "/students",
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: "Classes",
    href: "/classes",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    title: "Scanner",
    href: "/scanner",
    icon: <QrCode className="w-5 h-5" />,
  },
  {
    title: "History",
    href: "/history",
    icon: <Calendar className="w-5 h-5" />,
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle scroll lock for mobile menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo section */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary text-primary-foreground">
                <QrCode className="w-5 h-5" />
              </div>
              <span className="text-xl font-semibold tracking-tight hidden sm:block">ScanTrack</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "relative px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary mx-3"
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0 
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "md:hidden overflow-hidden",
          !isOpen && "pointer-events-none"
        )}
      >
        <div className="px-4 py-3 space-y-1 bg-background border-b border-border">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;
