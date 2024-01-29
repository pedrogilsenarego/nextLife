import Card from "@/components/UI/Card";
import { getBusinesses } from "@/server/businessActions";
import CardHeader from "./CardHeader";

export default async function () {
  const businesses = await getBusinesses();

  return (
    <>
      <Card>
        <CardHeader businesses={businesses} />
      </Card>
    </>
  );
}
