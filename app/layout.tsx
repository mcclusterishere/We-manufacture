import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://whipequipped.com"),
  title: {
    default: "Whip Equipped",
    template: "%s · Whip Equipped",
  },
  description:
    "Connected mobility, vehicle intelligence, human-autonomy systems, fleet operations, and a path to U.S. motorcycle assembly.",
  openGraph: {
    title: "Whip Equipped",
    description:
      "A connected mobility platform spanning the vehicle, sensing, secure communications, fleet operations, autonomy research, and manufacturing.",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/brand/we-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Syne:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-fg">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
