import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { inter, geistSans, geistMono, lusitana } from "@/components/ui/fonts";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import "@/components/ui/globals.css";
import Header from "@/components/header";

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
        className={`${lusitana.className} ${inter.className} ${geistSans.variable} ${geistMono.variable} bg-background text-primary-100 text-p1 antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="overflow-auto">
            <Header>
              <HeaderAuth />
            </Header>
            <div className="relative flex w-full flex-1 flex-col items-center gap-20 border-10 border-red-800">
              <div className="flex max-w-5xl flex-col gap-20 p-5">
                {children}
              </div>
            </div>
            <footer className="relative mx-auto flex w-full items-center justify-center gap-8 border-10 border-t border-green-800 py-16 text-center text-xs">
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
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
