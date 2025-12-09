import { AuthContext } from "./AuthContext";
import { supabase } from "@/lib/supabase/Supabase";
import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setUsername(session?.user?.user_metadata?.username ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setUsername(session?.user?.user_metadata?.username ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, username, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
