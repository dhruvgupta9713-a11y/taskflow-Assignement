import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskFlow — Multi-Workspace Task Board",
  description:
    "Collaborate and manage tasks across multiple workspaces with an intuitive Kanban board. Organize, prioritize, and track your team's work in real-time.",
  keywords: ["task management", "kanban", "project management", "team collaboration"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
