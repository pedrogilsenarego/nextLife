"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "../button";
import React from "react";
import BusinessForm from "@/app/[slug]/components/MainValue/AddExpense/ExpensesForm/ExpenseForm";

type Props = {
  open?: boolean;
  setOpen: (open: boolean) => void;
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
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <BusinessForm setOpen={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerWrapper;
