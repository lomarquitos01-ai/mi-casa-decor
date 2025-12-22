import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background rounded-md hover:bg-foreground/90",
        destructive:
          "bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90",
        outline:
          "border border-border bg-transparent rounded-md hover:bg-muted hover:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80",
        ghost:
          "hover:bg-muted hover:text-foreground rounded-md",
        link:
          "text-foreground underline-offset-4 hover:underline",
        // MI CASA Premium Variants
        premium:
          "bg-foreground text-background tracking-[0.15em] uppercase text-xs hover:bg-foreground/85 transition-all duration-400",
        "premium-outline":
          "border border-foreground bg-transparent text-foreground tracking-[0.15em] uppercase text-xs hover:bg-foreground hover:text-background transition-all duration-400",
        "premium-ghost":
          "text-foreground tracking-[0.15em] uppercase text-xs hover:text-muted-foreground transition-all duration-300",
        gold:
          "bg-gold text-background tracking-[0.15em] uppercase text-xs hover:bg-gold/90 transition-all duration-400",
        "gold-outline":
          "border border-gold text-gold tracking-[0.15em] uppercase text-xs hover:bg-gold hover:text-background transition-all duration-400",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-10 py-3",
        xl: "h-14 px-12 py-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
