"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useState } from "react";
type Props = {
  params: {
    slug: string;
    business: string;
  };
};
const DeleteButton = ({ params }: Props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
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
          <DialogDescription>teste</DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteButton;
