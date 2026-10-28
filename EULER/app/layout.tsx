import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EULER | Personal AI Command Center",
  description: "A personal AI command center built around useful tools, user-controlled memory, and explicit approvals."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
