"use client";

import { useRouter } from "next/navigation";

const NewUserLink = () => {
  const router = useRouter();
  return (
    <p style={{ cursor: "pointer" }} onClick={() => router.push("/signup")}>
      If you are a new user click here
    </p>
  );
};

export default NewUserLink;
