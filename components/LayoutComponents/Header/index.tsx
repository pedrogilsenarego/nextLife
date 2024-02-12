"use client";

import { getUserSession, userLogout } from "@/clientActions/userAction";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  darkMode?: boolean;
};

const Header = ({ darkMode }: Props) => {
  const router = useRouter();
  const [session, setSession] = useState<null | User>(null);

  useEffect(() => {
    // Fetch user session when component mounts
    const fetchUserSession = async () => {
      const userSession = await getUserSession();
      setSession(userSession);
    };
    fetchUserSession();
  }, []);

  console.log("userSession", session);

  const handleLogout = async () => {
    await userLogout();
    setSession(null);
    router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <nav
      style={{ borderBottomColor: darkMode ? "#ffffff1A" : undefined }}
      className="w-full flex justify-center border-b border-b-foreground/10 h-16"
    >
      <div className="w-full max-w-6xl flex justify-end items-center p-3 text-sm">
        {session ? (
          <div
            style={{
              color: darkMode ? "#ffffff66" : undefined,
            }}
            className="flex items-center gap-4 "
          >
            Hey, {session.email}!
            {darkMode ? (
              <Button
                style={{
                  color: "black",
                  backgroundColor: "#E4E4E7",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button onClick={handleLogout}>Logout</Button>
            )}
          </div>
        ) : (
          <Button
            style={{
              color: darkMode ? "black" : undefined,
              backgroundColor: darkMode ? "#E4E4E7" : undefined,
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Header;
