//import Header from "@/components/structure/Header";
import WelcomeModal from "@/components/modals/WelcomeModal";
import AppSidebar from "@/components/sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

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
    <div className="flex w-screen dark:border-neutral-700 dark:bg-neutral-800 overflow-x-hidden">
      {/* <SidebarWrapper /> */}
      <SidebarProvider defaultOpen={false}>
        <WelcomeModal />

        <AppSidebar />
        <div>
          <div style={{ width: `calc(100vw - 4rem)` }}>{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
}
