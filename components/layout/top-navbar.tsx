"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { getFeatureTitle } from "@/config/navigation";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { ProfileMenu } from "@/components/layout/profile-menu";
import { Button } from "@/components/ui/button";
import { useNavbar } from "@/contexts/NavbarContext";

export function TopNavbar() {
  const pathname = usePathname();
  const title = getFeatureTitle(pathname);
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
          <MobileSidebar />
          <h1 className="truncate text-base font-semibold md:text-lg">{title}</h1>
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
