"use client";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/button";
import { queryKeys } from "@/constants/queryKeys";
import { addBusiness, getBusinesses } from "@/server/businessActions";
import { AddBusiness, addBusinessSchema } from "@/zodSchema/addBusiness";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
type Props = {
  setOpen: (open: boolean) => void;
};
const BusinessForm = ({ setOpen }: Props) => {
  const { handleSubmit, control, reset } = useForm<AddBusiness>({
    resolver: zodResolver(addBusinessSchema),
  });

  const { refetch } = useQuery({
    queryKey: [queryKeys.businesses],
    queryFn: () => getBusinesses(),
  });

  const { mutate: addBusinessMutation, isPending } = useMutation({
    mutationFn: addBusiness,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {},
    onSettled: async () => {
      setOpen(false);
      reset();
    },
  });

  function onSubmit(data: AddBusiness) {
    addBusinessMutation(data.businessName);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 flex-col">
      <Input
        placeholder="Name of business"
        name="businessName"
        control={control}
      />

      <Button isLoading={isPending} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default BusinessForm;
