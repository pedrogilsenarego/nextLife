import DashBoard from "./components";

type LayoutProps = {
  params: {
    slug: string;
    business: string;
  };
};

export default async function ({ params }: LayoutProps) {
  return <DashBoard params={params} />;
}
