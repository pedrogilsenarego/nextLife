"use server";

import { UserQuery } from "@/types/userTypes";
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LayoutProps = {
  params: {
    slug: string;
  };
  children: React.ReactNode;
};

export default async function Layout({ children, params }: LayoutProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const response: PostgrestSingleResponse<UserQuery> = await supabase
    .from("users")
    .select()
    .eq("id", user.id)
    .single();

  if (response?.data?.username !== params.slug) {
    redirect("/login?message=You have no access to that user");
  }

  return <>{children}</>;
}
