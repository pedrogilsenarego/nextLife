"use client";

import { P } from "@/components/ui/p";
import { ROUTE_PATHS } from "@/constants/routes";
import { useRouter } from "next/navigation";

const NewUserLink = () => {
  const router = useRouter();
  return (
    <p
      className="mt-2 text-sm text-center"
      style={{ cursor: "pointer" }}
      onClick={() => router.push(ROUTE_PATHS.SIGNUP)}
    >
      If you are a new user <b>click here</b>
    </p>
  );
};

export default NewUserLink;
