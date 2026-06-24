import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-white/12 bg-white/[0.065] shadow-silver backdrop-blur-2xl",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };
