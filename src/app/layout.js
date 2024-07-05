"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <main className="px-4 max-w-[1200px] m-auto py-4">
          <Toaster/>
        {children}
        </main>
        </body>
    </html>
  );
}
