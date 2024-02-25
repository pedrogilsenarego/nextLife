"use server";

import Footer from "@/components/LayoutComponents/Footer";
import FooterMobile from "@/components/LayoutComponents/FooterMobile";
import Header from "@/components/LayoutComponents/Header";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  return (
    <div className="flex-1 w-full h-full justify-between  flex flex-col gap-10 items-center">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
