import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInFields } from "./formSchema";
import { supabase } from "@/lib/supabase/Supabase";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router";
import { Spinner } from "@/components/ui/spinner";

const SignInForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    setError,
  } = useForm<SignInFields>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInFields> = async (data: SignInFields) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setError("root", { message: error.message });

        // Show detailed error in development, simple message in production
        if (import.meta.env.DEV) {
          toast.error("Sign In Failed", {
            description: (
              <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                <code>{JSON.stringify(error, null, 2)}</code>
              </pre>
            ),
            position: "top-center",
            classNames: {
              content: "flex flex-col gap-2",
            },
            style: {
              "--border-radius": "calc(var(--radius) + 4px)",
            } as React.CSSProperties,
          });
        } else {
          toast.error("Sign In Failed", {
            description: error.message,
          });
        }
        return;
      }

      reset();

      toast.success("Welcome Back!", {
        description: "You have successfully signed in.",
        position: "top-center",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius) + 4px)",
        } as React.CSSProperties,
      });

      // Navigate to main page/dashboard
      navigate("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      setError("root", { message: errorMessage });
      toast.error("Error", {
        description: errorMessage,
        position: "top-center",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius) + 4px)",
        } as React.CSSProperties,
      });
    }
  };

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="signInForm" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input {...register("email")} placeholder="Enter your Email" />
              {errors.email && <FieldError errors={[errors.email]} />}
            </Field>
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input
                {...register("password")}
                placeholder="Enter your Password"
                type="password"
              />
              {errors.password && <FieldError errors={[errors.password]} />}
            </Field>
            {errors.root && <FieldError errors={[errors.root]} />}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="reset" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
          <Button
            type="submit"
            form="signInForm"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? (
              <>
                <Spinner />
                <p>Signing In</p>
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </Field>
      </CardFooter>
      <Separator />
      <FieldDescription className="text-center">
        Don't Have an Account? <Link to="/signUp">Sign Up</Link>
      </FieldDescription>
    </Card>
  );
};

export default SignInForm;
