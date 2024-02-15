"use client";

import { ROUTE_PATHS } from "@/constants/routes";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import MainCard from "./MainCard";
import MainMetrics from "./MainMetrics";
import MainValue from "./MainValue";
import { DataProvider } from "./dashboard.provider";

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
      <div className="flex-1 w-full max-w-screen-2xl flex flex-col gap-3 items-center rounded-md bg-slate-50">
        <nav
          className="w-full  flex justify-center border-b border-b-foreground/10 h-16 fixed top-0 z-10"
          style={{ backgroundColor: "#ffffffE6" }}
        >
          <div className="w-full max-w-screen-2xl flex justify-start items-center py-3 text-sm ">
            <MainValue />
          </div>
        </nav>
        <MainMetrics />
        <MainCard />
      </div>
    </DataProvider>
  );
};

export default DashBoard;
