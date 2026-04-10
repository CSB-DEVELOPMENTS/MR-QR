"use client";

import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Sidebar as UiSidebar, SidebarContent, SidebarSeparator } from "@/components/ui/sidebar";

export function Sidebar() {
  return (
    <UiSidebar collapsible="offcanvas" className="top-16 h-[calc(100svh-4rem)]">
      {/* <SidebarHeader className="">
        <Link href="/" className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="bg-brand-gradient text-primary-foreground flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold">
            <QrCode />
          </div>
          <div>
            <p className="text-sm font-semibold">MR-QR</p>
            <p className="text-muted-foreground text-xs">Control Panel</p>
          </div>
        </Link>
      </SidebarHeader> */}

      <SidebarSeparator />

      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
    </UiSidebar>
  );
}
