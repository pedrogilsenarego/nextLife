"use client";

import MainCard from "./MainCard";
import MainMetrics from "./MainMetrics";
import MainValue from "./MainValue";
import { DataProvider } from "./dashboard.provider";

const DashBoard = () => {
  return (
    <DataProvider>
      <div className="flex-1 w-full max-w-screen-2xl flex flex-col gap-3 items-center rounded-md bg-slate-50">
        <MainMetrics />
        <MainValue />
        <MainCard />
      </div>
    </DataProvider>
  );
};

export default DashBoard;
