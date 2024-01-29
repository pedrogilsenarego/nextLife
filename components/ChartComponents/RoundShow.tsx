type Props = {
  value: number;
};

export default async function Ball({ value }: Props) {
  return (
    <div className="flex items-center justify-center w-60 h-60 bg-green-400 rounded-full">
      <div className="flex items-center justify-center w-40 h-40 bg-white rounded-full">
        <h1 className="text-xl font-semibold">{value}</h1>
      </div>
    </div>
  );
}
