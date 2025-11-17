"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserAvatar, useUser } from "@clerk/nextjs";

import {
  Database,
  Headphones,
  LayoutDashboard,
  Menu,
  User2Icon,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuOptions = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "AI Agents",
    url: "#",
    icon: Headphones,
  },

  {
    title: "Data",
    url: "#",
    icon: Database,
  },
  {
    title: "Billing",
    url: "#",
    icon: WalletCards,
  },
  {
    title: "Profile",
    url: "#",
    icon: User2Icon,
  },
];

const AppSidebar = () => {
  const { open } = useSidebar();
  const { user } = useUser();
  const path = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 mb-4">
          <Image src={"/logo.svg"} alt="Logo" width={35} height={35} />
          {open && <h2 className="text-xl font-semibold">AgentSmith</h2>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarMenu>
            {MenuOptions.map((menu, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  asChild
                  size={open ? "lg" : "default"}
                  isActive={path === menu.url}
                >
                  <Link href={menu.url}>
                    <menu.icon />
                    <span>{menu.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Card>
          <CardHeader>
            <CardTitle>Upgrade to Pro</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Get more features and support by upgrading to a pro plan.</p>
            <Button className="w-full mt-4">Upgrade</Button>
          </CardContent>
        </Card>
        <div className="flex items-center gap-2 mt-4">
          <UserAvatar />
          {open && (
            <div>
              <p className="text-sm font-semibold">{user?.fullName}</p>
              <p className="text-xs text-gray-500">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
