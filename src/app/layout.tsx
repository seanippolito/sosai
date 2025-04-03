import type { Metadata } from "next";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { inter, geistSans, geistMono, lusitana } from "@/components/ui/fonts";
import HeaderAuth from "@/components/header-auth";
import "@/components/ui/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "SoSAI",
  description: "AI image generator tool",
};

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lusitana.className} ${inter.className} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-background text-primary-100 text-p1 antialiased">
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
            <Toaster position="top-center" />
            <div className="relative flex w-full flex-1 flex-col items-center gap-20 border-10 border-green-400">
              {children}
            </div>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
