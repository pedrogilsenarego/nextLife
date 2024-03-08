"use client";
import useScreenSize from "@/hooks/useScreenSize";
import moment from "moment";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const dateFormatter = (date: string) => {
  return moment(date).format("MMM YY");
};

type Props = {
  data: { xAxis: string; uv: number; pv: number }[];
};

const LineChartComponent = ({ data = [] }: Props) => {
  // just to remove the errors on the chart
  const error = console.error;
  const { isSmallScreen } = useScreenSize();
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
  //
  data?.forEach((d: any) => {
    d.xAxis = moment(d.xAxis).valueOf(); // date -> epoch
  });
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div>
          <p
            style={{
              color: "#82ca9d",
              fontSize: isSmallScreen ? "12px" : "16px",
            }}
          >{` $${payload[0]?.payload?.pv.toFixed(0)}`}</p>
          <p
            style={{
              color: "#c80815",
              fontSize: isSmallScreen ? "12px" : "16px",
            }}
          >{`$${payload[0].payload?.uv.toFixed(0)}`}</p>
        </div>
      );
    }

    return null;
  };

  const formatYAxisTick = (tick: number): string => {
    if (tick >= 1000000) {
      return `${(tick / 1000000).toFixed(1)}M`;
    } else if (tick >= 100) {
      return `${(tick / 1000).toFixed(1)}K`;
    }
    return tick.toString();
  };

  return (
    <ResponsiveContainer width="100%" height={isSmallScreen ? 250 : 300}>
      <AreaChart
        data={data}
        syncId="anyId"
        margin={{
          top: isSmallScreen ? 30 : 10,
          right: isSmallScreen ? 20 : 30,
          left: isSmallScreen ? -20 : 0,
          bottom: isSmallScreen ? 30 : 0,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#c8081566" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#c8081566" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d66" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d66" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          tick={{
            fill: "black",
            fontSize: isSmallScreen ? 10 : 12,
          }}
          dataKey="xAxis"
          domain={[data[0]?.xAxis, data[data.length - 1]?.xAxis]}
          scale="time"
          type="number"
          tickFormatter={dateFormatter}
        />
        <YAxis
          tick={{
            fill: "black",
            fontSize: isSmallScreen ? 10 : 12,
            dx: isSmallScreen ? 0 : -3,
          }}
          tickFormatter={formatYAxisTick}
        />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#c80815"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
