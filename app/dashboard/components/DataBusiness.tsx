import { getBusinesses } from "@/server/businessActions";
import MainCard from "./MainCard";

export default async function MainCardInitialData({ children }: any) {
  const businessData = await getBusinesses();

  return <MainCard businessData={businessData}>{children}</MainCard>;
}
