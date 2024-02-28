import FilterData from "@/modules/BusinessSettings/FilterData";

type LayoutProps = {
  params: {
    slug: string;
    business: string;
  };
};
export default async function ({ params }: LayoutProps) {
  return (
    <div>
      <FilterData />
    </div>
  );
}
