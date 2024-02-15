import Footer from "@/components/LayoutComponents/Footer";
import Header from "@/components/LayoutComponents/Header";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { GeistSans } from "geist/font/sans";
import { headers } from "next/headers";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const heads = headers();

  const pathname = heads.get("next-url");
  const isHomePage = pathname === "/";

  return (
    <>
      <html lang="en" className={GeistSans.className}>
        <body className="bg-background text-foreground">
          <main className="min-h-screen flex flex-col items-center">
            <ReactQueryProvider>
              <div className="flex-1 w-full  flex flex-col gap-20 items-center">
                {!isHomePage && <Header />}
                {children}
                {!isHomePage && <Footer />}
              </div>
            </ReactQueryProvider>
          </main>
          <Toaster />
        </body>
      </html>
    </>
  );
}
