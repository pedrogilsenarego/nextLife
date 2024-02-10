import HomePage from "@/modules/HomePage";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import AuthButton from "../components/AuthButton";

export default async function Index() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className=" w-full h-screen flex flex-col  items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-6xl flex justify-end items-center p-3 text-sm">
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      <HomePage />
    </div>
  );
}
