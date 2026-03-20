import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aegis AI Red Team | Automated LLM Safety Testing & Compliance",
  description: "Secure AI before it speaks. Aegis helps businesses test, audit, and protect AI chatbots from prompt injection, data leakage, and harmful outputs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col selection:bg-primary/30 selection:text-white`}>
        <Navbar />
        <main className="flex-1 flex flex-col pt-[72px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
