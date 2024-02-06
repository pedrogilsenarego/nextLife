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
import CategoryForm from "./AddCategoryForm/CategoryForm";

type Props = {
  configuration: "expense" | "income";
};

const AddCategory = ({ configuration }: Props) => {
  const [openDial, setOpenDial] = useState<boolean>(false);
  return (
    <>
      <Button size={"sm"} className="" onClick={() => setOpenDial(!openDial)}>
        <H3>+</H3>
      </Button>
      <Dialog open={openDial} setOpen={setOpenDial}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Category</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <CategoryForm setOpen={setOpenDial} configuration={configuration} />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCategory;
