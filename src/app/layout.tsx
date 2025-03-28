import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { inter, geistSans, geistMono, lusitana } from '@/components/ui/fonts'
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import "@/components/ui/globals.css";

export const metadata: Metadata = {
  title: "SoSAI",
  description: "AI image generator tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lusitana.className} ${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased bg-background text-primary-100 text-p1`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <header className="relative flex top-0 left-0 border-b-1 border-b-gray-800 h-16 z-1">
              <nav className="w-full fixed">
                <div className="w-full flex justify-between items-center p-2 text-lg">
                  <div className="flex gap-5 items-center font-semibold  text-foreground">
                    <Link href={"/"}>
                      <div className="text-4xl text-blue-500">SȯSAi</div>
                    </Link>
                  </div>
                  <HeaderAuth />
                </div>
              </nav>
            </header>
            <div className="relative flex-1 w-full flex flex-col gap-20 items-center border-10 border-red-800 ">
              <div className="flex flex-col gap-20 max-w-5xl p-5">
                {children}
              </div>
            </div>
            <footer className="relative w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16 border-10 border-green-800">
              <p>
                Powered by{" "}
                <a
                  href="/"
                  target="_blank"
                  className="font-bold hover:underline"
                  rel="noreferrer"
                >
                  SȯSAi
                </a>
              </p>
              <ThemeSwitcher />
            </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
