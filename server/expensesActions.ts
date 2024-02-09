import { Expense } from "@/types/expensesTypes";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

type AddBusinessProps = {
  businessId: string;
  category: string;
  note?: string;
  amount: number;
  created_at: Date;
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

      const { businessId, note, amount, category, created_at } = newExpenseData;
      const user_id = user.id;

      // Parse the provided created_at string into a Date object
      const createdDate = new Date(created_at);

      // Extract the month from the created_at timestamp
      const currentMonth = createdDate.getMonth() + 1;

      // Check if the corresponding record exists in monthExpenses
      const { data: monthExpenseData, error: monthExpenseError } =
        await supabase
          .from("monthExpenses")
          .select("*")
          .eq("user_id", user_id)
          .eq("businessId", businessId)
          .eq("category", category);

      if (monthExpenseError) {
        console.error(monthExpenseError);
        return reject(monthExpenseError);
      }

      if (monthExpenseData && monthExpenseData.length > 0) {
        // Extract the month from the existing record's created_at timestamp
        const existingMonth =
          new Date(monthExpenseData[0].created_at).getMonth() + 1;

        if (existingMonth === currentMonth) {
          // Update the existing record in monthExpenses
          const { error: updatingError } = await supabase
            .from("monthExpenses")
            .upsert([
              {
                id: monthExpenseData[0].id,
                amount: monthExpenseData[0].amount + amount,
                businessId: monthExpenseData[0].businessId,
                user_id: monthExpenseData[0].user_id,
                category: monthExpenseData[0].category,
              },
            ]);

          if (updatingError) {
            console.error(updatingError);
            return reject(updatingError);
          }
        } else {
          // Create a new record in monthExpenses
          await supabase.from("monthExpenses").upsert([
            {
              user_id: user_id,
              businessId,
              category,
              amount,
              created_at: new Date(
                createdDate.getFullYear(),
                createdDate.getMonth(),
                1,
                1
              ).toISOString(),
            },
          ]);
        }
      } else {
        // Create a new record in monthExpenses
        await supabase.from("monthExpenses").upsert([
          {
            user_id: user_id,
            businessId,
            category,
            amount,
            created_at: new Date(
              createdDate.getFullYear(),
              createdDate.getMonth(),
              1,
              1
            ).toISOString(),
          },
        ]);
      }

      // Create the expense record
      const { error: userError } = await supabase.from("expenses").upsert([
        {
          businessId,
          note,
          amount,
          category,
          user_id: user_id,
          created_at,
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

export const getAllExpensesForCurrentMonth = async ({
  timeRange,
}: {
  timeRange?: { startDate: Date; endDate: Date };
}): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    console.log(
      `gettingExpenses: from: ${timeRange?.startDate.toLocaleDateString()} to: ${timeRange?.endDate.toLocaleDateString()}`
    );

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const currentDate = timeRange?.endDate || new Date();
      const currentMonthStart =
        timeRange?.startDate ||
        new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

      const { data: expenses, error: expensesError } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", user.id)
        .gt("created_at", currentMonthStart.toISOString())
        .lt("created_at", currentDate.toISOString())
        .order("created_at", { ascending: true });

      if (expensesError) {
        console.error(expensesError);
        return reject(expensesError);
      }
      const metaData = {
        totalEntries: expenses.length,
      };

      resolve({ data: expenses || [], metaData });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const getCumulativeExpensesForCurrentMonth = async ({
  timeRange,
}: {
  timeRange?: { startDate: Date; endDate: Date };
}): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    console.log(
      `gettingCumulativeExpenses: from: ${timeRange?.startDate?.toLocaleDateString()} to: ${timeRange?.endDate?.toLocaleDateString()}`
    );
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const currentDate = timeRange?.endDate || new Date();
      const currentMonthStart =
        timeRange?.startDate ||
        new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

      const { data: expenses, error: expensesError } = await supabase
        .from("monthExpenses")
        .select("*")
        .eq("user_id", user.id)
        .gt("created_at", currentMonthStart.toISOString())
        .lt("created_at", currentDate.toISOString());

      if (expensesError) {
        console.error(expensesError);
        return reject(expensesError);
      }

      const metaData = {
        totalEntries: expenses.length,
      };

      resolve({ data: expenses || [], metaData });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const deleteExpenses = async (
  expensesToDelete: Expense[]
): Promise<string> => {
  console.log("deleting Expenses");
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
            .from("monthExpenses")
            .select("*")
            .eq("user_id", user.id)
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
              .from("monthExpenses")
              .delete()
              .eq("id", monthExpense.id);

            if (deleteMonthExpenseError) {
              console.error(deleteMonthExpenseError);
              return reject(deleteMonthExpenseError);
            }
          } else {
            // Update the amount if it's still positive
            const { error: updateMonthExpenseError } = await supabase
              .from("monthExpenses")
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
        .from("expenses")
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
