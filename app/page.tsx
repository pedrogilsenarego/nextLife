import HomePage from "@/modules/HomePage";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) redirect(`/${session.user.user_metadata.displayName}`);
  return (
    <div className=" w-full h-screen flex flex-col  items-center">
      <HomePage />
    </div>
  );
}
