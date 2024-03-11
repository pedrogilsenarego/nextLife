"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import React from "react";

type Props = {
  open?: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
};

const DrawerWrapperRight = ({ open, setOpen, children }: Props) => {
  return (
    <Drawer
      direction="right"
      open={open}
      onOpenChange={(newOpen) => {
        if (setOpen) setOpen(newOpen);
      }}
    >
      <DrawerContent className="rounded-none h-full" showDivider={false}>
        <div className="mx-auto w-full max-w-sm p-4 pb-20">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerWrapperRight;
