"use client";

import { PlusSquare } from "lucide-react";
import useScreenSize from "@/hooks/useScreenSize";
import DrawerWrapper from "@/components/ui/Wrappers/DrawerWrapper";
import { useState } from "react";

const FooterMobile = () => {
  const { isSmallScreen } = useScreenSize();
  const [openAdd, setOpenAdd] = useState(false);
  if (!isSmallScreen) return;

  return (
    <div
      style={{
        background:
          "linear-gradient(to top, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5))",
      }}
      className="
      flex justify-center fixed bottom-0 w-full bg-white py-2 border border-solid"
    >
      <PlusSquare
        onClick={() => setOpenAdd(true)}
        className="text-primary"
        size={30}
      />
      <DrawerWrapper open={openAdd} setOpen={setOpenAdd} />
    </div>
  );
};

export default FooterMobile;
