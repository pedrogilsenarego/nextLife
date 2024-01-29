type Props = {
  value: number;
  currency?: string;
  percentage?: number;
};

export default async function Ball({ value, currency, percentage = 0 }: Props) {
  const gradientStyle = {
    background: `conic-gradient(from 0deg, red 0%, red ${percentage}%, green ${percentage}%, green ${
      100 - percentage
    }%)`,
  };
  return (
    <div
      className="flex items-center justify-center w-48 h-48 rounded-full"
      style={gradientStyle}
    >
      <div className="flex items-center justify-center w-40 h-40 bg-white rounded-full">
        <p className="text-lg font-semibold">
          {currency}
          {value}
        </p>
      </div>
    </div>
  );
}
