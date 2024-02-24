import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import Navbar from "./navbar/page";
import Footer from "./footer/page";
import AuthProvider from "@/providers/authProvider";
import {Fredoka} from "@next/font/google"


const fredoka = Fredoka({ subsets: ["latin"], weight: ['400'] });

export const metadata: Metadata = {
  title: "SD Blog",
  description: "For creating blogs",
  icons:{
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fredoka.className}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
