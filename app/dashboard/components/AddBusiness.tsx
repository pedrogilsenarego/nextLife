import { Button } from "@/components/UI/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";
import BusinessForm from "./BusinessForm";

export default async function () {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>+</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Business</DialogTitle>
          <DialogDescription>
            <BusinessForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
