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
import BusinessForm from "./ExpensesForm/ExpenseForm";

export default function () {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setOpen(!open)}>
        <h1 className="text-3xl">+</h1>
      </Button>
      <Dialog open={open} setOpen={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Expense</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <BusinessForm setOpen={setOpen} />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
