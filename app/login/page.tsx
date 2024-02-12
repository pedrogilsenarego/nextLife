import { Card } from "@/components/ui/card";
import LoginPage from "@/modules/LoginPage";

import { redirect } from "next/navigation";

export default function Login() {
  const signUp = async () => {
    "use server";
    redirect("/signup");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Card className="flex flex-col p-4 justify-center">
        <LoginPage />
      </Card>
    </div>
  );
}
