"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import useDeleteButton from "./useDeleteButton";

type Props = {
  params: {
    slug: string;
    business: string;
  };
};
const DeleteButton = ({ params }: Props) => {
  const { handleDeleteBusiness, openDialog, setOpenDialog, isPending } =
    useDeleteButton({ businessName: params.business });

  return (
    <>
      <Button onClick={() => setOpenDialog(true)} variant={"destructive"}>
        Delete this Business
      </Button>
      <Dialog open={openDialog} setOpen={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle
              style={{ color: "orangered", textTransform: "capitalize" }}
            >
              Delete {params?.business}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            This will also delete all the entries associated to this business,
            are you sure wou want to procede?
          </DialogDescription>
          <Button
            isLoading={isPending}
            onClick={handleDeleteBusiness}
            variant={"destructive"}
            className="capitalize"
          >
            Delete {params.business}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteButton;
