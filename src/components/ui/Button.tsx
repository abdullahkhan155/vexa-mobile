"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// I'll install class-variance-authority quickly as it's standard for this pattern, 
// or I can just implement a simple version if I don't want the dependency. 
// Actually, I'll stick to a simpler implementation for now to avoid extra deps if not needed, 
// but cva is cleaner. I'll just use simple template literals for now to be fast and dependency-light 
// unless I really need complex variants. 
// Wait, I should probably generate a robust one. 
// Let's use a simple prop-based approach for now.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
    className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 shadow-lg shadow-cyan-500/20 border-0",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "bg-transparent hover:bg-white/10 text-white",
            outline: "bg-transparent border border-white/20 hover:bg-white/10 text-white",
        };

        const sizes = {
            sm: "h-8 px-4 text-xs",
            md: "h-10 px-6 text-sm",
            lg: "h-12 px-8 text-base",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
