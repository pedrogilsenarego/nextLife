type Props = {
  children: React.ReactNode;
};

export default function ({ children }: Props) {
  return (
    <div
      className="w-full max-w-6xl flex bg-white items-center p-3 rounded-md"
      style={{ boxShadow: "0 0 20px 2px rgba(0, 0, 0, 0.15)" }}
    >
      {children}
    </div>
  );
}
