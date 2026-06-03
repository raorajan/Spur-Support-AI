import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-[#334155] bg-[#0F172A] px-3 py-2 text-sm ring-offset-[#0F172A] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#94A3B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-[#F8FAFC]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
