"use client";

import Card from "@/components/UI/Card";
import { getBusinesses } from "@/server/businessActions";
import { useQuery } from "@tanstack/react-query";
import CardHeader from "./CardHeader";

export default function ({ businessData }: any) {
  const { data: businessesData, refetch } = useQuery({
    queryKey: ["initial-users"],
    queryFn: () => getBusinesses(),
    initialData: businessData,
    staleTime: 5 * 1000,
  });

  return (
    <>
      <Card>
        <CardHeader businesses={businessesData} refetchBusinessData={refetch} />
      </Card>
    </>
  );
}
