export default function Home() {
  return (
    <div className="bg-brand-gradient-soft flex min-h-screen items-center justify-center">
      <main className="flex flex-col items-center justify-center gap-8 px-6 text-center">
        <div className="bg-brand-gradient flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg">
          <span className="text-primary-foreground text-4xl font-bold">QR</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-foreground text-6xl font-bold tracking-tight sm:text-7xl">MR-QR</h1>
          <p className="text-muted-foreground text-xl font-medium sm:text-2xl">
            QR Generation and Smart Link Management
          </p>
        </div>

        <div className="bg-secondary inline-flex items-center gap-2 rounded-full px-6 py-3">
          <div className="bg-primary h-2 w-2 animate-pulse rounded-full"></div>
          <span className="text-secondary-foreground text-sm font-semibold">Coming Soon</span>
        </div>

        <p className="text-muted-foreground max-w-md text-base sm:text-lg">
          Create beautiful QR codes, manage short links, and track scans with a secure,
          Supabase-powered workflow.
        </p>

        <button className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 rounded-full px-8 py-3 font-semibold shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
          Notify Me at Launch
        </button>

        <p className="text-muted-foreground mt-8 text-sm">
          Building a fast and secure QR platform for you...
        </p>
      </main>
    </div>
  );
}
