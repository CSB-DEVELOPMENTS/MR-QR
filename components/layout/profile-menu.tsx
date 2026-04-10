"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, Settings, UserCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProfileMenu() {
  const router = useRouter();
  const { user, profile, signOut } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await signOut();
    setLoggingOut(false);
    router.replace("/login");
  }

  const userEmail = user?.email ?? profile?.email ?? "Guest";
  const displayName =
    [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || userEmail;
  const userInitial = (profile?.first_name ?? userEmail).charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" className="h-10 gap-2 px-2">
          <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold">
            {userInitial}
          </div>
          <ChevronDown className="text-muted-foreground h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-0.5">
            <span>{displayName}</span>
            <span className="text-muted-foreground text-xs font-normal">{userEmail}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserCircle2 className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={loggingOut}
          onSelect={(event) => {
            event.preventDefault();
            void handleLogout();
          }}>
          <LogOut className="h-4 w-4" />
          <span>{loggingOut ? "Logging out..." : "Logout"}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-muted-foreground flex items-center gap-2 text-xs font-normal">
          <UserCircle2 className="h-3.5 w-3.5" />
          <span>Manage your account</span>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
