import { queryClient } from "@/providers/ReactQueryProvider";
import { UserQuery } from "@/types/userTypes";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

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

export const getUserData = async (): Promise<UserQuery> => {
  console.log("getingUser");
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { data: userData, error: userDataError } = await supabase
        .from("users")
        .select()
        .eq("id", user.id)
        .single();

      if (userDataError) {
        console.error("error", userDataError);
        return reject(userDataError);
      }

      resolve(userData);
    } catch (error) {
      console.error("error", error);
      reject(error);
    }
  });
};

export const signinUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<string> => {
  console.log("loggingUser");
  return new Promise(async (resolve, reject) => {
    try {
      const session = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (session.error) {
        reject(session?.error?.message || "Could not autenticate user");
      }
      if (session.data.user) {
        // Fetch user data from Supabase table

        return resolve(session.data.user.user_metadata.displayName);
      } else {
        reject("User data not found.");
      }
    } catch (error) {
      console.error("error", error);
      reject(error);
    }
  });
};

export const signupUser = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}): Promise<unknown> => {
  console.log("creatingUser");
  return new Promise(async (resolve, reject) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,

        options: {
          emailRedirectTo: `${origin}/auth/callback`,
          data: {
            displayName: username,
          },
        },
      });

      if (error) {
        reject(error.message);
      }

      const user_id = data?.user?.id;
      console.log(user_id, email, username);
      const { error: userError } = await supabase.from("users").upsert([
        {
          id: user_id,
          email,
          username,
        },
      ]);

      if (userError) {
        reject("Error adding user data");
      }
      const { error: businessError } = await supabase.from("business").upsert([
        {
          businessName: "general",
          type: 0,
          user_id: user_id,
        },
      ]);
      if (businessError) {
        reject("Error adding user data");
      }
      return resolve("Welcome to NextLife enjoy");
    } catch (error: any) {
      console.error("error", error);
      reject(error.message);
    }
  });
};

export const getUserSession = async (): Promise<User> => {
  console.log("getingUserSession");
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return null;
      }

      resolve(user);
    } catch (error) {
      console.error("error", error);
      reject(error);
    }
  });
};

export const userLogout = async (): Promise<any> => {
  try {
    await supabase.auth.signOut();
    queryClient.removeQueries();
  } catch {}
};

export const recoverPassword = async ({
  email,
}: {
  email: string;
}): Promise<string> => {
  try {
    const { data: resetData, error } =
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/reset-password`,
      });

    if (error) {
      throw new Error(error.message);
    }

    return "Password recovery email sent successfully. Please check your inbox.";
  } catch (error) {
    console.error("Error recovering password:", error);
    throw error;
  }
};

export const updatePassword = async ({
  password,
}: {
  password: string;
}): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        reject("no session");
      }
      const { data: resetData, error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        reject(error.message);
      }

      resolve(resetData);
    } catch (error) {
      console.error("Error recovering password:", error);
      throw error;
    }
  });
};

export const loginWithOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: resetData, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "recovery",
      });

      if (error) {
        console.log(error.message);
        reject(error);
        throw new Error(error.message);
      }

      resolve(resetData);
    } catch (error) {
      console.error("Error recovering password:", error);
      throw error;
    }
  });
};
