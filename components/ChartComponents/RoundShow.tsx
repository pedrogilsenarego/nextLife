type Props = {
  value: number;
  currency?: string;
};

export default async function Ball({ value, currency }: Props) {
  const red = 20;
  const green = 80;
  const gradientStyle = {
    background: `conic-gradient(from 0deg, red 0%, red ${red}%, green ${red}%, green ${green}%)`,
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
