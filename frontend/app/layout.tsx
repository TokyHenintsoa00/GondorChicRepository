import type { Metadata } from "next";
import { Cinzel_Decorative } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel_Decorative({
  weight: ["400", "700", "900"],
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gondor Chic",
  description: "Connexion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cinzel.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
