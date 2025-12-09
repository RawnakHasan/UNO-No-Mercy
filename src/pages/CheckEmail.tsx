import { useLocation, Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const CheckEmail = () => {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Mail className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle>Check Your Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            We've sent a confirmation email to:
          </p>
          {email && <p className="font-semibold text-foreground">{email}</p>}
          <p className="text-sm text-muted-foreground">
            Click the link in the email to verify your account and complete the
            sign-up process.
          </p>
          <div className="pt-4">
            <Link to="/signIn">
              <Button className="w-full">Go to Sign In</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckEmail;
