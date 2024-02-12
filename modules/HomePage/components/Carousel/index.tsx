import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

type Props = {
  darkMode?: boolean;
  content?: React.ReactNode[];
};

const Carousel = ({ darkMode, content }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const [tilesArray, setTilesArray] = useState<React.ReactNode[]>([
    ...(content || []),
    ...(content || []),
  ]);

  useEffect(() => {
    const container = containerRef.current;
    const container2 = containerRef2.current;
    if (!container || !container2) return;

    const unitWidth = (420 * tilesArray.length) / 2;

    let currentPosition = 0;

    const moveCarousel = () => {
      currentPosition -= 1;
      container.style.transition = "none";
      container.style.transform = `translateX(${currentPosition}px)`;

      if (currentPosition <= -unitWidth) {
        let firstElements = tilesArray.slice(0, tilesArray.length / 2);
        setTilesArray((prev) => [
          ...prev.slice(tilesArray.length / 2),
          ...firstElements,
        ]);

        currentPosition += unitWidth; // Adjusted to the width of the container
      }
    };

    const interval = setInterval(moveCarousel, 10);

    return () => clearInterval(interval);
  }, [tilesArray]);

  return (
    <div
      className="flex overflow-hidden"
      style={{
        width: "99vw",

        overflow: "hidden",
      }}
    >
      <div
        ref={containerRef}
        style={{
          display: "flex",
          width: "100vw",
          transition: "transform 0.02s linear",
        }}
      >
        {tilesArray?.map((content, index) => {
          return (
            <div style={{ padding: "0px 10px" }}>
              <Card
                key={index}
                style={{
                  overflow: "hidden",
                  width: "400px",
                  height: "400px",

                  backgroundColor: darkMode ? "#09090B" : undefined,
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
        ref={containerRef2}
        style={{
          display: "flex",
          width: "100vw",
          transition: "transform 0.02s linear",
        }}
      >
        {tilesArray?.map((content, index) => {
          return (
            <div style={{ padding: "10px 10px" }}>
              <Card
                key={index}
                style={{
                  overflow: "hidden",
                  width: "400px",
                  height: "400px",

                  backgroundColor: darkMode ? "#09090B" : undefined,
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
