import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Write Away by Dr.J",
  description: "AI-powered dissertation feedback and academic writing support.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
