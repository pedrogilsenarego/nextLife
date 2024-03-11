import { Card } from "@/components/ui/card";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

type Props = {
  balance: number;
  title: string;
  type: string;
  setOpenBusiness: (openBusiness: boolean) => void;
};

const BusinessCard = ({ balance, title, type, setOpenBusiness }: Props) => {
  return (
    <Card
      onClick={() => setOpenBusiness(true)}
      className="p-3 rounded-none shadow-md flex justify-between"
    >
      <div>
        <p className="font-bold capitalize text-lg">{title}</p>
        <p className="text-sm">{type}</p>
        <p style={{ color: "grey" }} className="text-xs mt-2">
          Available balance
        </p>
      </div>
      <div className="flex flex-col justify-between items-end ">
        <GitHubLogoIcon
          style={{ width: "30px", height: "30px", color: "orangered" }}
        />
        <p style={{ lineHeight: "16px" }} className="font-bold text-lg">
          {balance.toFixed(1)} €
        </p>
      </div>
    </Card>
  );
};

export default BusinessCard;
