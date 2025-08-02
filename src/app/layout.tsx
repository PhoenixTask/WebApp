import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/TanstackQueryProvider";
import "@/assets/globals.css";

type RootLayoutProps = {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "فونیکس تسک",
  description: "a web-app for everything",
  icons: {
    icon: [
      { url: "/logo/favicon-16x16.png", sizes: "16x16" },
      { url: "/logo/favicon-32x32.png", sizes: "32x32" },
      { url: "/logo/favicon.ico" },
    ],
    apple: "/logo/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/logo/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "icon",
        url: "/logo/android-chrome-512x512.png",
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
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
