"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems, isNavItemActive } from "@/config/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

type SidebarNavProps = {
  onNavigate?: () => void;
};

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  function handleNavigate() {
    onNavigate?.();
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  return (
    <nav aria-label="Primary">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className="gap-1">
            {navigationItems.map((item) => {
              const active = isNavItemActive(item.href, pathname);
              const Icon = item.icon;

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
                    <Link href={item.href} onClick={handleNavigate}>
                      <Icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </nav>
  );
}
