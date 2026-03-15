export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-cyan-50 via-teal-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="flex flex-col items-center justify-center gap-8 px-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-teal-600 shadow-lg">
          <span className="text-4xl font-bold text-white">QR</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
            MR-QR
          </h1>
          <p className="text-xl font-medium text-gray-600 dark:text-gray-300 sm:text-2xl">
            QR Generation and Smart Link Management
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-6 py-3 dark:bg-teal-900/30">
          <div className="h-2 w-2 animate-pulse rounded-full bg-teal-500"></div>
          <span className="text-sm font-semibold text-teal-700 dark:text-teal-400">
            Coming Soon
          </span>
        </div>

        <p className="max-w-md text-base text-gray-600 dark:text-gray-400 sm:text-lg">
          Create beautiful QR codes, manage short links, and track scans with a secure,
          Supabase-powered workflow.
        </p>

        <button className="mt-4 rounded-full bg-linear-to-r from-cyan-500 to-teal-600 px-8 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
          Notify Me at Launch
        </button>

        <p className="mt-8 text-sm text-gray-500 dark:text-gray-500">
          Building a fast and secure QR platform for you...
        </p>
      </main>
    </div>
  );
}
