import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../button";

type Props = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

const DrawerWrapper = ({ open, setOpen }: Props) => {
  return (
    <Drawer
      open={open}
      onOpenChange={(newOpen) => {
        if (setOpen) setOpen(newOpen);
      }}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerWrapper;
