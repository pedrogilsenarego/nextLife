import { queryKeys } from "@/constants/queryKeys";
import { getBusinesses } from "@/server/businessActions";
import { useQuery } from "@tanstack/react-query";

export function useGetBusinesses() {
  return useQuery({
    queryFn: async () => getBusinesses(),
    queryKey: [queryKeys.businesses],
  });
}
