import LoginForm from "@/modules/LoginPage/components/LoginForm/LoginForm";
import NewUserLink from "@/modules/LoginPage/components/NewUserLink";

const HomePageMobile = () => {
  return (
    <div className="w-full gap-6 p-8 h-full flex flex-col justify-center items-center">
      <LoginForm />
      <NewUserLink />
    </div>
  );
};

export default HomePageMobile;
