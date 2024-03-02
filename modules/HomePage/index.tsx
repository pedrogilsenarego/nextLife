"use client";

import useScreenSize from "@/hooks/useScreenSize";
import HomePageMobile from "./Mobile";
import Home from "./Laptop";

const HomePage = () => {
  const { isSmallScreen } = useScreenSize();

  return isSmallScreen ? <HomePageMobile /> : <Home />;
};

export default HomePage;
