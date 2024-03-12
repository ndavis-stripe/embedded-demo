import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Embedded Components Demo",
  description: "Demo of Stripe Embedded Components in a Next.js app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
