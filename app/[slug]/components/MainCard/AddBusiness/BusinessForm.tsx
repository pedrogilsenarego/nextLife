"use client";
import { addBusiness, getBusinesses } from "@/clientActions/businessActions";
import InputForm from "@/components/ui/Wrappers/InputForm";
import SelectForm from "@/components/ui/Wrappers/SelectForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { P } from "@/components/ui/p";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import { queryKeys } from "@/constants/queryKeys";
import useScreenSize from "@/hooks/useScreenSize";
import { AddBusiness, addBusinessSchema } from "@/zodSchema/addBusiness";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
type Props = {
  setOpen: (open: boolean) => void;
};
const BusinessForm = ({ setOpen }: Props) => {
  const [hasSpacesOrUpperCase, setHasSpacesOrUpperCase] = useState({
    status: false,
    formatedName: "",
  });
  const isSmallScreen = useScreenSize();
  const form = useForm<AddBusiness>({
    resolver: zodResolver(addBusinessSchema),
  });

  const newBusiness = form.watch("businessName") || "";

  useEffect(() => {
    const hasSpaces = newBusiness.includes(" ");

    const hasUpperCase = /[A-Z]/.test(newBusiness);
    if (hasSpaces || hasUpperCase) {
      const formattedBusinessName = newBusiness
        .toLowerCase()
        .replace(/\s+/g, "-");
      setHasSpacesOrUpperCase({
        status: true,
        formatedName: formattedBusinessName,
      });
    } else {
      setHasSpacesOrUpperCase({ status: false, formatedName: newBusiness });
    }
  }, [newBusiness]);

  const { refetch } = useQuery({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });

  const { mutate: addBusinessMutation, isPending } = useMutation({
    mutationFn: addBusiness,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {},
    onSettled: async () => {
      refetch();
      setOpen(false);
      form.reset();
    },
  });

  function onSubmit(data: AddBusiness) {
    addBusinessMutation({
      businessName: hasSpacesOrUpperCase.status
        ? hasSpacesOrUpperCase.formatedName
        : data.businessName,
      type: data.type,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-4 flex-col"
      >
        <InputForm
          placeholder="Name of business"
          name="businessName"
          control={form.control}
        />
        {hasSpacesOrUpperCase.status !== false && (
          <P className="text-green-600">
            Your business name will be turned into{" "}
            {hasSpacesOrUpperCase.formatedName}
          </P>
        )}
        <div className="w-full">
          <SelectForm
            label="Type Business"
            name="type"
            description={isSmallScreen ? undefined : "Category of the expense"}
            control={form.control}
            options={defaultBusiness}
          />
        </div>
        <Button isLoading={isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default BusinessForm;
