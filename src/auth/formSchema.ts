import z from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 Characters long")
    .max(32, "Username must be at max 32 Characters long"),
  email: z.email(),
  password: z.string().min(8).max(32),
});

export type SignUpFields = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(32),
});

export type SignInFields = z.infer<typeof signInSchema>;
