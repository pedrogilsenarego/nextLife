import { Card } from "@/components/ui/card";
import { queryKeys } from "@/constants/queryKeys";
import DangerZone from "@/modules/BusinessSettings/DangerZone";
import { BusinessesQuery } from "@/types/businessTypes";
import { UserQuery } from "@/types/userTypes";
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LayoutProps = {
  params: {
    slug: string;
    business: string;
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

  console.log("gettingBusinesses-server");
  const businessQuery: PostgrestSingleResponse<BusinessesQuery> = await supabase
    .from("business")
    .select("*")
    .eq("user_id", user.id);

  const businesses = businessQuery.data || [];

  const isBusinessFound = businesses.some(
    (business) => business.businessName === params.business
  );

  if (!isBusinessFound) redirect(`/login?message=Business not found`);
  queryClient.setQueryData([queryKeys.businesses], businessQuery.data);

  return (
    <div>
      <DangerZone />
    </div>
  );
}
