import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Sidebar, MobileNav } from "@/components/layout/sidebar";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rovato Analytics — Dashboard",
  description:
    "Dashboard analitica per il Comune di Rovato: dati demografici, elettorali e amministrativi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${geistSans.variable} h-full antialiased`}>
      <body className="h-full font-sans">
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 flex flex-col min-h-0 overflow-auto">
            <MobileNav />
            <main className="flex-1 p-4 md:p-8 bg-muted/30">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
