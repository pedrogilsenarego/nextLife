"use client";

import { getBusinesses } from "@/clientActions/businessActions";
import { queryKeys } from "@/constants/queryKeys";
import { Business, BusinessesQuery } from "@/types/businessTypes";
import { useQuery } from "@tanstack/react-query";

const useBusinesses = () => {
  const businesses = useQuery<BusinessesQuery, Error>({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });

  const onlyBalanceIds =
    businesses?.data
      ?.filter(
        (business: Business) =>
          business.settings?.filters?.balanceStatus === true
      )
      .map((business: Business) => business.id) ?? [];

  return { businesses, onlyBalanceIds };
};

export default useBusinesses;
