"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, resetPassword, loading, user } =
    useAuth();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const urlError = searchParams.get("error");
  const effectiveError = error ?? (urlError ? decodeURIComponent(urlError) : null);

  useEffect(() => {
    if (!loading && user) {
      const redirectTo = searchParams.get("redirectTo") ?? "/";
      router.replace(redirectTo);
    }
  }, [loading, user, router, searchParams]);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);

    if (mode === "signin") {
      const { error } = await signInWithEmail(email, password);
      if (error) {
        setError(error.message);
      } else {
        const redirectTo = searchParams.get("redirectTo") ?? "/";
        router.replace(redirectTo);
      }
    } else {
      const { error } = await signUpWithEmail(email, password, { fullName });
      if (error) {
        setError(error.message);
      } else {
        setInfo(
          "Account created! Please check your email to confirm your address before signing in."
        );
      }
    }

    setSubmitting(false);
  }

  async function handleGoogleSignIn() {
    setError(null);
    setSubmitting(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
      setSubmitting(false);
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      setError("Enter your email first, then click Forgot? again.");
      return;
    }

    setError(null);
    setInfo(null);
    setSubmitting(true);

    const { error } = await resetPassword(email);
    if (error) {
      setError(error.message);
    } else {
      setInfo("Password reset link sent. Check your email inbox.");
    }

    setSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <aside className="relative hidden lg:flex items-center justify-center overflow-hidden bg-linear-to-br from-[#f97316] via-[#ea580c] to-[#431407] p-14">
          <div
            className="absolute inset-0 opacity-35"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
              backgroundSize: "8px 8px",
            }}
          />

          <div className="relative w-full max-w-md text-white">
            <div className="mx-auto flex h-72 w-72 items-center justify-center rounded-2xl border border-white/30 bg-white/10 shadow-2xl backdrop-blur-sm">
              <div className="flex h-36 w-36 items-center justify-center rounded-2xl bg-[#f97316] shadow-xl">
                <span className="text-6xl font-black tracking-tight">QR</span>
              </div>
            </div>

            <div className="mt-10 space-y-4 text-center">
              <h2 className="text-5xl font-extrabold leading-tight">Connect Instantly</h2>
              <p className="mx-auto max-w-sm text-lg text-white/90">
                The most powerful QR code generator and management platform for modern businesses.
              </p>
            </div>
          </div>
        </aside>

        <section className="flex items-center justify-center px-6 py-10 sm:px-8">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl sm:p-10">
            <div className="mb-6 text-center sm:text-left">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Welcome Back</h1>
              <p className="mt-1 text-sm text-gray-500">
                {mode === "signin"
                  ? "Enter your details to access your account"
                  : "Create your account to start building QR workflows"}
              </p>
            </div>

            {effectiveError && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {effectiveError}
              </div>
            )}
            {info && (
              <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {info}
              </div>
            )}

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={submitting}
              className="mb-5 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            <div className="mb-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-semibold tracking-[0.2em] text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-1.5 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  {mode === "signin" && (
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={submitting}
                      className="text-xs font-semibold text-orange-600 hover:text-orange-700 disabled:cursor-not-allowed disabled:opacity-60">
                      Forgot?
                    </button>
                  )}
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={8}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 w-full rounded-xl bg-[#f97316] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#ea580c] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                {submitting ? "Please wait…" : mode === "signin" ? "Sign In" : "Create account"}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-gray-600">
              {mode === "signin" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setError(null);
                      setInfo(null);
                    }}
                    className="font-semibold text-orange-600 hover:text-orange-700">
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signin");
                      setError(null);
                      setInfo(null);
                    }}
                    className="font-semibold text-orange-600 hover:text-orange-700">
                    Sign in
                  </button>
                </>
              )}
            </p>

            <div className="mt-8 flex items-center justify-center gap-5 text-xs text-gray-400">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Help Center</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-linear-to-br from-cyan-50 to-teal-100" />}>
      <LoginPageContent />
    </Suspense>
  );
}
