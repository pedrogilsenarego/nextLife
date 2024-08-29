import { z } from "zod";

// Define the validation schema
export const signupSchema = z.object({
  otp: z.string(),
  email: z.string(),
});

export type Signup = z.infer<typeof signupSchema>;
