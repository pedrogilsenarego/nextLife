import { Card } from "@/components/ui/card";
import SignupPage from "@/modules/SignupPage";

export default function Signup() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Card className="flex flex-col py-10 justify-center px-10">
        <SignupPage />
      </Card>
    </div>
  );
}
