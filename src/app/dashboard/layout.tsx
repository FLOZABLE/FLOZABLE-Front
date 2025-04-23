import Header from "@/components/structure/Header";
import SidebarWrapper from "@/components/structure/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-[100vh] overflow-hidden w-full dark:border-neutral-700 dark:bg-neutral-800">
      <SidebarWrapper />
      <div className="relative w-full overflow-auto">
        <Header />
        {children}
      </div>
    </div>
  );
}
