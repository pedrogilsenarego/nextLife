import { SettingsIcon } from "lucide-react";
import AddExpenseIncome from "./AddExpenseIncome";
import User from "./User";

const FooterMobile = () => {
  return (
    <div
      style={{
        backgroundColor: "#f5432b",
        // background:
        //   "linear-gradient(to top, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0.97) 70%, rgba(255, 255, 255, 0.93) 100%)",
      }}
      className="
      flex justify-around fixed bottom-0 w-full bg-white pt-2  pb-10 border border-solid"
    >
      <div className="py-1 px-2">
        <SettingsIcon className="text-primary" size={26} color="white" />
      </div>

      <AddExpenseIncome />
      <User />
    </div>
  );
};

export default FooterMobile;
