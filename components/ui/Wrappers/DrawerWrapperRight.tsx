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
      <DrawerContent
        style={{
          border: "solid 2px black",
          overflow: "scroll",
          WebkitOverflowScrolling: "touch",
        }}
        className="rounded-none h-full"
        showDivider={false}
      >
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerWrapperRight;
