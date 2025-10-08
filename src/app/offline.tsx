"use client";

import { Button, Heading } from "@/components/UI";
import { localeType } from "@/i18n/locales";
import { useRouter } from "next/navigation";

export default function Offline() {
  const router = useRouter();
  const locale =
    typeof window !== "undefined"
      ? window.location.pathname.split("/")[1] || "en"
      : "en";

  const messages = {
    en: {
      title: "You're offline!🥶",
      subtitle: "Some features may be unavailable.",
      button: "Back to home page",
      dir: "ltr",
    },
    fa: {
      title: "شما آفلاین هستید!🥶",
      subtitle: "برخی امکانات ممکن است در دسترس نباشند.",
      button: "بازگشت به صفحه اصلی",
      dir: "rtl",
    },
  };

  const { title, subtitle, button, dir } =
    messages[locale as localeType] || messages.en;

  return (
    <div
      dir={dir}
      className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-base-content p-4"
    >
      <div className="card w-full max-w-lg bg-base-300 shadow-xl p-8 text-center">
        <div className="card-body items-center text-center">
          <Heading as="h1" className="text-3xl font-semibold mb-2 mt-2">
            {title}
          </Heading>

          <p className="mb-6 text-lg">{subtitle}</p>

          <div className="card-actions justify-center">
            <Button
              className="btn btn-primary btn-lg"
              onClick={() => router.push("/")}
            >
              {button}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
