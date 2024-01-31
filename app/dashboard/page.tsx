import MainMetrics from "@/app/dashboard/components/MainMetrics/MainMetrics";
import AuthButton from "@/components/AuthButton";
import { queryKeys } from "@/constants/queryKeys";
import { getBusinesses } from "@/server/businessActions";

import { createClient } from "@/utils/supabase/server";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import MainCard from "./components/MainCard/MainCard";

export default async function () {
  const cookieStore = cookies();

  const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: [queryKeys.businesses],
  //   queryFn: getBusinesses,
  // });

  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-6xl flex justify-end items-center p-3 text-sm">
            {isSupabaseConnected && <AuthButton />}
          </div>
        </nav>
        <MainMetrics />
        <MainCard />

        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
          <p>
            Powered by{" "}
            <a
              href=""
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              SenaRego
            </a>
          </p>
        </footer>
      </div>
    </HydrationBoundary>
  );
}
