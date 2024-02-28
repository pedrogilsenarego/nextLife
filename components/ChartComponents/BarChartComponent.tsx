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
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

type Props = {
  data?: any[];
};

const BarChartComponent = ({ data = dataMok }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <Bar
          dataKey="goal"
          style={
            {
              fill: "hsl(var(--foreground))",
              opacity: 0.9,
            } as React.CSSProperties
          }
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
