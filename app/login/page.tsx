import { Card } from "@/components/ui/card";
import LoginPage from "@/modules/LoginPage";

export default function Login() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Card className="flex flex-col p-4 justify-center">
        <LoginPage />
      </Card>
    </div>
  );
}
