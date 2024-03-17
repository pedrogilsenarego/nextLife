import z from "zod";

// Define the validation schema
export const recoverPwdSchema = z.object({
  email: z.string().email(),
});
export type RecoverPwd = z.infer<typeof recoverPwdSchema>;
