"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const addBusiness = async (businessName: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");
  const { error: userError } = await supabase.from("business").upsert([
    {
      business_name: businessName,
      user_id: user.id,
    },
  ]);

  if (userError) {
    console.error(userError);
  }
};
