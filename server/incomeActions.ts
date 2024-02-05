import { Income } from "@/types/incomesTypes";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

type AddIncomeProps = {
  businessId: string;
  category: string;
  note?: string;
  amount: number;
  created_at: Date;
};

export const addIncome = async (
  newExpenseData: AddIncomeProps
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    console.log("addIncome", newExpenseData.amount);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { businessId, note, amount, category, created_at } = newExpenseData;
      const userId = user.id;

      // Parse the provided created_at string into a Date object
      const createdDate = new Date(created_at);

      // Extract the month from the created_at timestamp
      const currentMonth = createdDate.getMonth() + 1;

      // Check if the corresponding record exists in monthExpenses
      const { data: monthExpenseData, error: monthExpenseError } =
        await supabase
          .from("monthIncomes")
          .select("*")
          .eq("userId", userId)
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
            .from("monthIncomes")
            .upsert([
              {
                id: monthExpenseData[0].id,
                amount: monthExpenseData[0].amount + amount,
                businessId: monthExpenseData[0].businessId,
                userId: monthExpenseData[0].userId,
                category: monthExpenseData[0].category,
              },
            ]);

          if (updatingError) {
            console.error(updatingError);
            return reject(updatingError);
          }
        } else {
          // Create a new record in monthExpenses
          await supabase.from("monthIncomes").upsert([
            {
              userId,
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
        await supabase.from("monthIncomes").upsert([
          {
            userId,
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
      const { error: userError } = await supabase.from("incomes").upsert([
        {
          businessId,
          note,
          amount,
          category,
          userId,
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

export const getAllIncomesForCurrentMonth = async ({
  timeRange,
}: {
  timeRange?: { startDate: Date; endDate: Date };
}): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    console.log(
      `gettingIncomes: from: ${timeRange?.startDate.toLocaleDateString()} to: ${timeRange?.endDate.toLocaleDateString()}`
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

      const { data: Incomes, error: IncomesError } = await supabase
        .from("incomes")
        .select("*")
        .eq("userId", user.id)
        .gt("created_at", currentMonthStart.toISOString())
        .lt("created_at", currentDate.toISOString())
        .order("created_at", { ascending: true });

      if (IncomesError) {
        console.error(IncomesError);
        return reject(IncomesError);
      }

      // Calculate totalEntries and totalAmount

      const metaData = {
        totalEntries: Incomes.length,
      };

      resolve({ data: Incomes || [], metaData });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const getCumulativeIncomesForCurrentMonth = async ({
  timeRange,
}: {
  timeRange?: { startDate: Date; endDate: Date };
}): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    console.log(
      `gettingMonthIncomes: from: ${timeRange?.startDate?.toLocaleDateString()} to: ${timeRange?.endDate?.toLocaleDateString()}`
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

      const { data: Incomes, error: IncomesError } = await supabase
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
        totalEntries: Incomes.length,
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
