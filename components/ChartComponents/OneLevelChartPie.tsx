"use client";

import React, { useEffect, useState } from "react";
import { Cell, Pie, PieChart, Sector } from "recharts";
import "./index.css";
import useScreenSize from "@/hooks/useScreenSize";

type Props = {
  data1: { name: string; value: number }[];
};

type DataItem = {
  name: string;
  value: number;
};

const TwoLevelChartPie = ({ data1 }: Props) => {
  const { isSmallScreen } = useScreenSize();
  const totalValue = data1.reduce((acc, { value }) => acc + value, 0);

  // Calculate modified data
  const modifiedData: Record<string, number> = data1.reduce(
    (acc: any, { name, value }) => {
      const percentage = (value / totalValue) * 100;
      if (percentage < 3) {
        // If percentage is smaller than 3%, add to "Other" category
        acc.Other = (acc.Other || 0) + value;
      } else {
        // Otherwise, add to original category
        acc[name] = value;
      }
      return acc;
    },
    {}
  );

  // Convert modified data to array format
  const modifiedDataArray: DataItem[] = Object.entries(modifiedData).map(
    ([name, value]) => ({ name, value })
  );

  const [activeIndex, setActiveIndex] = useState<number[]>(
    Array.from({ length: modifiedDataArray.length }, (_, index) => index)
  );

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + (isSmallScreen ? 5 : 10)) * cos;
    const sy = cy + (outerRadius + (isSmallScreen ? 5 : 10)) * sin;
    const mx = cx + (outerRadius + (isSmallScreen ? 15 : 30)) * cos;
    const my = cy + (outerRadius + (isSmallScreen ? 15 : 30)) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          cornerRadius={3}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + (isSmallScreen ? 2 : 6)}
          outerRadius={outerRadius + (isSmallScreen ? 6 : 10)}
          cornerRadius={3}
          fill={"#0F172A1A"}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={innerRadius - (isSmallScreen ? 6 : 10)}
          outerRadius={innerRadius - (isSmallScreen ? 2 : 6)}
          cornerRadius={3}
          fill={"#0F172A1A"}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={"black"}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={"black"} stroke="none" />
        <text
          fontSize={isSmallScreen ? 9 : 12}
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`${payload.name}`}</text>
      </g>
    );
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.45;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        style={{
          fill: "white",
          fontSize: isSmallScreen ? "9px" : "12px",
        }}
        x={x}
        y={y}
        textAnchor={"middle"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <PieChart
      width={isSmallScreen ? 320 : 600}
      height={isSmallScreen ? 250 : 420}
    >
      <Pie
        data={modifiedDataArray}
        dataKey="value"
        cx="50%"
        cy="50%"
        activeIndex={Array.from(
          { length: modifiedDataArray.length },
          (_, index) => index
        )}
        activeShape={renderActiveShape}
        label={renderCustomizedLabel}
        innerRadius={isSmallScreen ? 40 : 80}
        cornerRadius={4}
        outerRadius={isSmallScreen ? 80 : 160}
        paddingAngle={2}
        fill="#18181B"
        labelLine={false} //!primarySelected ? true : false}
        // onClick={(event, index) => {
        //   setActiveIndex((prev) => {
        //     // Check if the index exists in the state array
        //     const indexExists = prev.includes(index);

        //     if (indexExists) {
        //       // If the index exists, filter it out
        //       return prev.filter((item) => item !== index);
        //     } else {
        //       // If the index doesn't exist, add it
        //       return [...prev, index];
        //     }
        //   });
        // }}
      ></Pie>
    </PieChart>
  );
};

export default TwoLevelChartPie;
