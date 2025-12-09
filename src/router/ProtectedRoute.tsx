import { useAuth } from "@/auth/useAuth";
import { Spinner } from "@/components/ui/spinner";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signIn" replace />;
  }

  return <>{children}</>;
};
