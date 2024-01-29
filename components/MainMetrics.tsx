import RoundShow from "./ChartComponents/RoundShow";

export default async function () {
  return (
    <div>
      <RoundShow value={4554} currency="$" percentage={23} />
    </div>
  );
}
