export const metadata = {
  title: "Cookie Policy - FLOZABLE",
  description:
    "Learn about the cookies used on the FLOZABLE platform. Understand how we use cookies to improve your experience and the options you have to manage them.",
  openGraph: {
    type: "website",
    url: "https://flozable.com/cookies",
    title: "Cookie Policy - FLOZABLE",
    description:
      "Learn about the cookies used on the FLOZABLE platform. Understand how we use cookies to improve your experience and the options you have to manage them.",
    images: [
      {
        url: "https://flozable.com/favicon.ico",
        width: 800,
        height: 600,
        alt: "Cookie Policy - FLOZABLE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    url: "https://flozable.com/cookies",
    title: "Cookie Policy - FLOZABLE",
    description:
      "Learn about the cookies used on the FLOZABLE platform. Understand how we use cookies to improve your experience and the options you have to manage them.",
    images: ["https://flozable.com/favicon.ico"],
  },
  keywords: [
    "cookie policy",
    "FLOZABLE cookies",
    "website cookies",
    "cookies usage",
    "cookie management",
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
  return children;
}
