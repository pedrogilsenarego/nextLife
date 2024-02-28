"use client";
import BusinessForm from "@/app/[slug]/components/MainValue/AddExpense/ExpensesForm/ExpenseForm";
import IncomeForm from "@/app/[slug]/components/MainValue/AddIncome/IncomeForm";
import { userLogout } from "@/clientActions/userAction";
import DrawerWrapper from "@/components/ui/Wrappers/DrawerWrapper";
import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const User = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    await userLogout();
    router.push("/");
  };

  return (
    <>
      <div onClick={() => setOpenAdd(true)} className="py-1 px-2">
        <User2 className="text-primary" size={26} />
      </div>
      <DrawerWrapper open={openAdd} setOpen={setOpenAdd}>
        <div>
          <Button onClick={handleLogout} className="w-full">
            Logout
          </Button>
        </div>
      </DrawerWrapper>
    </>
  );
};

export default User;
