"use client";
import Footer from "@/components/LayoutComponents/Footer";
import Header from "@/components/LayoutComponents/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { H1 } from "@/components/ui/h1";
import { H3 } from "@/components/ui/h3";
import { ROUTE_PATHS } from "@/constants/routes";
import { Delicious_Handrawn } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Carousel from "./components/Carousel";
import DarkContent1 from "./components/Carousel/components/DarkContent1";
import "./index.css";
import LightContent1 from "./components/Carousel/components/LightComponent1";
import { H2 } from "@/components/ui/h2";

const Home = () => {
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
    router.push(ROUTE_PATHS.SIGNUP);
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
            style={{ minHeight: "100vh" }}
            className="flex flex-col w-full items-center justify-between "
          >
            <Header initial />
            <div className="w-full">
              <div className="flex items-center p-8 justify-center flex-col ">
                <Card className="flex items-center p-8 justify-center flex-col bg">
                  <H1 style={{ marginTop: "20px" }}>Control your money flow</H1>
                  <H3 style={{ marginTop: "5px", color: "#71717A" }}>
                    {maintext}
                  </H3>
                  <H2
                    style={{
                      marginTop: "30px",

                      textTransform: "uppercase",

                      color: "orangered",
                      fontWeight: 600,
                      letterSpacing: "3px",
                    }}
                  >
                    Incomes
                  </H2>
                  <Button
                    onClick={handleClickSettings}
                    style={{ marginTop: "30px" }}
                  >
                    Get Started
                  </Button>
                </Card>
              </div>

              <Carousel
                content={[
                  <LightContent1 />,
                  <p>1sasasa</p>,
                  <p>2sasasa</p>,
                  <p>3sasa</p>,
                  <p>4sasasa</p>,
                ]}
              />
            </div>
            <Footer />
          </div>
        </div>
        <div
          className="container"
          style={{
            background: `rgb(16, 16, 25)`,
          }}
        >
          <div
            style={{ minHeight: "100vh" }}
            className="flex flex-col w-full items-center justify-between"
          >
            <Header darkMode initial />
            <div className="w-full">
              <div>
                <div className="flex items-center p-8 justify-center flex-col ">
                  <Card
                    className="flex items-center p-8 justify-center flex-col bg"
                    style={{
                      backgroundColor: "rgb(16, 16, 25)",
                      borderColor: "#ffffff1A",
                    }}
                  >
                    <H1 style={{ color: "#FAFAFA", marginTop: "20px" }}>
                      Control your money flow
                    </H1>
                    <H3 style={{ color: "#A1A1AA", marginTop: "5px" }}>
                      {maintext}
                    </H3>
                    <H2
                      style={{
                        marginTop: "30px",

                        textTransform: "uppercase",

                        color: "purple",
                        fontWeight: 600,
                        letterSpacing: "3px",
                      }}
                    >
                      Expenses
                    </H2>
                    <Button
                      onClick={handleClickSettings}
                      style={{
                        marginTop: "30px",
                        fontWeight: 800,
                        color: "black",
                        backgroundColor: "#E4E4E7",
                      }}
                    >
                      Get Started
                    </Button>
                  </Card>
                </div>
                <Carousel
                  darkMode
                  content={[
                    <DarkContent1 />,
                    <p>1sasasa</p>,
                    <p>2sasa</p>,
                    <p>3sasasa</p>,
                    <p>4sasa</p>,
                  ]}
                />
              </div>
            </div>
            <Footer lightMode />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
