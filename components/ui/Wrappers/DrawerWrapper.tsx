"use client";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

import React from "react";

type Props = {
  open?: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
};

const DrawerWrapper = ({ open, setOpen, children }: Props) => {
  return (
    <Drawer
      open={open}
      onOpenChange={(newOpen) => {
        if (setOpen) setOpen(newOpen);
      }}
    >
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm p-4 pb-20">
          {/* <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader> */}
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerWrapper;
