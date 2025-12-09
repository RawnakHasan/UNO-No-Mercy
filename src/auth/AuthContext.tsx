import type { User } from "@supabase/supabase-js";
import { createContext } from "react";

type AuthContextType = {
  user: User | null;
  username: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
