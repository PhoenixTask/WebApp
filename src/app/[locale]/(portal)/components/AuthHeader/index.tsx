"use client";

import { Link, Heading } from "@/components/UI";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { direction } from "@/functions/languageHandler";

export default function AuthHeader() {
  const currentPath = usePathname();

  const locale = useLocale();
  const t = useTranslations();

  return (
    <header
      dir="rtl"
      className="flex justify-center items-center flex-wrap md:justify-between mx-5 mt-10 h-11"
    >
      <div className="hidden items-center gap-2 md:flex">
        <LanguageSwitcher />
        <Heading as="h1">{t("brandName")}</Heading>
      </div>
      <div {...direction(locale)} className="flex gap-2 items-center">
        <Heading as="h6">
          {currentPath.includes("/login")
            ? t("Portal.Login.header")
            : t("Portal.Register.header")}
        </Heading>
        <Link
          i18n
          textSize="M"
          underline
          to={currentPath.includes("/login") ? "/register" : "/login"}
        >
          {currentPath.includes("/login")
            ? t("Portal.Register.title")
            : t("Portal.Login.title")}
        </Link>
      </div>
    </header>
  );
}
