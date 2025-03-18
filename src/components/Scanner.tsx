
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrReader } from "react-qr-reader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { CameraOff, RefreshCw, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScannerProps {
  onScan: (data: string) => void;
  className?: string;
}

const Scanner = ({ onScan, className }: ScannerProps) => {
  const [scanning, setScanning] = useState(true);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [selectedTab, setSelectedTab] = useState("camera");
  const [lastResult, setLastResult] = useState<{
    data: string;
    success: boolean;
    timestamp: number;
  } | null>(null);

  useEffect(() => {
    // Check camera permission
    const checkCameraPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setHasPermission(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setHasPermission(false);
      }
    };

    checkCameraPermission();

    return () => {
      // Clean up logic here
      setScanning(false);
    };
  }, []);

  const handleScan = (result: string | null) => {
    if (result && scanning) {
      setScanning(false);
      setLastResult({
        data: result,
        success: true,
        timestamp: Date.now(),
      });
      
      // Let parent know about the scan result
      onScan(result);
      
      // Show success toast
      toast.success("QR Code scanned successfully");
      
      // Stop scanning temporarily to prevent multiple scans
      setTimeout(() => {
        setScanning(true);
      }, 2000);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    setLastResult({
      data: err.message || "An error occurred while scanning",
      success: false,
      timestamp: Date.now(),
    });
    toast.error("Failed to read QR code");
  };

  const resetScanner = () => {
    setScanning(true);
    setLastResult(null);
  };

  if (hasPermission === false) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px]">
          <CameraOff className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Camera Access Denied</h3>
          <p className="text-muted-foreground text-center mb-4">
            Please allow camera access to scan QR codes for attendance.
          </p>
          <Button 
            onClick={() => setHasPermission(null)}
            className="mt-2"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      <Tabs 
        defaultValue="camera" 
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full mb-4">
          <TabsTrigger value="camera">Camera</TabsTrigger>
          <TabsTrigger value="history">Scan History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="camera" className="min-h-[400px]">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="qr-scanner-container relative">
                {selectedTab === "camera" && scanning && (
                  <>
                    <QrReader
                      constraints={{ facingMode: "environment" }}
                      scanDelay={500}
                      onResult={(result) => {
                        if (result) {
                          handleScan(result.getText());
                        }
                      }}
                      containerStyle={{ 
                        width: "100%",
                        height: "100%",
                      }}
                      videoStyle={{ width: "100%", height: "100%" }}
                      ViewFinder={() => (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <motion.div
                            initial={{ opacity: 0.7, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="border-2 border-white w-64 h-64 max-w-[80%] max-h-[80%] rounded-lg"
                          />
                        </div>
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <div className="px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full text-sm font-medium">
                        Position the QR code in the frame
                      </div>
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-2 right-2 z-10"
                    >
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="bg-background/80 backdrop-blur-sm border-white/10"
                        onClick={resetScanner}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </>
                )}
                
                <AnimatePresence>
                  {lastResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute inset-0 bg-background p-4 flex flex-col items-center justify-center"
                    >
                      <div className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center mb-4",
                        lastResult.success 
                          ? "bg-green-100 text-green-600" 
                          : "bg-red-100 text-red-600"
                      )}>
                        {lastResult.success 
                          ? <Check className="h-8 w-8" /> 
                          : <X className="h-8 w-8" />}
                      </div>
                      
                      <h3 className="text-xl font-medium mb-2">
                        {lastResult.success ? "Scan Completed" : "Scan Failed"}
                      </h3>
                      
                      <p className="text-muted-foreground text-center mb-6 break-all">
                        {lastResult.data}
                      </p>
                      
                      <div className="flex space-x-2">
                        <Button onClick={resetScanner}>
                          Scan Again
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardContent className="p-6 min-h-[400px] flex flex-col items-center justify-center">
              {lastResult ? (
                <div className="w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Recent Scans</h3>
                    <Button variant="outline" size="sm" onClick={resetScanner}>
                      Clear
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                          lastResult.success 
                            ? "bg-green-100 text-green-600" 
                            : "bg-red-100 text-red-600"
                        )}>
                          {lastResult.success 
                            ? <Check className="h-4 w-4" /> 
                            : <X className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium">
                            {lastResult.success ? "Successful Scan" : "Failed Scan"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(lastResult.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm mt-2 p-2 bg-muted rounded break-all">
                        {lastResult.data}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">No recent scans</p>
                  <Button onClick={() => setSelectedTab("camera")}>
                    Start Scanning
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Scanner;
