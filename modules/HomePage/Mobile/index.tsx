import LoginForm from "@/modules/LoginPage/components/LoginForm/LoginForm";
import NewUserLink from "@/modules/LoginPage/components/NewUserLink";
import Logo from "../../../assets/logo.svg";
import Image from "next/image";

const HomePageMobile = () => {
  return (
    <div className="w-full gap-6 p-8 h-full flex flex-col justify-around items-center">
      <Image src={Logo} alt="logo" className="w-full" />

      <LoginForm />
      <NewUserLink />
    </div>
  );
};

export default HomePageMobile;
