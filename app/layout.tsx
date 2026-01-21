import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- UPDATE THIS SECTION ---
export const metadata: Metadata = {
  // 1. Update the Title
  title: "Cyber Intelligence Academy", 
  
  // 2. Add the Description (optional)
  description: "Official portal for the Cyber Intelligence Academy",
  
  // 3. Add the Logo (Favicon)
  icons: {
    icon: '/logo.png', // This looks for logo.png in your 'public' folder
  },
};
// ---------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}