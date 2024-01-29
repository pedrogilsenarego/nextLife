"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const addBusiness = async (businessName: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const cookieStore = cookies();
      const supabase = createClient(cookieStore);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return reject(new Error("User not authenticated"));
      }

      const { error: userError } = await supabase.from("business").upsert([
        {
          business_name: businessName,
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
