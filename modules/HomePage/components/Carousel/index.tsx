import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";

type Props = {
  darkMode?: boolean;
  content?: React.ReactNode[];
};

const Carousel = ({ darkMode, content }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const unitWidth = container.children[0].clientWidth;
    let currentPosition = 0;
    let currentIndex = 0;

    const moveCarousel = () => {
      currentPosition -= 0.8; // Adjust the movement speed as needed
      container.style.transition = "none";
      container.style.transform = `translateX(${currentPosition}px)`;

      if (currentPosition <= -unitWidth) {
        // Remove the first child and append it to the end
        const firstChild = container.children[0];
        container.appendChild(firstChild.cloneNode(true));
        container.removeChild(firstChild);

        currentPosition += unitWidth;
        currentIndex = (currentIndex + 1) % container.children.length;
      }
    };

    const interval = setInterval(moveCarousel, 10); // Adjust the interval timing as needed

    return () => clearInterval(interval);
  }, []);

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
        {content?.map((content, index) => {
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
        <div style={{ padding: "0px 10px" }}>
          <Card
            style={{
              width: "400px",
              height: "400px",
              backgroundColor: darkMode ? "#09090B" : undefined,
              borderColor: darkMode ? "#ffffff1A" : undefined,
            }}
          >
            1
          </Card>
        </div>
        <div style={{ padding: "0px 10px" }}>
          <Card
            style={{
              width: "400px",
              height: "400px",
              backgroundColor: darkMode ? "#09090B" : undefined,
              borderColor: darkMode ? "#ffffff1A" : undefined,
            }}
          >
            2
          </Card>
        </div>
        <div style={{ padding: "0px 10px" }}>
          <Card
            style={{
              width: "400px",
              height: "400px",
              backgroundColor: darkMode ? "#09090B" : undefined,
              borderColor: darkMode ? "#ffffff1A" : undefined,
            }}
          >
            3
          </Card>
        </div>
        <div style={{ padding: "0px 10px" }}>
          <Card
            style={{
              width: "400px",
              height: "400px",
              backgroundColor: darkMode ? "#09090B" : undefined,
              borderColor: darkMode ? "#ffffff1A" : undefined,
            }}
          >
            4
          </Card>
        </div>
        <div style={{ padding: "0px 10px" }}>
          <Card
            style={{
              width: "400px",
              height: "400px",
              backgroundColor: darkMode ? "#09090B" : undefined,
              borderColor: darkMode ? "#ffffff1A" : undefined,
            }}
          >
            5
          </Card>
        </div>
        <div style={{ padding: "0px 10px" }}>
          <Card
            style={{
              width: "400px",
              height: "400px",
              backgroundColor: darkMode ? "#09090B" : undefined,
              borderColor: darkMode ? "#ffffff1A" : undefined,
            }}
          >
            6
          </Card>
        </div>
        <div style={{ padding: "0px 10px" }}>
          <Card
            style={{
              width: "400px",
              height: "400px",
              backgroundColor: darkMode ? "#09090B" : undefined,
              borderColor: darkMode ? "#ffffff1A" : undefined,
            }}
          >
            7
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
