"use client";

import { Card } from "@/components/ui/card";
import { H2 } from "@/components/ui/h2";
import { P } from "@/components/ui/p";
import { ROUTE_PATHS } from "@/constants/routes";
import useBusinesses from "@/hooks/useBusinesses";
import useUser from "@/hooks/useUser";
import { Delicious_Handrawn } from "next/font/google";
import { useRouter } from "next/navigation";
import DeleteButton from "./DeleteButton";

const delicious = Delicious_Handrawn({ weight: "400", subsets: ["latin"] });

type Props = {
  params: {
    slug: string;
    business: string;
  };
};
const DangerZone = ({ params }: Props) => {
  const { user } = useUser();
  const businesses = useBusinesses();
  const router = useRouter();

  if (!user || !businesses) return;

  if (
    user?.username !== params.slug ||
    !businesses?.data?.some(
      (business) => business.businessName === params.business
    )
  ) {
    router.push(ROUTE_PATHS.ACCESS_DENIED);
    return;
  }

  return (
    <div className="gap-2 flex flex-col">
      <H2 className={delicious.className} style={{ color: "orangered" }}>
        Danger zone
      </H2>
      <Card style={{ borderColor: "orangered" }}>
        <div className="p-3 flex justify-between gap-4 items-center">
          <div>
            <P className="font-bold">Delete this business</P>
            <P>
              Once you delete a business, there is no going back. Please be
              certain.
            </P>
          </div>
          <DeleteButton params={params} />
        </div>
      </Card>
    </div>
  );
};

export default DangerZone;
