export const metadata = {
  title: "Privacy Policy - FLOZABLE",
  description:
    "Read the privacy policy of FLOZABLE to understand how we collect, use, and protect your personal information. Learn about your rights and how we safeguard your data.",
  openGraph: {
    type: "website",
    url: "https://flozable.com/privacy",
    title: "Privacy Policy - FLOZABLE",
    description:
      "Read the privacy policy of FLOZABLE to understand how we collect, use, and protect your personal information. Learn about your rights and how we safeguard your data.",
    images: [
      {
        url: "https://flozable.com/favicon.ico",
        width: 800,
        height: 600,
        alt: "Privacy Policy - FLOZABLE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    url: "https://flozable.com/privacy",
    title: "Privacy Policy - FLOZABLE",
    description:
      "Read the privacy policy of FLOZABLE to understand how we collect, use, and protect your personal information. Learn about your rights and how we safeguard your data.",
    images: ["https://flozable.com/favicon.ico"],
  },
  keywords: [
    "privacy policy",
    "personal information protection",
    "data usage",
    "user rights",
    "FLOZABLE privacy",
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
