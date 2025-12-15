import type { NextConfig } from "next";
import dotenv from "dotenv";


dotenv.config({ path: "../.env" }); // manually load env file

const nextConfig: NextConfig = {
  /* config options here */
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:3001/:path*", // proxy backend
  //     },
  //   ];
  // },
  allowedDevOrigins: [
    "*.discordsays.com", // allow Discord Activity iframe
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self' https://*.discord.com" },
        ],
      },
    ];
  }, experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
