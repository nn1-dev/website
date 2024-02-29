import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "Northamptonshire Dev Club",
  description: "Northamptonshire Dev Club",
  metadataBase: new URL("https://nn1.dev"),
  openGraph: {
    images: "/og.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-zinc-900">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
