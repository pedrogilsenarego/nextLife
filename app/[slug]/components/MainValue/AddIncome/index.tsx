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
import useBusinesses from "@/hooks/useBusinesses";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { P } from "@/components/ui/p";

const AddIncome = () => {
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
            <H3>Income</H3>
          </Button>
        </TooltipTrigger>
        {conditionDisable && (
          <TooltipContent>
            <P>Create businesses first to add your first income</P>
          </TooltipContent>
        )}
      </Tooltip>

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
