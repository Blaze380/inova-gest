import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactElement } from "react";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";

const robotoLight: NextFontWithVariable = localFont({
  src: "./fonts/Roboto-Light.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "InovaGest | Inovação e Gestão",
  description: "InovaGest é uma plataforma de gestão de imóveis para empresas. ",
};

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <html lang="pt_PT">
      <body
        className={`${ robotoLight.variable } antialiased w-[100vw] h-[100vh]  selection:text-fg-dark dark:selection:text-fg  selection:bg-bg-dark dark:selection:bg-bg `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
