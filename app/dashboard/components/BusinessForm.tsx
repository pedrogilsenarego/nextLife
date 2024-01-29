"use client";
import { Input } from "@/components/UI/Input";
import { addBusinessSchema } from "@/zodSchema/addBusiness";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const BusinessForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(addBusinessSchema),
  });
  return (
    <>
      <Input placeholder="Name" />
    </>
  );
};

export default BusinessForm;
