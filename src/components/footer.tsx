"use client";
import type { Metadata } from "next";
import { ThemeSwitcher } from "@/components/theme-switcher";

export const metadata: Metadata = {
  title: "SoSAI",
  description: "AI image generator tool",
};

export default function Footer() {
  return (
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
  );
}
