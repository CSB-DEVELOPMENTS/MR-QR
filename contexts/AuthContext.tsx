"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
  useMemo,
} from "react";
import type { Session, User, AuthError } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { Tables } from "@/types/database.types";

type PublicUser = Tables<"users">;

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: PublicUser | null;
  loading: boolean;
  profileLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUpWithEmail: (
    email: string,
    password: string,
    options?: { fullName?: string },
  ) => Promise<{ error: AuthError | null }>;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => createClient(), []);

  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);

  const loadProfile = useCallback(
    async (userId: string | null | undefined) => {
      if (!userId) {
        setProfile(null);
        setProfileLoading(false);
        return;
      }

      setProfileLoading(true);

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        setProfile(null);
      } else {
        setProfile(data);
      }

      setProfileLoading(false);
    },
    [supabase],
  );

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      await loadProfile(session?.user?.id ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      void loadProfile(session?.user?.id ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase, loadProfile]);

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    },
    [supabase],
  );

  const signUpWithEmail = useCallback(
    async (email: string, password: string, options?: { fullName?: string }) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: options?.fullName ?? "",
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      return { error };
    },
    [supabase],
  );

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: "openid email profile",
        queryParams: {
          prompt: "select_account",
        },
      },
    });
    return { error };
  }, [supabase]);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  }, [supabase]);

  const resetPassword = useCallback(
    async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });
      return { error };
    },
    [supabase],
  );

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        profileLoading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        resetPassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an <AuthProvider>");
  }
  return context;
}
