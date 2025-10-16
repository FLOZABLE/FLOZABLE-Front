import config from "@/lib/config";
import bundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("http://localhost:3000/**"),
      new URL("https://localhost:3000/**"),
      new URL("https://api.flozable.com/**"),
      new URL("http://api.localhost/**"),
      new URL("https://img.youtube.com/**"),
    ],
  },
  async headers() {
    return [
      {
        source: "/profile-images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600", // Cache for 1 hour
          },
        ],
      },
    ];
  }
};

const withBundleAnalyzer = bundleAnalyzer({ enabled: config.analyze });

export default withBundleAnalyzer(nextConfig);
