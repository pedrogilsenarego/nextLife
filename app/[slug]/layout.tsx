"use server";
import AuthButton from "@/components/AuthButton";

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
      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href=""
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            SenaRego
          </a>
        </p>
      </footer>
    </div>
  );
}
