import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Northamptonshire Dev Meetup",
  description: "Northamptonshire Dev Meetup",
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
    <html lang="en" className="bg-zinc-900">
      <body className={inter.className}>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
