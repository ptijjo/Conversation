import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conversation",
  description: "Echange et discussion entre amis(es)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className='flex flex-col justify-center items-center max-w-7xl min-h-dvh m-auto border bg-fond'>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>

  );
}
