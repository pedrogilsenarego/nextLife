import { Card } from "@/components/ui/card";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const BusinessCard = () => {
  return (
    <Card className="p-2  rounded-none shadow-sm flex justify-between">
      <div>
        <p className="font-bold">Title of Business</p>
        <p className="text-sm">Unipessoal</p>
        <p style={{ color: "grey" }} className="text-xs mt-2">
          Available balance
        </p>
      </div>
      <div className="flex flex-col justify-between items-end ">
        <GitHubLogoIcon
          style={{ width: "30px", height: "30px", color: "orangered" }}
        />
        <p style={{ lineHeight: "16px" }} className="font-bold text-lg">
          456,1 €
        </p>
      </div>
    </Card>
  );
};

export default BusinessCard;
