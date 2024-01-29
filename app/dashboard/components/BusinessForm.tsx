"use client";
import { Input } from "@/components/UI/Input";
import { addBusiness } from "@/server/businessActions";
import { createClient } from "@/utils/supabase/server";
import { AddBusiness, addBusinessSchema } from "@/zodSchema/addBusiness";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const BusinessForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<AddBusiness>({
    resolver: zodResolver(addBusinessSchema),
  });

  async function onSubmit(data: AddBusiness) {
    console.log("called");
    await addBusiness(data.businessName);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Name of business" />
      <button
        onClick={() => onSubmit({ businessName: "It_freelance" })}
        type="submit"
        className="mt-20 block w-full cursor-pointer rounded bg-rose-500 px-4 py-2 text-center font-semibold text-white hover:bg-rose-400 focus:outline-none focus:ring focus:ring-rose-500 focus:ring-opacity-80 focus:ring-offset-2 disabled:opacity-70"
      >
        Submit
      </button>
    </form>
  );
};

export default BusinessForm;
