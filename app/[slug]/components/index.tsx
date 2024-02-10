"use client";

import MainCard from "./MainCard";
import MainMetrics from "./MainMetrics";
import MainValue from "./MainValue";
import { DataProvider } from "./dashboard.provider";

const DashBoard = () => {
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
