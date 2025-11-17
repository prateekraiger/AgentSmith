"use client";

import { useSidebar } from "@/components/ui/sidebar";
import React from "react";
import AppHeader from "./_components/AppHeader";
import AppSidebar from "./_components/AppSidebar";

function Dashboard({ children }: any) {
  const { open } = useSidebar();

  return (
    <div className="flex">
      <div
        className={`transition-all duration-300 ${
          open ? "w-64" : "w-0"
        } md:w-64`}
      >
        <AppSidebar />
      </div>
      <main className="flex-1">
        <AppHeader />
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}

export default Dashboard;
