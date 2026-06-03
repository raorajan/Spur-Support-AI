import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[#6366F1] text-white hover:bg-[#4F46E5]": variant === "primary",
            "bg-[#1E293B] text-white hover:bg-[#334155]": variant === "secondary",
            "border border-[#334155] bg-transparent hover:bg-[#1E293B] text-white": variant === "outline",
            "hover:bg-[#1E293B] hover:text-white text-[#94A3B8]": variant === "ghost",
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4 py-2": size === "md",
            "h-12 px-8 text-lg": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
