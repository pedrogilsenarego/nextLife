import { Income } from "@/types/incomesTypes";
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
      const userId = user.id;

      // Check if the corresponding record exists in monthIncomes
      const { data: monthIncomeData, error: monthIncomeError } = await supabase
        .from("monthIncomes")
        .select("*")
        .eq("userId", userId)
        .eq("businessId", businessId)
        .eq("category", category);

      if (monthIncomeError) {
        console.error(monthIncomeError);
        return reject(monthIncomeError);
      }

      const currentMonth = new Date().getMonth() + 1;

      if (monthIncomeData && monthIncomeData.length > 0) {
        // Extract the month from the created_at timestamp
        const existingMonth =
          new Date(monthIncomeData[0].created_at).getMonth() + 1;

        if (existingMonth === currentMonth) {
          // Update the existing record in monthIncomes
          const { error: updatingError } = await supabase
            .from("monthIncomes")
            .upsert([
              {
                id: monthIncomeData[0].id,
                amount: monthIncomeData[0].amount + amount,
                businessId: monthIncomeData[0].businessId,
                userId: monthIncomeData[0].userId,
                category: monthIncomeData[0].category,
              },
            ]);

          if (updatingError) {
            console.error(updatingError);
            return reject(updatingError);
          }
        } else {
          // Create a new record in monthIncomes
          await supabase.from("monthIncomes").upsert([
            {
              userId,
              businessId,
              category,
              amount,
            },
          ]);
        }
      } else {
        // Create a new record in monthIncomes
        await supabase.from("monthIncomes").upsert([
          {
            userId,
            businessId,
            category,
            amount,
          },
        ]);
      }

      // Create the Income record
      const { error: userError } = await supabase.from("incomes").upsert([
        {
          businessId,
          note,
          amount,
          category,
          userId,
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

      const {
        data: Incomes,
        error: IncomesError,
        count,
      } = await supabase
        .from("incomes")
        .select("*")
        .eq("userId", user.id)
        .gt("created_at", currentMonthStart.toISOString())
        .lt("created_at", currentDate.toISOString());

      if (IncomesError) {
        console.error(IncomesError);
        return reject(IncomesError);
      }

      // Calculate totalEntries and totalAmount

      const metaData = {
        totalEntries: count,
      };

      resolve({ data: Incomes || [], metaData });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const getCumulativeIncomesForCurrentMonth = async (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    console.log("gettingCumulativeMonthIncomes");
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

      const {
        data: Incomes,
        error: IncomesError,
        count,
      } = await supabase
        .from("monthIncomes")
        .select("*")
        .eq("userId", user.id)
        .gt("created_at", currentMonthStart.toISOString())
        .lt("created_at", currentDate.toISOString());

      if (IncomesError) {
        console.error(IncomesError);
        return reject(IncomesError);
      }

      // Calculate totalEntries and totalAmount

      const metaData = {
        totalEntries: count,
      };

      resolve({ data: Incomes || [], metaData });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const deleteIncomes = async (
  expensesToDelete: Income[]
): Promise<string> => {
  console.log("deleting Incomes");
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      // Fetch and update corresponding records in monthExpenses
      for (const expense of expensesToDelete) {
        const { amount, businessId, category, created_at } = expense;

        // Extract month and year from the created_at of the expense
        const expenseMonth = new Date(created_at).getUTCMonth();
        const expenseYear = new Date(created_at).getUTCFullYear();

        const { data: monthExpenseData, error: monthExpenseError } =
          await supabase
            .from("monthIncomes")
            .select("*")
            .eq("userId", user.id)
            .eq("businessId", businessId)
            .eq("category", category)
            .gte(
              "created_at",
              new Date(expenseYear, expenseMonth, 1).toISOString()
            )
            .lt(
              "created_at",
              new Date(expenseYear, expenseMonth + 1, 1).toISOString()
            );

        if (monthExpenseError) {
          console.error(monthExpenseError);
          return reject(monthExpenseError);
        }

        // Update or delete the fetched records in monthExpenses
        for (const monthExpense of monthExpenseData || []) {
          const updatedAmount = monthExpense.amount - amount;

          if (updatedAmount <= 0) {
            // Delete the record if the updated amount is zero or negative
            const { error: deleteMonthExpenseError } = await supabase
              .from("monthIncomes")
              .delete()
              .eq("id", monthExpense.id);

            if (deleteMonthExpenseError) {
              console.error(deleteMonthExpenseError);
              return reject(deleteMonthExpenseError);
            }
          } else {
            // Update the amount if it's still positive
            const { error: updateMonthExpenseError } = await supabase
              .from("monthIncomes")
              .update({ amount: updatedAmount })
              .eq("id", monthExpense.id);

            if (updateMonthExpenseError) {
              console.error(updateMonthExpenseError);
              return reject(updateMonthExpenseError);
            }
          }
        }
      }

      // Delete expenses based on the provided IDs
      const { error: deleteError } = await supabase
        .from("incomes")
        .delete()
        .in(
          "id",
          expensesToDelete.map((expense) => expense.id)
        );

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
