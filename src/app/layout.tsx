import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Lora } from "next/font/google";
import Footer from "./(components)/footer/Footer";
import Navbar from "./(components)/navbar/Navbar";
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";

const lora = Lora({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Flow Shop",
    absolute: "Flow Shop",
  },
  description: "Flow Shop E-Commerce Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.className} antialiased`}>
        <ReactQueryProvider>
          <Navbar />
          {children}
          <Footer />
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
