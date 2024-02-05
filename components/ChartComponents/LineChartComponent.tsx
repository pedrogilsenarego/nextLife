import moment from "moment";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// const data = [
//   { xAxis: "2019-10-20T04:00:00Z", uv: 12, pv: 45 },
//   { xAxis: "2019-10-20T05:00:00Z", uv: 345, pv: 34 },
//   { xAxis: "2019-10-20T06:00:00Z", uv: 45, pv: 500 },
//   { xAxis: "2019-10-20T07:00:00Z", uv: 67, pv: 23 },
//   { xAxis: "2019-10-21T10:00:00Z", uv: 33, pv: 434 },
//   { xAxis: "2019-10-21T23:00:00Z", uv: 54, pv: 2 },
//   { xAxis: "2019-10-22T00:00:00Z", uv: 3, pv: 45 },
// ];

const dateFormatter = (date: string) => {
  return moment(date).format("DD/MM/YY HH:mm");
};

type Props = {
  data: { xAxis: string; uv: number; pv: number }[];
};

const LineChartComponent = ({ data = [] }: Props) => {
  console.log(data);
  data?.forEach((d: any) => {
    d.xAxis = moment(d.xAxis).valueOf(); // date -> epoch
  });
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
        <Tooltip />
        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#c80815E6"
          fill="#c80815E6"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
