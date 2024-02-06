import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
type CategoryType = "expense" | "income";

type PropsAddCategory = {
  categoryName: string;
  type: CategoryType;
};

export const addCategory = async ({
  categoryName,
  type,
}: PropsAddCategory): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    console.log("addCategory", categoryName, type);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      // Define the column name based on the type
      const columnName =
        type === "expense" ? "expensesCategories" : "incomesCategories";

      // Fetch the user's existing categories
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select(columnName)
        .eq("id", user.id)
        .single();

      if (userError) {
        console.error(userError);
        return reject(userError);
      }

      // Type assertion to inform TypeScript about the shape of userData
      const userCategories = userData as { [key: string]: string[] };

      const existingCategories: string[] = userCategories[columnName] || [];

      // Check if the category already exists
      if (existingCategories.includes(categoryName)) {
        return reject(new Error("Category already exists"));
      }

      // Add the new category to the existing ones
      const updatedCategories = [...existingCategories, categoryName];

      // Update the user's categories
      const { error: updateError } = await supabase
        .from("users")
        .update({ [columnName]: updatedCategories })
        .eq("id", user.id);

      if (updateError) {
        console.error(updateError);
        return reject(updateError);
      }

      resolve("Success");
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
