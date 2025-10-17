import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/TanstackQueryProvider";
import localFont from "next/font/local";
import "@/assets/globals.css";
import { ThemeProvider } from "@/providers/ThemeContext";
import { ProtectProvider } from "@/providers/ProtectContext";

const IranYekan = localFont({
  src: [
    {
      path: "./fonts/IRANYekanX-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/IRANYekanX-UltraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/IRANYekanX-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/IRANYekanX-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/IRANYekanX-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/IRANYekanX-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/IRANYekanX-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/IRANYekanX-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--local-font-IranYekan",
});

export const metadata: Metadata = {
  title: "Phoenix Task",
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
  manifest: "/manifest.json",
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || "en";

  return (
    <html
      lang={locale ?? "en"}
      dir={locale === "en" ? "ltr" : "rtl"}
      data-theme="default"
      className={IranYekan.variable}
    >
      <body className="font-IranYekan">
        <Toaster position="top-left" />
        <ThemeProvider>
          <QueryProvider>
            <ProtectProvider>{children}</ProtectProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
