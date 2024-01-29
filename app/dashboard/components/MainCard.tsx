import Card from "@/components/UI/Card";
import AddBusiness from "./AddBusiness";

export default async function () {
  return (
    <>
      <Card>
        <div className="flex gap-2 w-full">
          <AddBusiness />
          <div className="flex border-b-2 w-full justify-between ">
            <div className="flex items-center gap-2">
              <p className="cursor-pointer">General</p>
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
