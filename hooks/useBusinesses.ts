"use client";

import { queryKeys } from "@/constants/queryKeys";
import { getBusinesses } from "@/server/businessActions";
import { BusinessesQuery } from "@/types/businessTypes";
import { useQuery } from "@tanstack/react-query";

const useBusinesses = () => {
  const expenses = useQuery<BusinessesQuery, Error>({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });
  return expenses;
};

export default useBusinesses;
