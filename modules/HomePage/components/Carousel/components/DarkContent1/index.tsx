import { H2 } from "@/components/ui/h2";
import { H3 } from "@/components/ui/h3";

const DarkContent1 = () => {
  return (
    <div style={{}} className="flex flex-col justify-between h-full">
      <div className="p-4">
        <H2 style={{ color: "white", textAlign: "center" }}>
          Build you own Dashboard
        </H2>
        <H3
          style={{ textAlign: "center", color: "#ffffffCC", fontSize: "14px" }}
        >
          Personalize colors and configurations
        </H3>
      </div>
      <img
        style={{ width: "100%", height: "200px" }}
        src="https://blog.smartpmtraining.com/wp-content/uploads/2023/03/1.-Dashboard-Thumbnail-1024x577.png"
      />
    </div>
  );
};

export default DarkContent1;
