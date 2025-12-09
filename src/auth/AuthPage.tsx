import { useLocation } from "react-router";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

export const AuthPage = () => {
  const location = useLocation();
  const isSignUp = location.pathname === "/signUp";

  return (
    <div className="h-screen flex items-center justify-center bg-linear-225 from-zinc-700 to-zinc-950">
      {isSignUp ? <SignUpForm /> : <SignInForm />}
    </div>
  );
};
