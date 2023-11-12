import { Providers } from "@/components/Providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Dynamic forms with React Hook Form",
 description: "How to make them",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
  <Providers>
   <html className="h-full" lang="en">
    <body className={`${inter.className} h-full`}>{children}</body>
   </html>
  </Providers>
 );
}
