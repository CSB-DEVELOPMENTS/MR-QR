"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type NavbarButtonConfig = {
  text: string;
  onClick: () => void | Promise<void>;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  disabled?: boolean;
};

type NavbarContextType = {
  button: NavbarButtonConfig | null;
  setButton: (button: NavbarButtonConfig | null) => void;
};

const NavbarContext = createContext<NavbarContextType | null>(null);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [button, setButton] = useState<NavbarButtonConfig | null>(null);

  return <NavbarContext.Provider value={{ button, setButton }}>{children}</NavbarContext.Provider>;
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider.");
  }
  return context;
}
