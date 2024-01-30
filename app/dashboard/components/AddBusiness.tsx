"use client";

import { Button } from "@/components/UI/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog";
import { useState } from "react";
import BusinessForm from "./BusinessForm";

export default function ({ refetchBusinessData }: any) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setOpen(!open)}>+</Button>
      <Dialog open={open} setOpen={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Business</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <BusinessForm
              setOpen={setOpen}
              refetchBusinessData={refetchBusinessData}
            />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
