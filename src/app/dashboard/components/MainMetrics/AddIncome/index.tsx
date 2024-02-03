"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { H3 } from "@/components/ui/h3";
import { useState } from "react";
import IncomeForm from "./IncomeForm";

const AddIncome = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button className="w-full" onClick={() => setOpen(!open)}>
        <H3>Income</H3>
      </Button>
      <Dialog open={open} setOpen={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Income</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <IncomeForm setOpen={setOpen} />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddIncome;
