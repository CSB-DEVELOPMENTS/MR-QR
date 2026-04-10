"use client";

import { useState } from "react";
import Link from "next/link";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { ProfileMenu } from "@/components/layout/profile-menu";
import { Button } from "@/components/ui/button";
import { useNavbar } from "@/contexts/NavbarContext";
import { QrCode } from "lucide-react";

export function TopNavbar() {
  const { button } = useNavbar();
  const [isLoading, setIsLoading] = useState(false);

  async function handleNavbarAction() {
    if (!button) return;
    setIsLoading(true);
    try {
      await button.onClick();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <header className="bg-card/95 border-border sticky top-0 z-20 border-b backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-2 md:gap-3">
          <Link href="/" className="items-center gap-3 rounded-lg px-2 py-2 hidden md:flex">
            <div className="bg-brand-gradient text-primary-foreground flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold">
              <QrCode />
            </div>
            <div>
              <p className="text-sm font-semibold">MR-QR</p>
              <p className="text-muted-foreground text-xs">Control Panel</p>
            </div>
          </Link>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          {button && (
            <Button
              onClick={handleNavbarAction}
              disabled={isLoading || button.disabled}
              variant={button.variant ?? "default"}
              size="sm">
              {isLoading ? "Loading..." : button.text}
            </Button>
          )}
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
