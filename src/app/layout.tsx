import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/TanstackQueryProvider";
import "@/assets/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

type RootLayoutProps = {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "فونیکس تسک",
  description: "a web-app for everything",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "icon",
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html dir="rtl" lang="fa" data-theme="default">
      <body className="font-IranYekan">
        <Toaster position="top-left" />
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
