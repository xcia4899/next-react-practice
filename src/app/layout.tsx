import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "React 語法練習室",
  description: "用互動範例練習 React Hooks、Context 與元件資料流。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
