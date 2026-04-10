import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { NavbarProvider } from "@/contexts/NavbarContext";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <NavbarProvider>
      <AppShell>{children}</AppShell>
    </NavbarProvider>
  );
}
