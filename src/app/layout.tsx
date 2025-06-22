import { Inter, Roboto } from "next/font/google";

import "./globals.css";

import AccountModal from "@/components/modals/AccountModal";
import { AppContainer } from "@/components/structure/Providers";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "react-calendar-heatmap/dist/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import "react-vertical-timeline-component/style.min.css";
import "react-loading-skeleton/dist/skeleton.css";

import PlanModal from "@/components/modals/PlanModal";

//import "@schedule-x/theme-default/dist/index.css";
import "@schedule-x/theme-shadcn/dist/index.css";

import ChatModal from "@/components/modals/ChatModal";
import CreateGroupModal from "@/components/modals/CreateGroupModal";
import JoinGroupModal from "@/components/modals/JoinGroupModal";
import WelcomeModal from "@/components/modals/WelcomeModal";
import config from "@/lib/config";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "FLOZABLE",
  description:
    "Stay organized and track your progress with the FLOZABLE. Monitor study hours, view achievements, and plan your study sessions efficiently.",
  openGraph: {
    type: "website",
    url: "https://flozable.com",
    title: "FLOZABLE",
    description:
      "Stay organized and track your progress with the FLOZABLE. Monitor study hours, view achievements, and plan your study sessions efficiently.",
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
    url: "https://flozable.com",
    title: "FLOZABLE",
    description:
      "Stay organized and track your progress with the FLOZABLE. Monitor study hours, view achievements, and plan your study sessions efficiently.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${roboto.variable}`}>
        <Suspense>
          <AppContainer>
            <AccountModal />
            <PlanModal />
            <JoinGroupModal />
            <CreateGroupModal />
            <ChatModal />
            <WelcomeModal />
            {children}
          </AppContainer>
          <Toaster />
        </Suspense>
      </body>
      {!!config.google_analytics_id &&
        process.env.NODE_ENV === "production" && (
          <GoogleAnalytics gaId={config.google_analytics_id} />
        )}
    </html>
  );
}
