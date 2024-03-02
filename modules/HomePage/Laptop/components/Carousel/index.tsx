import { Card } from "@/components/ui/card";
import "./index.css";

type Props = {
  darkMode?: boolean;
  content?: React.ReactNode[];
};

const Carousel = ({ darkMode, content }: Props) => {
  return (
    <div className="flex overflow-hidden w-full">
      <div
        className="move-left"
        style={{
          display: "flex",
        }}
      >
        {content?.map((content, index) => {
          return (
            <div key={index} style={{ padding: "10px 10px" }}>
              <Card
                key={index}
                style={{
                  overflow: "hidden",
                  width: "400px",
                  height: "400px",

                  backgroundColor: darkMode ? "rgb(16, 16, 25)" : undefined,
                  borderColor: darkMode ? "#ffffff1A" : undefined,
                }}
              >
                {content}
              </Card>
            </div>
          );
        })}
      </div>
      <div
        className="move-left"
        //ref={containerRef2}
        style={{
          display: "flex",

          transition: "transform 0.02s linear",
        }}
      >
        {content?.map((content, index) => {
          return (
            <div key={index} style={{ padding: "10px 10px" }}>
              <Card
                key={index}
                style={{
                  overflow: "hidden",
                  width: "400px",
                  height: "400px",

                  backgroundColor: darkMode ? "rgb(16, 16, 25)" : undefined,
                  borderColor: darkMode ? "#ffffff1A" : undefined,
                }}
              >
                {content}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
