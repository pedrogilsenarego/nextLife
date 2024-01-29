import DialogWrapper from "@/components/UI/Dialog";
import { Button } from "@/components/UI/button";
import BusinessForm from "./BusinessForm";

export default async function () {
  return (
    <DialogWrapper trigger={<Button>+</Button>} title="Add new Business">
      <div className="py-8">
        <BusinessForm />
      </div>
    </DialogWrapper>
  );
}
