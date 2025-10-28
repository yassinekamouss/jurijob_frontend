import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JuriJob — Plateforme de carrières juridiques au Maroc",
  description:
    "La plateforme qui connecte diplômés en droit et recruteurs au Maroc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {children}

             <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                fontSize: "0.95rem",
                background: "#fff",
                color: "#333",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              },
              success: {
                iconTheme: {
                  primary: "#16a34a", // vert
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#dc2626", // rouge
                  secondary: "#fff",
                },
              },
            }}
          />
          
        </AuthProvider>
      </body>
    </html>
  );
}
