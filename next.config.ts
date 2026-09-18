import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const staticExport = process.env.PAGES_EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  ...(staticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        async redirects() {
          return [
            { source: "/assembly", destination: "/build", permanent: false },
            { source: "/program", destination: "/build", permanent: false },
            { source: "/connected", destination: "/platform", permanent: false },
          ];
        },
      }),
};

export default nextConfig;
