import { BusinessesQuery } from "@/types/businessTypes";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const addBusiness = async ({
  businessName,
  type,
}: {
  businessName: string;
  type: number;
}): Promise<string> => {
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
          business_name: businessName,
          type,
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

      const formattedBusinesses: BusinessesQuery = businesses.map(
        (business: any) => ({
          user_id: business.user_id,
          type: business.type,
          id: business.id,
          created_at: business.created_at,
          settings: business.settings,
          businessName: business.business_name, // Mapping business_name to businessName
          // Add other fields as needed
        })
      );

      resolve(formattedBusinesses || []);
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
        return reject(deleteError.message);
      }

      resolve("Business deleted successfully");
    } catch (error) {
      console.error("Error deleting business:", error);
      reject(error);
    }
  });
};

export const updateSettingsBalanceState = async ({
  arr,
}: {
  arr: { id: string; status?: boolean }[];
}): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      for (const { id, status } of arr) {
        // Fetch the business record based on the businessId
        const { data: businessData, error: businessError } = await supabase
          .from("business")
          .select("*")
          .eq("id", id)
          .single();

        if (businessError) {
          console.error("Error fetching business:", businessError);
          return reject(businessError);
        }

        if (!businessData) {
          console.error("Business not found:", id);
          continue; // Skip to the next iteration if business is not found
        }

        // Get the current settings of the business
        const currentSettings = businessData.settings || {};

        // Update the balances status in the settings
        const updatedSettings = {
          ...currentSettings,
          filters: {
            ...currentSettings.filters,
            balanceStatus: status,
          },
        };

        // Perform update operation to update the settings
        const { error: updateError } = await supabase
          .from("business")
          .update({ settings: updatedSettings })
          .eq("id", id);

        if (updateError) {
          console.error(
            "Error updating settings for business:",
            id,
            updateError
          );
          // Don't reject here, continue updating other businesses
        }
      }

      resolve("Success");
    } catch (error) {
      console.error("Error updating settings:", error);
      reject(error);
    }
  });
};
