import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WE Manufacturing | U.S. Site Selection",
  description:
    "WE is evaluating U.S. communities for its first connected small-mobility assembly operation.",
  openGraph: {
    title: "WE Manufacturing | U.S. Site Selection",
    description:
      "A pre-production connected mobility company evaluating its first U.S. assembly location.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
