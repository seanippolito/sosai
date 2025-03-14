import type { Metadata } from "next";
import { inter, geistSans, geistMono, lusitana } from '@/app/ui/fonts'
import "@/app/ui/globals.scss";


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
        className={`${lusitana.className} ${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
