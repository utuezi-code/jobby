"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cta";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold rounded-lg cursor-pointer transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-indigo-500 text-white hover:bg-indigo-600 focus-visible:outline-indigo-500":
              variant === "primary",
            "bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:outline-slate-400":
              variant === "secondary",
            "border border-indigo-500 text-indigo-500 hover:bg-indigo-50 focus-visible:outline-indigo-500":
              variant === "outline",
            "text-slate-600 hover:bg-slate-100 focus-visible:outline-slate-400":
              variant === "ghost",
            "bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:outline-emerald-500":
              variant === "cta",
          },
          {
            "text-sm px-3 py-1.5": size === "sm",
            "text-sm px-4 py-2": size === "md",
            "text-base px-6 py-3": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
