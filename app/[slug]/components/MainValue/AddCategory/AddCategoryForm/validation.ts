import {
  defaultCategories,
  defaultIncomesCategories,
} from "@/constants/defaultCategories";
import z, { ZodType } from "zod";

// Define the validation schema
export const addCategorySchema = (
  type: "expense" | "income"
): ZodType<{ category: string }> => {
  const dCategories =
    type === "expense" ? defaultCategories : defaultIncomesCategories;

  return z.object({
    category: z.string().refine(
      (data) => {
        const lowercaseData = data.toLowerCase();
        const exists = dCategories.some(
          (category) => category.label.toLowerCase() === lowercaseData
        );
        return !exists;
      },
      { message: "Category already exists in default categories" }
    ),
  });
};

export type AddCategory = z.infer<ReturnType<typeof addCategorySchema>>;
