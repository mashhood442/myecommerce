"use client"; 

import { CartProvider } from "./components/context/CartContext"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/nav";
import Footer from "./components/footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <main className="min-h-screen bg-gray-100">
            <Navbar />
            <div>{children}</div>
            <Footer />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
