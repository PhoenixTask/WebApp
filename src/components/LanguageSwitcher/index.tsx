"use client";

import { startTransition, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { routing, usePathname } from "@/i18n/routing";
import { languages, localeType } from "@/i18n/locales";
import clsx from "clsx";

export default function LanguageSwitcher() {
  const locale = useLocale() as localeType;
  const pathname = usePathname();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const getTargetPath = useCallback(() => {
    const stripped = pathname.replace(/^\/(en|fa)(?=\/|$)/, "");
    return stripped === "" ? "/" : stripped;
  }, [pathname]);

  const handleLanguageChange = useCallback(
    (newLocale: string) => {
      if (newLocale === locale || isLoading) return;

      setIsLoading(true);
      const targetPath = getTargetPath();

      startTransition(async () => {
        try {
          const blogMatch = targetPath.match(/^\/blog\/(.+)$/);
          let finalPath = targetPath;

          if (blogMatch) {
            const res = await fetch("/api/translate-path", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ pathname, targetLocale: newLocale }),
            });
            if (res.ok) {
              const json = await res.json();
              finalPath = json.path || targetPath;
            }
          }

          const absolute = `/${newLocale}${finalPath === "/" ? "" : finalPath}`;
          router.replace(absolute);
        } catch {
          const absolute = `/${newLocale}${targetPath === "/" ? "" : targetPath}`;
          router.replace(absolute);
        }
      });

      const timeoutId = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timeoutId);
    },
    [locale, router, isLoading, getTargetPath, pathname]
  );

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn m-1 rounded-full bg-accent text-accent-content"
      >
        {languages[locale].name}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
      >
        {routing.locales.map((lang) => {
          const isActive = locale === lang;
          const label = languages[locale].name;

          return (
            <li key={lang}>
              <button
                onClick={() => handleLanguageChange(lang)}
                disabled={isActive || isLoading}
                className={clsx(
                  "w-full text-left",
                  isActive && "font-bold text-accent",
                  isLoading && !isActive && "opacity-50 cursor-not-allowed"
                )}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
