import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-**" },
      { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/wikipedia/commons/thumb/**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
