"use client"
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter=Inter({
  subsets:["latin"]
})

const metadata = {
  title: 'WhatTo? - Make Better Decisions',
  description: 'Create and vote on lists for anything',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} `}
      >
        <SessionProvider>
        <Navbar/>
        {children}
      </SessionProvider>
      </body>
    </html>
  );
}
