type Props = {
  value: number;
  currency?: string;
  percentage?: number;
};

export default async function Ball({ value, currency, percentage = 0 }: Props) {
  const greenColor = "green";
  const gradientStyle = {
    background: `conic-gradient(from 0deg, red 0%, red ${percentage}%, ${greenColor} ${percentage}%, ${greenColor} ${
      100 - percentage
    }%)`,
  };
  const textStyle = { color: percentage > 50 ? "red" : "green" };
  return (
    <div
      className="flex items-center justify-center w-48 h-48 rounded-full"
      style={gradientStyle}
    >
      <div className="flex items-center justify-center w-40 h-40 bg-white rounded-full">
        <p className="text-3xl font-semibold" style={textStyle}>
          {currency}
          {value}
        </p>
      </div>
    </div>
  );
}
