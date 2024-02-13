import { queryKeys } from "@/constants/queryKeys";
import { BusinessesQuery } from "@/types/businessTypes";
import { MonthIncomesQuery } from "@/types/incomesTypes";
import { UserQuery } from "@/types/userTypes";
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashBoard from "./components";

type LayoutProps = {
  params: {
    slug: string;
  };
};
export default async function ({ params }: LayoutProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const queryClient = new QueryClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  console.log("gettingUser-server");
  const userQuery: PostgrestSingleResponse<UserQuery> = await supabase
    .from("users")
    .select()
    .eq("id", user.id)
    .single();

  if (userQuery?.data?.username !== params.slug) {
    redirect("/login?message=You have no access to that user");
  }
  queryClient.setQueryData([queryKeys.user], userQuery.data);

  return <DashBoard />;
}
