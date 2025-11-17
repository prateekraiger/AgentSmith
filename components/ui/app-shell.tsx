"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const appShellVariants = cva("grid", {
  variants: {
    variant: {
      default: "grid-cols-1",
      sidebar: "grid-cols-[auto_1fr]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface AppShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof appShellVariants> {}

const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(appShellVariants({ variant }), className)}
      {...props}
    />
  )
);
AppShell.displayName = "AppShell";

const AppShellHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("col-span-full border-b", className)}
    {...props}
  />
));
AppShellHeader.displayName = "AppShellHeader";

const AppShellNavbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("border-r", className)} {...props} />
));
AppShellNavbar.displayName = "AppShellNavbar";

const AppShellMain = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("overflow-auto", className)} {...props} />
));
AppShellMain.displayName = "AppShellMain";

const AppShellContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4", className)} {...props} />
));
AppShellContent.displayName = "AppShellContent";

export {
  AppShell,
  AppShellContent,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
};
