import { Card } from "@/components/ui/card";
import LoginPage from "@/modules/LoginPage";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Login() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) redirect(`/${session.user.user_metadata.displayName}`);
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Card className="flex flex-col p-4 justify-center">
        <LoginPage />
      </Card>
    </div>
  );
}
