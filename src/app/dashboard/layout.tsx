import Header from "@/components/structure/Header";
import SidebarWrapper from "@/components/structure/Sidebar";
import { cn } from "@/utils/tools";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        "mx-auto min-h-[100vh] flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 md:flex-row dark:border-neutral-700 dark:bg-neutral-800"
      )}
    >
      <SidebarWrapper />
      <div className="relative w-full min-h-[100vh]">
        <Header />
        {children}
      </div>
    </div>
  );
}
