import Card from "@/components/UI/Card";
import { Button } from "@/components/UI/button";
import { getBusinesses } from "@/server/businessActions";
import AddBusiness from "./AddBusiness";

export default async function () {
  const businesses = await getBusinesses();

  return (
    <>
      <Card>
        <div className="flex gap-2 w-full">
          <AddBusiness />
          <div className="flex border-b-2 w-full justify-between ">
            <div className="flex items-center gap-4">
              <Button variant={"ghost"}>General</Button>
              {businesses.map((business) => (
                <Button
                  variant={"ghost"}
                  key={business.id}
                  className="cursor-pointer"
                >
                  {business.businessName}
                </Button>
              ))}
            </div>
            <div className="flex items-center">
              <p className="cursor-pointer">Settings</p>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
