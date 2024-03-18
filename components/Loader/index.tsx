import Image from "next/image";
import Logo from "../../assets/logo.svg";

const Loader = () => {
  return (
    <div
      style={{ height: "100vh" }}
      className=" flex w-full h-full items-center justify-center"
    >
      <Image style={{ width: "100px" }} src={Logo} alt="logo" />
    </div>
  );
};

export default Loader;
