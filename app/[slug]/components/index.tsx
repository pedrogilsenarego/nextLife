"use client";

import { ROUTE_PATHS } from "@/constants/routes";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import HeaderDashboard from "./HeaderDashboard";
import MainCard from "./MainCard";
import MainMetrics from "./MainMetrics";
import MainValue from "./MainValue";
import { DataProvider } from "./dashboard.provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getUserSession } from "@/clientActions/userAction";

type LayoutProps = {
  params: {
    slug: string;
    business: string;
  };
};

const DashBoard = ({ params }: LayoutProps) => {
  const { user } = useUser();

  const router = useRouter();

  if (!user) return;
  if (user?.username !== params.slug) {
    router.push(ROUTE_PATHS.ACCESS_DENIED);
    return;
  }

  return (
    <DataProvider>
      <TooltipProvider>
        <div className="flex-1 w-full max-w-screen-2xl flex flex-col gap-3 items-start rounded-md bg-slate-50">
          <HeaderDashboard />
          <MainMetrics />
          <MainCard />
        </div>
      </TooltipProvider>
    </DataProvider>
  );
};

export default DashBoard;
