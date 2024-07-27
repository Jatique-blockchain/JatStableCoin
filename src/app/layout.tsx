import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { headers } from "next/headers";

import Providers from "./providers";

export const metadata: Metadata = {
  title: "JatCoin - The Decentralized Stablecoin of Jatique",
  description: "Discover JatCoin, a decentralized stablecoin backed by the Jatique protocol and governed by the Jatique DAO. Learn how JatCoin brings stability, security, and decentralization to the DeFi ecosystem.",
  keywords: "JatCoin, stablecoin, decentralized finance, DeFi, Jatique protocol, Jatique DAO, cryptocurrency, blockchain, digital currency",
  robots: "index, follow",

  twitter: {
    card: "summary_large_image",
    site: "@JatiqueProtocol",
    title: "JatCoin - The Decentralized Stablecoin of Jatique",
    description: "Discover JatCoin, a decentralized stablecoin backed by the Jatique protocol and governed by the Jatique DAO.",
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = headers().get("cookie");

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers cookie={cookie}>{children}</Providers>
      </body>
    </html>
  );
}
