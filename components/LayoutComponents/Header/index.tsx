"use client";

import { getUserSession, userLogout } from "@/clientActions/userAction";
import { Button } from "@/components/ui/button";
import useScreenSize from "@/hooks/useScreenSize";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";

type Props = {
  darkMode?: boolean;
  initial?: boolean;
};

const Header = ({ darkMode, initial }: Props) => {
  const { isSmallScreen } = useScreenSize();

  const router = useRouter();
  const { user } = useUser();
  if (isSmallScreen && !initial) return;
  const handleLogout = async () => {
    await userLogout();
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <nav
      style={{ borderBottomColor: darkMode ? "#ffffff1A" : undefined }}
      className={
        initial
          ? "w-full flex justify-center border-b border-b-foreground/10 h-16"
          : "w-full flex justify-center border-b border-b-foreground/10 h-16 z-20"
      }
    >
      <div className="w-full max-w-screen-2xl flex justify-end items-center p-3 text-sm">
        {user ? (
          <div
            style={{
              color: darkMode ? "#ffffff66" : undefined,
            }}
            className="flex items-center gap-4 "
          >
            Hey, {user.email}!
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
