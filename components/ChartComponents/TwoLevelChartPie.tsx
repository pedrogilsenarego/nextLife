"use client";

import React, { useState } from "react";
import { Cell, Pie, PieChart } from "recharts";
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
  data1: { name: string; value: number }[];
  data2: { name: string; value: number }[];
};

const TwoLevelChartPie = ({ percentageRatio, data1, data2 }: Props) => {
  const [primarySelected, setPrimarySelected] = useState<boolean>(true);
  const refSize = 160;
  const smallRefSize = 140;
  const innerRadius = (percentageRatio || 0.5) * refSize;
  const colorOutside =
    innerRadius < smallRefSize || innerRadius > refSize + 10
      ? "#82ca9d"
      : "#82ca9d66";

  const COLORS_RED = [
    "#7c0a02",
    "#be4f62",
    "#a40000",
    "#ff355e",
    "#d9603b",
    "#c80815",
    "#d9004c",
  ];

  const COLORS_GREEN = [
    "#5f9ea0",
    "#40826d",
    "#20b2aa",
    "#009b7d",
    "#004040",
    "#aaf0d1",
    "#88d8c0",
    "#29ab87",
  ];

  return (
    <PieChart width={450} height={450}>
      <Pie
        onClick={() => setPrimarySelected(false)}
        data={data1}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={innerRadius}
        fill="#a40000"
        labelLine={!primarySelected ? true : false}
        label={
          !primarySelected
            ? {
                fill: "black",
                fontSize: "24xp",
                fontWeight: "bolder",
              }
            : false
        }
      >
        {data1?.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS_RED[index % COLORS_RED.length]}
            style={{
              cursor: "pointer",
              stroke: "#ffffff66",
              filter: `drop-shadow(0px 0px 3px ${
                COLORS_RED[index % COLORS_RED.length]
              }`,
            }}
            stroke="0"
          />
        ))}
      </Pie>

      <Pie
        onClick={() => setPrimarySelected(true)}
        data={data2}
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
            : false
        }
      >
        {data2?.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS_GREEN[index % COLORS_GREEN.length]}
            style={{
              cursor: "pointer",
              stroke: "#ffffff66",
              filter: `drop-shadow(0px 0px 3px ${
                COLORS_GREEN[index % COLORS_GREEN.length]
              }`,
            }}
            stroke="0"
          />
        ))}
      </Pie>
    </PieChart>
  );
};

export default TwoLevelChartPie;
