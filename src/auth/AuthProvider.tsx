import { AuthContext } from "./AuthContext";
import { supabase } from "@/lib/supabase/Supabase";
import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session and profile
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        // Fetch profile from profiles table
        const { data: profile } = await supabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", session.user.id)
          .single();

        setUsername(profile?.username ?? null);
        setAvatarUrl(profile?.avatar_url ?? null);
      }

      setLoading(false);
    };

    initAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", session.user.id)
          .single();

        setUsername(profile?.username ?? null);
        setAvatarUrl(profile?.avatar_url ?? null);
      } else {
        setUsername(null);
        setAvatarUrl(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const refreshProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user!.id)
      .single();

    setAvatarUrl(data.avatar_url);
  };

  return (
    <AuthContext.Provider
      value={{ user, username, avatarUrl, loading, signOut, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
