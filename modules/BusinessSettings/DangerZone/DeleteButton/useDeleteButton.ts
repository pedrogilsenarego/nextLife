import { useState } from "react";

const useDeleteButton = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleDeleteBusiness = () => {};
  return {
    handleDeleteBusiness,
    openDialog,
    setOpenDialog,
  };
};

export default useDeleteButton;
