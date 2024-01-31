"use client";

import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import CardHeader from "./CardHeader";

import Card from "@/components/UI/Card";
import { getBusinesses } from "@/server/businessActions";
export default function () {
  const { data: businesses } = useQuery({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });
  if (!businesses) return null;

  return (
    <>
      <Card>
        <CardHeader businesses={businesses} />
      </Card>
    </>
  );
}
