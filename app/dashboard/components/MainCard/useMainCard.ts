"use client";

import { queryKeys } from "@/constants/queryKeys";
import { getBusinesses } from "@/server/businessActions";
import { useQuery } from "@tanstack/react-query";

const useMainCard = () => {
  const { data: businesses } = useQuery({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });

  return {
    businesses,
  };
};

export default useMainCard;
