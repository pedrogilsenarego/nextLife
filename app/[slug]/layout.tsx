"use server";
import AuthButton from "@/components/AuthButton";
import Footer from "@/components/LayoutComponents/Footer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 w-full  flex flex-col gap-20 items-center">
      <nav className="w-full  flex justify-center border-b border-b-foreground/10 h-16 ">
        <div className="w-full max-w-screen-2xl flex justify-end items-center p-3 text-sm">
          <AuthButton />
        </div>
      </nav>
      {children}
      <Footer />
    </div>
  );
}
