import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Metadata, Viewport } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  title: "NextLife",
  description: "Money flow control app",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#f5432b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" className={GeistSans.className}>
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link
            href="/icon-512*512.png"
            sizes="2048x2732"
            rel="apple-touch-startup-image"
          />
          <link
            href="/icon-512*512.png"
            sizes="1668x2224"
            rel="apple-touch-startup-image"
          />
          <link
            href="/icon-512*512.png"
            sizes="1536x2048"
            rel="apple-touch-startup-image"
          />
          <link
            href="/icon-512*512.png"
            sizes="1125x2436"
            rel="apple-touch-startup-image"
          />
          <link
            href="/icon-512*512.png"
            sizes="1242x2208"
            rel="apple-touch-startup-image"
          />
          <link
            href="/icon-512*512.png"
            sizes="750x1334"
            rel="apple-touch-startup-image"
          />
          <link
            href="/icon-512*512.png"
            sizes="640x1136"
            rel="apple-touch-startup-image"
          />
        </head>
        <body className="bg-background text-foreground">
          <main className="min-h-screen flex flex-col items-center">
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </main>
          <Toaster />
        </body>
      </html>
    </>
  );
}
