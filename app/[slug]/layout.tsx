"use server";
import AuthButton from "@/components/AuthButton";
import Footer from "@/components/LayoutComponents/Footer";
import Header from "@/components/LayoutComponents/Header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 w-full  flex flex-col gap-20 items-center">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
