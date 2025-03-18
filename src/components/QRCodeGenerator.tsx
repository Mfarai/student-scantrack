
import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  title?: string;
  subtitle?: string;
  className?: string;
}

const QRCodeGenerator = ({
  value,
  size = 180,
  title,
  subtitle,
  className,
}: QRCodeGeneratorProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    try {
      const canvas = document.createElement("canvas");
      const svgElement = qrRef.current?.querySelector("svg");
      
      if (!svgElement) {
        throw new Error("SVG element not found");
      }
      
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const img = new Image();
      
      img.onload = () => {
        canvas.width = size + 40; // Add padding
        canvas.height = size + 40 + (title ? 60 : 0); // Add padding and space for title
        const ctx = canvas.getContext("2d");
        
        if (!ctx) {
          throw new Error("Canvas context not available");
        }
        
        // Draw white background
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw title if provided
        if (title) {
          ctx.fillStyle = "black";
          ctx.font = "bold 16px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(title, canvas.width / 2, 25);
          
          if (subtitle) {
            ctx.font = "12px Inter, sans-serif";
            ctx.fillStyle = "#666";
            ctx.fillText(subtitle, canvas.width / 2, 45);
          }
        }
        
        // Draw QR code
        ctx.drawImage(
          img,
          (canvas.width - size) / 2,
          (title ? 60 : 20),
          size,
          size
        );
        
        // Create download link
        const downloadLink = document.createElement("a");
        downloadLink.href = canvas.toDataURL("image/png");
        downloadLink.download = `qrcode-${value}.png`;
        downloadLink.click();
        
        toast.success("QR Code downloaded successfully");
      };
      
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    } catch (error) {
      console.error("Error downloading QR code:", error);
      toast.error("Failed to download QR code");
    }
  };

  const shareQRCode = async () => {
    try {
      if (!navigator.share) {
        throw new Error("Web Share API not supported");
      }
      
      const canvas = document.createElement("canvas");
      const svgElement = qrRef.current?.querySelector("svg");
      
      if (!svgElement) {
        throw new Error("SVG element not found");
      }
      
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const img = new Image();
      
      img.onload = async () => {
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        
        if (!ctx) {
          throw new Error("Canvas context not available");
        }
        
        ctx.drawImage(img, 0, 0, size, size);
        
        try {
          const blob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("Canvas to Blob conversion failed"));
              }
            }, "image/png");
          });
          
          await navigator.share({
            title: title || "QR Code",
            text: subtitle || "Scan this QR code",
            files: [new File([blob], "qrcode.png", { type: "image/png" })],
          });
          
          toast.success("QR Code shared successfully");
        } catch (error) {
          console.error("Error sharing:", error);
          toast.error("Failed to share QR code");
        }
      };
      
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    } catch (error) {
      console.error("Error sharing QR code:", error);
      toast.error("Sharing not supported on this device");
    }
  };

  return (
    <div 
      className={cn(
        "relative rounded-lg bg-white shadow-sm border p-4 flex flex-col items-center overflow-hidden",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={qrRef}
    >
      {title && (
        <div className="text-center mb-3">
          <h3 className="font-medium text-base">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="bg-white p-3 rounded-lg"
      >
        <QRCodeSVG 
          value={value}
          size={size} 
          level="H"
          fgColor="#000000"
          bgColor="#FFFFFF"
          includeMargin={true}
        />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
          pointerEvents: isHovered ? "auto" : "none"
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/5 backdrop-blur-sm flex items-center justify-center gap-2"
      >
        <Button variant="secondary" size="sm" onClick={downloadQRCode}>
          <Download className="h-4 w-4 mr-1" />
          Download
        </Button>
        {navigator.share && (
          <Button variant="outline" size="sm" onClick={shareQRCode}>
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default QRCodeGenerator;
