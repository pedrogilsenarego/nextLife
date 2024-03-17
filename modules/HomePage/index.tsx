"use client";

import useScreenSize from "@/hooks/useScreenSize";
import HomePageMobile from "./Mobile";
import Home from "./Laptop";

const HomePage = () => {
  const { isSmallScreen } = useScreenSize();

  if (isSmallScreen === null) return;

  return isSmallScreen ? <HomePageMobile /> : <Home />;
};

export default HomePage;
