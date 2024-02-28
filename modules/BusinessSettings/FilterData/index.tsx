"use client";

import { Card } from "@/components/ui/card";
import { H2 } from "@/components/ui/h2";
import { P } from "@/components/ui/p";
import useBusinesses from "@/hooks/useBusinesses";

const FilterData = () => {
  const businesses = useBusinesses();
  return (
    <div className="gap-2 flex flex-col">
      <H2>FilterData</H2>
      <Card>
        <div className="p-3 flex justify-between gap-4 items-center">
          <div>
            <P className="font-bold">Filter your business data</P>
            {businesses.data?.map((business) => {
              return (
                <Card className="p-2" key={business.id}>
                  <P className="capitalize font-bold">
                    {business.businessName}
                  </P>
                </Card>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FilterData;
