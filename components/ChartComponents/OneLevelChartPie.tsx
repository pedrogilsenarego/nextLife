"use client";

import React, { useState } from "react";
import { Cell, Pie, PieChart, Sector } from "recharts";
import "./index.css";

type Props = {
  data1: { name: string; value: number }[];
};

const TwoLevelChartPie = ({ data1 }: Props) => {
  console.log(data1);
  const [activeIndex, setActiveIndex] = useState<number>(0);
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
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
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
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={"black"}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={"black"}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={"black"} stroke="none" />
        <text
          fontSize={12}
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`${payload.name}`}</text>
        <text
          fontSize={12}
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  return (
    <PieChart width={600} height={450}>
      <Pie
        data={data1}
        dataKey="value"
        cx="50%"
        cy="50%"
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        outerRadius={160}
        fill="#a40000"
        labelLine={false} //!primarySelected ? true : false}
        onMouseEnter={(_, index) => setActiveIndex(index)}
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
    </PieChart>
  );
};

export default TwoLevelChartPie;
