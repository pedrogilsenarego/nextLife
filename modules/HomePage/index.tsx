"use client";
import Footer from "@/components/LayoutComponents/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { H1 } from "@/components/ui/h1";
import { H3 } from "@/components/ui/h3";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Carousel from "./components/Carousel";
import "./index.css";

const About = () => {
  const [mouseX, setMouseX] = useState<number>(0);
  const maintext = "Finally a service to organize your...  ";
  const router = useRouter();
  useEffect(() => {
    function handleMouseMove(event: { clientX: number; clientY: any }) {
      const xPercentage = (event.clientX / window.innerWidth) * 100;
      setMouseX(xPercentage);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const container = document.querySelector(".container") as HTMLElement;
    const firstBox = document.querySelector(".first-box") as HTMLElement;
    if (container) {
      container.style.setProperty("--cut-width", mouseX + "%");
    }
    if (firstBox) {
      firstBox.style.setProperty("--cut-width", mouseX + "%");
    }
  }, [mouseX]);

  const handleClickSettings = () => {
    router.push(`/login`);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flex: 1,
          alignItems: "top",
          position: "relative",
        }}
      >
        <div className="first-box">
          <div
            style={{ rowGap: "100px" }}
            className="flex flex-col w-full items-center justify-between"
          >
            <div>
              <div
                className="flex items-center p-8 justify-center flex-col "
                style={{ marginTop: "50px" }}
              >
                <Card className="flex items-center p-8 justify-center flex-col bg">
                  <H1 style={{ marginTop: "20px" }}>Control your money flow</H1>
                  <H3 style={{ marginTop: "5px", color: "#71717A" }}>
                    {maintext}
                  </H3>
                  <H1
                    style={{
                      marginTop: "40px",
                      color: "#71717A",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      letterSpacing: "2px",
                    }}
                  >
                    Incomes
                  </H1>
                  <Button
                    onClick={handleClickSettings}
                    style={{ marginTop: "40px" }}
                  >
                    Get Started
                  </Button>
                </Card>
              </div>

              <Carousel />
            </div>
            <Footer />
          </div>
        </div>
        <div
          className="container"
          style={{
            background: `#09090B`,
          }}
        >
          <div
            style={{ rowGap: "100px" }}
            className="flex flex-col w-full items-center justify-between"
          >
            <div
              style={{ rowGap: "100px" }}
              className="flex flex-col w-full items-center justify-between"
            >
              <div>
                <div
                  className="flex items-center p-8 justify-center flex-col "
                  style={{ marginTop: "50px" }}
                >
                  <Card
                    className="flex items-center p-8 justify-center flex-col bg"
                    style={{
                      backgroundColor: "#09090B",
                      borderColor: "#ffffff1A",
                    }}
                  >
                    <H1 style={{ color: "#FAFAFA", marginTop: "20px" }}>
                      Control your money flow
                    </H1>
                    <H3 style={{ color: "#A1A1AA", marginTop: "5px" }}>
                      {maintext}
                    </H3>
                    <H1
                      style={{
                        color: "#ffffffCC",
                        marginTop: "40px",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        letterSpacing: "2px",
                      }}
                    >
                      Expenses
                    </H1>
                    <Button
                      onClick={handleClickSettings}
                      style={{
                        marginTop: "40px",
                        fontWeight: 800,
                        color: "black",
                        backgroundColor: "#E4E4E7",
                      }}
                    >
                      Get Started
                    </Button>
                  </Card>
                </div>
                <Carousel darkMode />
              </div>
            </div>
            <Footer lightMode />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
