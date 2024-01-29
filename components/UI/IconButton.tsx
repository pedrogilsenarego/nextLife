type Props = {
  children?: React.ReactNode;
};

export default async function ({ children }: Props) {
  return (
    <div className="w-8 h-8 flex bg-slate-400 justify-center rounded-lg items-center cursor-pointer">
      {children ? children : <p className="text-white text-md">+</p>}
    </div>
  );
}
