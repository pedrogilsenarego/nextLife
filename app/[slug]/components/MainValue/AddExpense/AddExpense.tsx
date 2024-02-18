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
import BusinessForm from "./ExpensesForm/ExpenseForm";
import useBusinesses from "@/hooks/useBusinesses";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { P } from "@/components/ui/p";

export default function () {
  const [open, setOpen] = useState<boolean>(false);
  const business = useBusinesses();
  const businesses = business?.data || [];
  const conditionDisable = businesses.length <= 0;
  return (
    <>
      <Tooltip delayDuration={0.5}>
        <TooltipTrigger asChild>
          <Button
            variant={conditionDisable ? "defaultDisabled" : "default"}
            onClick={conditionDisable ? () => null : () => setOpen(!open)}
          >
            <H3>Expense</H3>
          </Button>
        </TooltipTrigger>
        {conditionDisable && (
          <TooltipContent>
            <P>Create businesses first to add your first expense</P>
          </TooltipContent>
        )}
      </Tooltip>
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
