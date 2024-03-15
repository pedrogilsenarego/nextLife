"use client";

import useScreenSize from "@/hooks/useScreenSize";
import SignupForm from "./components/SignupForm/SignupForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/constants/routes";
import Image from "next/image";
import Logo from "../../assets/logo.svg";

const SignupPage = () => {
  const { isSmallScreen } = useScreenSize();
  const router = useRouter();
  return isSmallScreen ? (
    <div className="w-full gap-6 p-4 h-full flex flex-col justify-between items-center my-6">
      <div className="flex flex-col justify-start h-full gap-6">
        <Image
          style={{ marginBottom: "10px", marginTop: "50px" }}
          src={Logo}
          alt="logo"
          className="w-full px-4"
        />
        <Card className="p-4 rounded-none shadow-md flex flex-col justify-between gap-4">
          <SignupForm />
        </Card>
      </div>
      <Button
        onClick={() => router.push(ROUTE_PATHS.HOME)}
        className="w-full"
        variant={"outline"}
      >
        Back
      </Button>
      <p className="text-xs p-6">
        Powered by <a className="font-bold hover:underline">SenaRego</a>
      </p>
    </div>
  ) : (
    <Card className="flex flex-col py-10 justify-center px-10">
      <SignupForm />
    </Card>
  );
};

export default SignupPage;
