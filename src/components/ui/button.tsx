import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function Button({
  asChild = false,
  children,
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(
        "pixel-button inline-flex min-h-12 items-center justify-center px-4 py-3 text-center text-[11px] leading-[1.5] font-normal focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-frost disabled:pointer-events-none disabled:opacity-50",
        variant === "secondary" ? "pixel-button-secondary" : "pixel-button-primary",
        className,
      )}
      type={asChild ? undefined : type}
      {...props}
    >
      {children}
    </Component>
  );
}