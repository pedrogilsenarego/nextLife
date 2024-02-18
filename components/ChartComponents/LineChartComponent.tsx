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
          <p style={{ color: "#82ca9d" }}>{` $${payload[0]?.payload?.pv.toFixed(
            1
          )}`}</p>
          <p style={{ color: "#c80815" }}>{`$${payload[0].payload?.uv.toFixed(
            1
          )}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        width={500}
        height={200}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
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
          tick={{ fill: "black", fontSize: 12, dy: 8 }}
          dataKey="xAxis"
          domain={[data[0]?.xAxis, data[data.length - 1]?.xAxis]}
          scale="time"
          type="number"
          tickFormatter={dateFormatter}
        />
        <YAxis tick={{ fill: "black", fontSize: 12, dx: -3 }} />
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
