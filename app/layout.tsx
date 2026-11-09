import type { Metadata } from "next";
import { Manrope, Rubik } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const display = Rubik({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-unbounded",
  weight: ["700", "800"],
});
const body = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Scrimmage — Сургууль хоорондын нөхөрсөг тоглолт",
  description: "Сургуулийнхаа багт тохирох өрсөлдөгч болон заалыг хурдан ол.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn" className={`${display.variable} ${body.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}