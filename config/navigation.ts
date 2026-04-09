import type { LucideIcon } from "lucide-react";
import { BarChart3, CreditCard, Home, Link2, QrCode, UserCircle2 } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const navigationItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: Home },
  { label: "QR Codes", href: "/qr", icon: QrCode },
  { label: "Links", href: "/links", icon: Link2 },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Subscription", href: "/subscription", icon: CreditCard },
  { label: "Profile", href: "/profile", icon: UserCircle2 },
];

function normalizePath(pathname: string): string {
  if (!pathname) {
    return "/";
  }

  return pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function isNavItemActive(itemHref: string, pathname: string): boolean {
  const normalizedPathname = normalizePath(pathname);
  const normalizedHref = normalizePath(itemHref);

  if (normalizedHref === "/") {
    return normalizedPathname === "/";
  }

  return (
    normalizedPathname === normalizedHref || normalizedPathname.startsWith(`${normalizedHref}/`)
  );
}

export function getFeatureTitle(pathname: string): string {
  for (const item of navigationItems) {
    if (isNavItemActive(item.href, pathname)) {
      return item.label;
    }
  }

  if (pathname === "/") {
    return "Dashboard";
  }

  const segment = normalizePath(pathname).split("/").filter(Boolean).at(-1);
  if (!segment) {
    return "Dashboard";
  }

  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
