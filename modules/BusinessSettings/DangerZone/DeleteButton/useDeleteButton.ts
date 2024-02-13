import { deleteBusiness } from "@/clientActions/businessActions";
import { useToast } from "@/components/ui/use-toast";
import { ROUTE_PATHS } from "@/constants/routes";
import useBusinesses from "@/hooks/useBusinesses";
import useUser from "@/hooks/useUser";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useDeleteButton = ({ businessName }: { businessName: string }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const businesses = useBusinesses();
  const { user } = useUser();
  const businessId = businesses.data?.find(
    (business) => business.businessName === businessName
  )?.id;

  const { mutate: deleteBusinessMutation, isPending } = useMutation({
    mutationFn: deleteBusiness,
    onError: (error: any) => {
      console.log(error);
      toast({
        variant: "default",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    },
    onSuccess: () => {
      businesses.refetch();
      router.push(`/${user?.username}`);
      setOpenDialog(false);
      toast({
        variant: "default",
        title: "Business successfully deleted",
        description: "",
      });
    },
  });
  const handleDeleteBusiness = () => {
    if (!businessId) return;
    deleteBusinessMutation(businessId);
  };
  return {
    isPending,
    handleDeleteBusiness,
    openDialog,
    setOpenDialog,
  };
};

export default useDeleteButton;
