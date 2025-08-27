export const metadata = {
  title: "Themes - FLOZABLE",
  description:
    "Personalize your FLOZABLE experience with custom themes. Choose colors, layouts, and styles that match your study vibe.",
  openGraph: {
    type: "website",
    url: "https://flozable.com/dashboard/themes",
    title: "Themes - FLOZABLE",
    description:
      "Personalize your FLOZABLE experience with custom themes. Choose colors, layouts, and styles that match your study vibe.",
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
    url: "https://flozable.com/dashboard/themes",
    title: "Themes - FLOZABLE",
    description:
      "Personalize your FLOZABLE experience with custom themes. Choose colors, layouts, and styles that match your study vibe.",
    images: ["https://flozable.com/favicon.ico"],
  },
  keywords: [
    "study themes",
    "personalization",
    "custom layouts",
    "FLOZABLE themes",
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "https://flozable.com/favicon.ico",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
