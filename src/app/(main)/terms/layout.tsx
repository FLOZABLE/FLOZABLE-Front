export const metadata = {
  title: "Terms and Conditions - FLOZABLE",
  description:
    "Review the terms and conditions of using the FLOZABLE platform. Understand the rules, regulations, and policies that apply to your use of the site and services.",
  openGraph: {
    type: "website",
    url: "https://flozable.com/terms",
    title: "Terms and Conditions - FLOZABLE",
    description:
      "Review the terms and conditions of using the FLOZABLE platform. Understand the rules, regulations, and policies that apply to your use of the site and services.",
    images: [
      {
        url: "https://flozable.com/favicon.ico",
        width: 800,
        height: 600,
        alt: "Terms and Conditions - FLOZABLE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    url: "https://flozable.com/terms",
    title: "Terms and Conditions - FLOZABLE",
    description:
      "Review the terms and conditions of using the FLOZABLE platform. Understand the rules, regulations, and policies that apply to your use of the site and services.",
    images: ["https://flozable.com/favicon.ico"],
  },
  keywords: [
    "terms and conditions",
    "FLOZABLE terms",
    "website usage rules",
    "service policies",
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
