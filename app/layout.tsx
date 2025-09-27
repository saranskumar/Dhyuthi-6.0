import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Fotter } from "@/components/Fotter";
import VantaWavesBackground from "@/components/VantaWavesBackground";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dhyuthi 6.0",
  description: "Official website for Dhyuthi 6.0 IEEESCTSB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ position: "relative", minHeight: "100vh" }}>
  <VantaWavesBackground />
  <Navbar />
  <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
  <Fotter />
</body>

    </html>
  );
}
