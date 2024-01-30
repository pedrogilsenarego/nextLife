"use client";

import Card from "@/components/UI/Card";
import { useGetBusinesses } from "@/data/get-business";
import CardHeader from "./CardHeader";

export default function () {
  const { data: businessData, error } = useGetBusinesses();
  if (error) return error.message;
  if (!businessData) return;
  return (
    <>
      <Card>
        <CardHeader businesses={businessData} />
      </Card>
    </>
  );
}
