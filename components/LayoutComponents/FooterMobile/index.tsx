"use client";

import { PlusSquare } from "lucide-react";
import useScreenSize from "@/hooks/useScreenSize";
import DrawerWrapper from "@/components/ui/Wrappers/DrawerWrapper";
import { useState } from "react";

const FooterMobile = () => {
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <div
      style={{
        background:
          "linear-gradient(to top, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0.8) 70%, rgba(255, 255, 255, 0.7) 100%)",
      }}
      className="
      flex justify-center fixed bottom-0 w-full bg-white py-1 pb-8 border border-solid"
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
