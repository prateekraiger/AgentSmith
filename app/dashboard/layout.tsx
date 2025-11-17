import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import Dashboard from "./Dashboard";

function DashboardLayout({ children }: any) {
  return (
    <SidebarProvider>
      <Dashboard>{children}</Dashboard>
    </SidebarProvider>
  );
}

export default DashboardLayout;
