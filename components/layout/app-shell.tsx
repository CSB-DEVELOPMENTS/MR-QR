import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <SidebarProvider className="min-h-svh flex-col">
      <TopNavbar />

      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <SidebarInset className="min-h-0">
          <div className="flex flex-1 flex-col p-4 md:p-6">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
