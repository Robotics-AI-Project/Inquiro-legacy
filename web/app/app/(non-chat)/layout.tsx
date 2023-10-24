import Header from "@/components/layouts/non-chat/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <div className="h-full w-full px-8 py-6 overflow-scroll">{children}</div>
    </div>
  );
}
