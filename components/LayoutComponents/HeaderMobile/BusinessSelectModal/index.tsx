import { useData } from "@/app/[slug]/components/dashboard.provider";
import DrawerWrapper from "@/components/ui/Wrappers/DrawerWrapper";
import { Button } from "@/components/ui/button";
import { P } from "@/components/ui/p";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import useBusinesses from "@/hooks/useBusinesses";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const BusinessSelectModal = () => {
  const [openBusinessSelect, setOpenBusinessSelect] = useState<boolean>(false);
  const businessesQuery = useBusinesses();
  const dataContext = useData();
  const businessSelected = dataContext.state.currentBusiness;
  const businessSelectedData = businessesQuery?.data?.find(
    (business) => business.id === businessSelected
  );
  const handleClickTab = (tabValue: string) => {
    dataContext.setCurrentBusiness(tabValue);
    setOpenBusinessSelect(false);
  };
  return (
    <>
      <div className="flex gap-3 items-center">
        <Button
          onClick={() => setOpenBusinessSelect(true)}
          size={"xs"}
          className="capitalize"
        >
          {businessSelectedData?.businessName || "Total"}&nbsp;
          <CaretDownIcon />
        </Button>
      </div>
      <DrawerWrapper open={openBusinessSelect} setOpen={setOpenBusinessSelect}>
        <div className="gap-2 flex flex-col">
          <Button
            variant={businessSelected === "total" || "" ? "default" : "outline"}
            className="w-full"
            value="total"
            onClick={() => handleClickTab("total")}
          >
            Total
          </Button>
          {businessesQuery?.data?.map((business) => {
            return (
              <Button
                variant={
                  businessSelected === business.id ? "default" : "outline"
                }
                className="w-full"
                key={business.id}
                value={business.id}
                onClick={() => handleClickTab(business.id)}
              >
                {business.businessName}
              </Button>
            );
          })}
        </div>
      </DrawerWrapper>
    </>
  );
};

export default BusinessSelectModal;
