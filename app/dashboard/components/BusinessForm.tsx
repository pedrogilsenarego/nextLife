"use client";
import { Input } from "@/components/UI/Input";
import { addBusiness } from "@/server/businessActions";
import { createClient } from "@/utils/supabase/server";
import { AddBusiness, addBusinessSchema } from "@/zodSchema/addBusiness";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const BusinessForm = () => {
  const { handleSubmit, control } = useForm<AddBusiness>({
    resolver: zodResolver(addBusinessSchema),
  });

  async function onSubmit(data: AddBusiness) {
    await addBusiness(data.businessName);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 flex-col">
      <Input
        placeholder="Name of business"
        name="businessName"
        control={control}
      />
      <button
        type="submit"
        className="block w-full cursor-pointer rounded bg-rose-500 px-4 py-2 text-center font-semibold text-white hover:bg-rose-400 focus:outline-none focus:ring focus:ring-rose-500 focus:ring-opacity-80 focus:ring-offset-2 disabled:opacity-70"
      >
        Submit
      </button>
    </form>
  );
};

export default BusinessForm;
