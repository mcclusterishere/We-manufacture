import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "WE Manufacture",
    template: "%s · WE Manufacture",
  },
  description:
    "WE 125. A city motorcycle assembled in America. Connected from day one. Get on the list.",
  openGraph: {
    title: "WE Manufacture",
    description:
      "WE 125. A city motorcycle assembled in America. Connected from day one.",
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
