
/**
 * Main Application Component
 * 
 * This is the root component of the application that sets up:
 * - React Query for data fetching and state management
 * - React Router for navigation
 * - Framer Motion for animations
 * - Toast notifications
 * - Tooltip functionality
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Classes from "./pages/Classes";
import QRScanner from "./pages/QRScanner";
import AttendanceHistory from "./pages/AttendanceHistory";
import NotFound from "./pages/NotFound";
import Teachers from "./pages/Teachers";

// Initialize React Query client
const queryClient = new QueryClient();

/**
 * AnimatedRoutes Component
 * 
 * Wraps all routes with AnimatePresence to enable smooth transitions
 * between pages using Framer Motion animations.
 */
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/scanner" element={<QRScanner />} />
        <Route path="/history" element={<AttendanceHistory />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

/**
 * App Component
 * 
 * The main application component that sets up the providers and routing.
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" closeButton theme="light" />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
