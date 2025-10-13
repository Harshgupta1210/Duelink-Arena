"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Users,
  Swords,
  Mail,
  Trophy,
  History,
  Settings,
  HelpCircle,
} from "lucide-react";

const navItems = [
  { href: "/classmates", icon: Users, label: "Classmates" },
  { href: "/invites", icon: Mail, label: "Invites" },
  { href: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { href: "/results", icon: History, label: "Match History" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border/80"
      variant="sidebar"
    >
      <SidebarHeader>
        <Link href="/classmates" className="flex items-center gap-2">
          <Swords className="h-7 w-7 text-primary" />
          <span className="font-bold text-lg font-headline from-accent to-primary bg-gradient-to-r bg-clip-text text-transparent">
            Duelink Arena
          </span>
        </Link>
      </SidebarHeader>

      <SidebarMenu className="flex-1 p-2">
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={item.label}
              >
                <a>
                  <item.icon />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Help">
              <HelpCircle />
              <span>Help</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
