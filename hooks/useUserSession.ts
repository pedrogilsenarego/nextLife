"use client";

import { getUserSession } from "@/clientActions/userAction";
import { queryKeys } from "@/constants/queryKeys";

import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

const useUserSession = () => {
  const userSessionQuery = useQuery<User, Error>({
    queryKey: [queryKeys.userSession],
    queryFn: getUserSession,
  });
  const userSession = userSessionQuery.data;
  return { userSession, userSessionQuery };
};

export default useUserSession;
