import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

type AddIncomeProps = {
  businessId: string;
  category: string;
  note?: string;
  amount: number;
};

export const addIncome = async (
  newIncomeData: AddIncomeProps
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    console.log("addIncome", newIncomeData.amount);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { businessId, note, amount, category } = newIncomeData;

      const { error: userError } = await supabase.from("incomes").upsert([
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

export const getAllIncomesForCurrentMonth = async (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    console.log("gettingMonthIncomes");
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

      const { data: expenses, error: expensesError } = await supabase
        .from("incomes")
        .select("*")
        .eq("userId", user.id)
        .gt("created_at", currentMonthStart.toISOString())
        .lt("created_at", currentDate.toISOString());

      if (expensesError) {
        console.error(expensesError);
        return reject(expensesError);
      }

      // Calculate totalEntries and totalAmount
      const totalEntries = expenses?.length || 0;
      const totalAmount =
        expenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0;
      const byCategory =
        expenses?.reduce((acc, expense) => {
          const existingCategory = acc.find(
            (item: any) => item.name === expense.category
          );

          if (existingCategory) {
            existingCategory.value += expense.amount;
          } else {
            acc.push({ name: expense.category, value: expense.amount });
          }

          return acc;
        }, []) || [];

      const metaData = {
        totalEntries,
        totalAmount,
        byCategory,
      };

      resolve({ data: expenses || [], metaData });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const deleteIncomes = async (incomeIds: string[]): Promise<string> => {
  console.log("deleting Expenses");
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      // Delete expenses based on the provided IDs
      const { error: deleteError } = await supabase
        .from("incomes")
        .delete()
        .in("id", incomeIds);

      if (deleteError) {
        console.error(deleteError);
        return reject(deleteError);
      }

      resolve("Success");
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
