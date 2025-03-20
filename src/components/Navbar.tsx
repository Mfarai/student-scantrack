
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  QrCode, 
  BarChart3, 
  Users, 
  BookOpen, 
  Calendar, 
  Menu, 
  X,
  GraduationCap 
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
  {
    title: "Teachers",
    href: "/teachers",
    icon: <GraduationCap className="w-5 h-5" />,
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div 
                className="flex items-center justify-center w-9 h-9 rounded-md bg-primary text-primary-foreground"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <QrCode className="w-5 h-5" />
              </motion.div>
              <motion.span 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-semibold tracking-tight hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
              >
                ScanTrack
              </motion.span>
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
                    "relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.div>
                    <span>{item.title}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-blue-400 mx-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
              aria-expanded={isOpen}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open main menu</span>
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1,
              height: "auto" 
            }}
            exit={{ 
              opacity: 0, 
              height: 0 
            }}
            transition={{ 
              duration: 0.3, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      delay: navItems.indexOf(item) * 0.05,
                      duration: 0.3
                    }}
                  >
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      )}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
