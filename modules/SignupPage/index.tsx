"use client";

import useScreenSize from "@/hooks/useScreenSize";
import SignupForm from "./components/SignupForm/SignupForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/constants/routes";

const SignupPage = () => {
  const { isSmallScreen } = useScreenSize();
  const router = useRouter();
  return isSmallScreen ? (
    <div className="flex flex-col gap-4">
      <SignupForm />
      <Button
        onClick={() => router.push(ROUTE_PATHS.HOME)}
        className="w-full"
        variant={"outline"}
      >
        Back
      </Button>
    </div>
  ) : (
    <Card className="flex flex-col py-10 justify-center px-10">
      <SignupForm />
    </Card>
  );
};

export default SignupPage;
