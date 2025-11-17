"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import React from "react";

function AppHeader() {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger>
          <Menu />
        </SidebarTrigger>
      </div>
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <UserButton />
      </div>
    </header>
  );
}

export default AppHeader;