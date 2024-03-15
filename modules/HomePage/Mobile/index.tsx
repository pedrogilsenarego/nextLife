import LoginForm from "@/modules/LoginPage/components/LoginForm/LoginForm";
import NewUserLink from "@/modules/LoginPage/components/NewUserLink";
import Logo from "../../../assets/logo.svg";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const HomePageMobile = () => {
  return (
    <div className="w-full gap-6 p-4 h-full flex flex-col justify-between items-center">
      <div className="flex flex-col justify-center h-full gap-4">
        <Image
          style={{ marginBottom: "30px" }}
          src={Logo}
          alt="logo"
          className="w-full px-4"
        />
        <Card className="p-4 rounded-none shadow-md flex flex-col justify-between gap-4">
          <LoginForm />
          <NewUserLink />
        </Card>
      </div>
      <p className="text-xs">
        Powered by <a className="font-bold hover:underline">SenaRego</a>
      </p>
    </div>
  );
};

export default HomePageMobile;
