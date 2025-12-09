import { useAuth } from "@/auth/useAuth";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!user) {
    return <Navigate to="/signIn" replace />;
  }

  return <>{children}</>;
};
