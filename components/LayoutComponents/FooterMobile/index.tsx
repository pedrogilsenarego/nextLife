"use client";

import { PlusSquare } from "lucide-react";
import useScreenSize from "@/hooks/useScreenSize";
import DrawerWrapper from "@/components/ui/Wrappers/DrawerWrapper";
import { useState } from "react";
import BusinessForm from "@/app/[slug]/components/MainValue/AddExpense/ExpensesForm/ExpenseForm";

const FooterMobile = () => {
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <div
      style={{
        background:
          "linear-gradient(to top, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0.8) 70%, rgba(255, 255, 255, 0.7) 100%)",
      }}
      className="
      flex justify-center fixed bottom-0 w-full bg-white  pb-10 border border-solid"
    >
      <div onClick={() => setOpenAdd(true)} className="py-1 px-2">
        <PlusSquare className="text-primary" size={26} />
      </div>
      <DrawerWrapper open={openAdd} setOpen={setOpenAdd}>
        <BusinessForm setOpen={setOpenAdd} />
      </DrawerWrapper>
    </div>
  );
};

export default FooterMobile;
