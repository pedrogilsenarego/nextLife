"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { H2 } from "@/components/ui/h2";
import { P } from "@/components/ui/p";
import { Delicious_Handrawn } from "next/font/google";

const delicious = Delicious_Handrawn({ weight: "400", subsets: ["latin"] });

const DangerZone = () => {
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
          <Button variant={"destructive"}>Delete this Business</Button>
        </div>
      </Card>
    </div>
  );
};

export default DangerZone;
