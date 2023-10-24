"use client";
import { AuthContextProvider } from "@/components/context/auth-context";
import "./globals.css";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import QueryClientContext from "@/components/context/query-context";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader />
        <QueryClientContext>
          <AuthContextProvider>
            <div className="w-screen h-screen">{children}</div>
          </AuthContextProvider>
        </QueryClientContext>
        <Toaster />
      </body>
    </html>
  );
}
