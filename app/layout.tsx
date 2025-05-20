import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DollarSign, Plus, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import type { ReactNode } from "react";
import Link from "next/link";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "FinanceHelper",
  description: "Manage your money wisely with FinanceHelper",
};

// ✅ SocialLinks
function SocialLinks() {
  return (
    <>
      <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon">
          <Github className="h-4 w-4" />
          <span className="sr-only">GitHub</span>
        </Button>
      </Link>
      <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon">
          <Linkedin className="h-4 w-4" />
          <span className="sr-only">LinkedIn</span>
        </Button>
      </Link>
      <Link href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon">
          <Twitter className="h-4 w-4" />
          <span className="sr-only">Twitter</span>
        </Button>
      </Link>
    </>
  );
}

// ✅ Header
function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <DollarSign className="h-6 w-6 text-emerald-500" />
        <h1 className="text-lg font-semibold">FinanceHelper</h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="outline" size="sm">
          Settings
        </Button>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Account
        </Button>
      </div>
    </header>
  );
}

// ✅ Footer
function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-gray-500 md:text-left dark:text-gray-400">
          © 2024 CloudFlexIt. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}

// ✅ Root Layout
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
