import { BusinessesQuery } from "@/types/businessTypes";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const addBusiness = async (businessName: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    console.log("addBusiness", businessName);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { error: userError } = await supabase.from("business").upsert([
        {
          businessName,
          user_id: user.id,
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

export const getBusinesses = async (): Promise<BusinessesQuery> => {
  console.log("getingBusinesses");
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { data: businesses, error: businessesError } = await supabase
        .from("business")
        .select("*")
        .eq("user_id", user.id);

      if (businessesError) {
        console.error("error", businessesError);
        return reject(businessesError);
      }

      resolve(businesses || []);
    } catch (error) {
      console.error("error", error);
      reject(error);
    }
  });
};

export const deleteBusiness = async (businessId: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    console.log("Deleting business with ID:", businessId);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { error: deleteError } = await supabase
        .from("business")
        .delete()
        .eq("id", businessId)
        .eq("user_id", user.id);

      if (deleteError) {
        console.error("Error deleting business:", deleteError);
        return reject(deleteError);
      }

      resolve("Business deleted successfully");
    } catch (error) {
      console.error("Error deleting business:", error);
      reject(error);
    }
  });
};
