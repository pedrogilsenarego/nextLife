"use client";

import { queryKeys } from "@/constants/queryKeys";
import { getUserData } from "@/server/userAction";
import { UserQuery } from "@/types/userTypes";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const userQuery = useQuery<UserQuery, Error>({
    queryKey: [queryKeys.user],
    queryFn: getUserData,
  });
  const user = userQuery.data;
  return { user, userQuery };
};

export default useUser;
