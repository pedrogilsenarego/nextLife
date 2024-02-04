"use client";

import { queryKeys } from "@/constants/queryKeys";
import { getBusinesses } from "@/server/businessActions";
import { BusinessesQuery } from "@/types/businessTypes";
import { useQuery } from "@tanstack/react-query";

const useBusinesses = () => {
  const businesses = useQuery<BusinessesQuery, Error>({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });
  return businesses;
};

export default useBusinesses;
