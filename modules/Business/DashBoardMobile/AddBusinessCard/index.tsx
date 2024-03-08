import BusinessForm from "@/app/[slug]/components/MainCard/AddBusiness/BusinessForm";
import DrawerWrapper from "@/components/ui/Wrappers/DrawerWrapper";
import { Card } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const AddBusinessCard = () => {
  const [openBusinessSelect, setOpenBusinessSelect] = useState<boolean>(false);

  return (
    <>
      <Card
        onClick={() => setOpenBusinessSelect(true)}
        className="p-3 rounded-none shadow-md flex justify-between"
      >
        <p className="font-bold">Create New Business</p>
        <PlusIcon style={{ width: "22px", height: "22px" }} />
      </Card>
      <DrawerWrapper open={openBusinessSelect} setOpen={setOpenBusinessSelect}>
        <BusinessForm setOpen={setOpenBusinessSelect} />
      </DrawerWrapper>
    </>
  );
};

export default AddBusinessCard;
