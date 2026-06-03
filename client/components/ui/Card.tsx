import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-[#334155] bg-[#1E293B] text-[#F8FAFC] shadow-sm",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };
