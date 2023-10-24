import SideBar from "@/components/layouts/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inquiro",
  description: "Inquiro Text-to-SQL Solution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen">
      <div className="flex h-full">
        <SideBar />
        <div className="h-auto w-full bg-white rounded-3xl m-4 ml-0 overflow-clip">
          {children}
        </div>
      </div>
    </div>
  );
}
