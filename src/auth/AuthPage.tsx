import { Navigate, useLocation } from "react-router";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import { useAuth } from "./useAuth";
import { Spinner } from "@/components/ui/spinner";

export const AuthPage = () => {
  const location = useLocation();
  const isSignUp = location.pathname === "/signUp";
  const { user, loading } = useAuth();

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen flex items-center justify-center bg-linear-225 from-zinc-700 to-zinc-950">
      {isSignUp ? <SignUpForm /> : <SignInForm />}
    </div>
  );
};
