import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className={cn("bg-[#1E293B] border border-[#334155] rounded-xl w-full max-w-md p-6 relative shadow-xl mx-auto", className)}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};
