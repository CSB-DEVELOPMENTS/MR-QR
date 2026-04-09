"use client";

import { useEffect } from "react";
import { useNavbar } from "@/contexts/NavbarContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { setButton } = useNavbar();
  const router = useRouter();

  useEffect(() => {
    setButton({
      text: "+ Create QR",
      onClick: async () => {
        router.push("/qr");
      },
      variant: "default",
    });

    return () => {
      setButton(null);
    };
  }, [setButton, router]);

  return (
    <div className="bg-brand-gradient-soft border-border rounded-2xl border p-8 md:p-10">
      <main className="flex flex-col gap-6">
        <div className="bg-brand-gradient flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg">
          <span className="text-primary-foreground text-3xl font-bold">QR</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">MR-QR</h1>
          <p className="text-muted-foreground text-base font-medium md:text-lg">
            QR Generation and Smart Link Management
          </p>
        </div>

        <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
          Create beautiful QR codes, manage short links, and track scans with a secure,
          Supabase-powered workflow.
        </p>

        <div className="bg-card border-border inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2">
          <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
          <span className="text-sm font-semibold">Dashboard is ready</span>
        </div>
      </main>
    </div>
  );
}
