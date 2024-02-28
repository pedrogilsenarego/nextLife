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
    goal: 400,
    label: "Groceries",
  },
  {
    goal: 300,
    label: "Pets",
  },
  {
    goal: 200,
    label: "Transports",
  },
  {
    goal: 300,
  },
  {
    goal: 200,
    label: "Pets",
  },
  {
    goal: 278,
  },
  {
    goal: 189,
    label: "Restaurants",
  },
  {
    goal: 239,
  },
  {
    goal: 300,
    label: "Cloths",
  },
  {
    goal: 200,
  },
  {
    goal: 278,
    label: "Health",
  },
  {
    goal: 189,
  },
  {
    goal: 349,
    label: "Travel",
  },
];

type Props = {
  data?: any[];
};

const BarChartComponent = ({ data = dataMok }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        //margin={{ top: 0, bottom: 30, left: 10, right: 10 }}
      >
        <Bar
          radius={[0, 6, 6, 0]}
          dataKey="goal"
          style={
            {
              fill: "hsl(var(--foreground))",
              opacity: 0.9,
            } as React.CSSProperties
          }
        />
        {/* <XAxis
          fontSize={10}
          axisLine={false}
          tickLine={false}
          dataKey="label"
          angle={-45}
          textAnchor="end"
        /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
