import BarChartComponent from "@/components/ChartComponents/BarChartComponent";
import { H2 } from "@/components/ui/h2";
import { H3 } from "@/components/ui/h3";

const LightContent1 = () => {
  return (
    <div style={{}} className="flex flex-col justify-between h-full p-4">
      <div className="">
        <H2 style={{ textAlign: "center" }}>Track different categories</H2>
        <H3
          className=""
          style={{ textAlign: "center", color: "darkgrey", fontSize: "18px" }}
        >
          use default ones or create new
        </H3>
      </div>
      <div className="">
        <div className="h-40">
          <BarChartComponent />
        </div>
        <H2 style={{ textAlign: "center" }}>Expenses</H2>
      </div>
    </div>
  );
};

export default LightContent1;
