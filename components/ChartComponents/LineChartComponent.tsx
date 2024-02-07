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
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="xAxis"
          domain={[data[0]?.xAxis, data[data.length - 1]?.xAxis]}
          scale="time"
          type="number"
          tickFormatter={dateFormatter}
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d33" />
        <Area type="monotone" dataKey="uv" stroke="#c80815" fill="#c8081533" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
