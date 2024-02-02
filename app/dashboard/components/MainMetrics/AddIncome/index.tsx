"use client";

import { Button } from "@/components/UI/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog";
import { H3 } from "@/components/UI/h3";
import { useState } from "react";
import IncomeForm from "./IncomeForm";

const AddIncome = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setOpen(!open)}>
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
