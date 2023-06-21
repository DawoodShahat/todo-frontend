"use client"
import AuthProvider from "@/contexts/auth-context";
import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} todos-container`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
