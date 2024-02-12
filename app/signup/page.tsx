import { Card } from "@/components/ui/card";
import SignupPage from "@/modules/SignupPage";

export default function Signup() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Card className="flex flex-col p-4 justify-center">
        <SignupPage />
      </Card>
    </div>
  );
}
