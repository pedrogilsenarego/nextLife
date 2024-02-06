import moment from "moment";
import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const dataMok = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const dateFormatter = (date: string) => {
  return moment(date).format("DD/MM/YY HH:mm");
};

type Props = {
  data: { xAxis: string; uv: number; pv: number }[];
};

const BarChartComponent = ({ data = [] }: Props) => {
  data?.forEach((d: any) => {
    d.xAxis = moment(d.xAxis).valueOf(); // date -> epoch
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="xAxis"
          //domain={[data[0]?.xAxis, data[data.length - 1]?.xAxis]}
          //scale="time"
          //type="number"
          tickFormatter={dateFormatter}
        />
        <YAxis />
        <Tooltip />

        <Bar dataKey="pv" fill="#82ca9d" />
        <Bar dataKey="uv" fill="#c80815E6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
