//import Header from "@/components/structure/Header";
import AppSidebar from "@/components/sidebar/AppSidebar";
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Dashboard - FLOZABLE",
  description:
    "Stay organized and track your progress with the FLOZABLE Dashboard. Monitor study hours, view achievements, and plan your study sessions efficiently.",
  openGraph: {
    type: "website",
    url: "https://flozable.com/dashboard",
    title: "Dashboard - FLOZABLE",
    description:
      "Stay organized and track your progress with the FLOZABLE Dashboard. Monitor study hours, view achievements, and plan your study sessions efficiently.",
    images: [
      {
        url: "https://flozable.com/favicon.ico",
        width: 800,
        height: 600,
        alt: "FLOZABLE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    url: "https://flozable.com/dashboard",
    title: "Dashboard - FLOZABLE",
    description:
      "Stay organized and track your progress with the FLOZABLE Dashboard. Monitor study hours, view achievements, and plan your study sessions efficiently.",
    images: ["https://flozable.com/favicon.ico"],
  },
  keywords: [
    "progress tracking",
    "study achievements",
    "study sessions planning",
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "https://flozable.com/favicon.ico",
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-[100vh] w-screen overflow-hidden dark:border-neutral-700 dark:bg-neutral-800">
      {/* <SidebarWrapper /> */}
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <div>
          <div
            className={cn(/* `w-[calc(100vw - 2rem)]` */)}
            style={{ width: `calc(100vw - 4rem)` }}
          >
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
