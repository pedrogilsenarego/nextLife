import Card from "@/components/ui/Card";
import AddBusiness from "./AddBusiness";

export default async function () {
  return (
    <>
      <Card>
        <div className="flex border-b-2 w-full justify-between pb-1">
          <div className="flex items-center gap-2">
            <p className="cursor-pointer">General</p>
            <AddBusiness />
          </div>
          <div className="flex items-center">
            <p className="cursor-pointer">Settings</p>
          </div>
        </div>
      </Card>
    </>
  );
}
