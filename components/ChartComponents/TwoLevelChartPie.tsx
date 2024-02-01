"use client";

import React, { useState } from "react";
import { Pie, PieChart } from "recharts";
import "./index.css";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 },
];

type Props = {
  percentageRatio?: number;
};

const TwoLevelChartPie = ({ percentageRatio }: Props) => {
  const [primarySelected, setPrimarySelected] = useState<boolean>(true);
  const refSize = 200;
  const smallRefSize = 170;
  const innerRadius = (percentageRatio || 0.5) * refSize;
  const colorOutside =
    innerRadius < smallRefSize || innerRadius > refSize + 10
      ? "#82ca9d"
      : "#82ca9d66";

  return (
    <PieChart width={550} height={550}>
      <Pie
        style={{
          cursor: "pointer",
          boxShadow: "0 0 20px 2px rgba(0, 0, 0, 0.15)",
        }}
        onClick={() => setPrimarySelected(false)}
        data={data01}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={innerRadius}
        fill="#a40000"
        labelLine={!primarySelected ? true : false}
        label={
          !primarySelected
            ? { fill: "black", fontSize: "24xp", fontWeight: "bolder" }
            : { fill: "transparent", fontSize: "24xp", fontWeight: "bolder" }
        }
      />

      <Pie
        style={{ cursor: "pointer" }}
        onClick={() => setPrimarySelected(true)}
        data={data02}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius={smallRefSize}
        outerRadius={refSize}
        fill={colorOutside}
        labelLine={primarySelected ? true : false}
        label={
          primarySelected
            ? { fill: "black", fontSize: "24xp", fontWeight: "bolder" }
            : { fill: "transparent", fontSize: "24xp", fontWeight: "bolder" }
        }
      />
    </PieChart>
  );
};

export default TwoLevelChartPie;
