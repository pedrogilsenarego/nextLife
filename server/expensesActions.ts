import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

type AddBusinessProps = {
  businessId: string;
  category: string;
  note?: string;
  amount: number;
};

export const addExpense = async (
  newExpenseData: AddBusinessProps
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    console.log("addExpense", newExpenseData.amount);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { businessId, note, amount, category } = newExpenseData;

      const { error: userError } = await supabase.from("expenses").upsert([
        {
          businessId,
          note,
          amount,
          category,
          userId: user.id,
        },
      ]);

      if (userError) {
        console.error(userError);
        return reject(userError);
      }

      resolve("Success");
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const getAllExpensesForCurrentMonth = async (): Promise<any[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const currentDate = new Date();
      const currentMonthStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const currentMonthEnd = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );

      const { data: expenses, error: expensesError } = await supabase
        .from("expenses")
        .select("*")
        .eq("userId", user.id);
      // .gte("created_at", currentMonthStart.toISOString())
      // .lte("created_at", currentMonthEnd.toISOString());

      if (expensesError) {
        console.error(expensesError);
        return reject(expensesError);
      }

      resolve(expenses || []);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
