"use client";

import MainCard from "./MainCard";
import MainMetrics from "./MainMetrics";

const DashBoard = () => {
  return (
    <div className="flex-1 w-full max-w-screen-2xl flex flex-col gap-3 items-center rounded-md bg-slate-50">
      <MainMetrics />

      <MainCard />
    </div>
  );
};

export default DashBoard;
