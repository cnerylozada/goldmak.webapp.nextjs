import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "@/modules/ReactQueryClientProvider";
import { Navbar } from "@/modules/cross/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <Navbar />
          <div className="mx-auto w-[600px]">{children}</div>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
