import AddExpenseIncome from "./AddExpenseIncome";
import User from "./User";

const FooterMobile = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(to top, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0.95) 70%, rgba(255, 255, 255, 0.9) 100%)",
      }}
      className="
      flex justify-around fixed bottom-0 w-full bg-white  pb-10 border border-solid"
    >
      <AddExpenseIncome />
      <User />
    </div>
  );
};

export default FooterMobile;
