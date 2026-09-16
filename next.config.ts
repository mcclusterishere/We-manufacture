import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/assembly", destination: "/build", permanent: false },
      { source: "/program", destination: "/build", permanent: false },
      { source: "/connected", destination: "/platform", permanent: false },
    ];
  },
};

export default nextConfig;
