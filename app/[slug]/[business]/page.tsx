import DangerZone from "@/modules/BusinessSettings/DangerZone";

type LayoutProps = {
  params: {
    slug: string;
    business: string;
  };
};
export default async function ({ params }: LayoutProps) {
  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore);

  // const queryClient = new QueryClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) redirect("/login");

  // console.log("gettingUser-server");
  // const userQuery: PostgrestSingleResponse<UserQuery> = await supabase
  //   .from("users")
  //   .select()
  //   .eq("id", user.id)
  //   .single();

  // if (userQuery?.data?.username !== params.slug) {
  //   redirect("/login?message=You have no access to that user");
  // }
  // queryClient.setQueryData([queryKeys.user], userQuery.data);

  // console.log("gettingBusinesses-server");
  // const businessQuery: PostgrestSingleResponse<BusinessesQuery> = await supabase
  //   .from("business")
  //   .select("*")
  //   .eq("user_id", user.id);

  // const businesses = businessQuery.data || [];

  // const isBusinessFound = businesses.some(
  //   (business) => business.businessName === params.business
  // );

  // if (!isBusinessFound) redirect(`/login?message=Business not found`);
  // queryClient.setQueryData([queryKeys.businesses], businessQuery.data);

  return (
    <div>
      <DangerZone params={params} />
    </div>
  );
}
