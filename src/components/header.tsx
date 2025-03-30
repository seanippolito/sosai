"use client";
import type { Metadata } from "next";
import Link from "next/link";
import "@/components/ui/globals.css";

export const metadata: Metadata = {
  title: "SoSAI",
  description: "AI image generator tool",
};

export default function Header({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <header className="relative top-0 left-0 z-1 flex h-16 border-b-1 border-b-gray-800">
      <nav className="fixed w-full">
        <div className="flex w-full items-center justify-between p-2 text-lg">
          <div className="text-foreground flex items-center gap-5 font-semibold">
            <Link href={"/"}>
              <div className="text-4xl text-blue-500">SȯSAi</div>
            </Link>
          </div>
          {children}
        </div>
      </nav>
    </header>
  );
}
