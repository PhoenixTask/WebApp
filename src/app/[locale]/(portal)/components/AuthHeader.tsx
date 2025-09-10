"use client";

import { Link } from "@/components/UI";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function AuthHeader() {
  const currentPath = usePathname();

  const t = useTranslations();

  return (
    <header className="flex justify-between items-center mx-20 mt-10 h-11">
      <h1 className="logo h-fit">{t("brandName")}</h1>
      <div className="flex gap-2 items-center">
        <h6 className="font-medium">
          {currentPath.includes("/login")
            ? t("Portal.Login.header")
            : t("Portal.Register.header")}
        </h6>
        <Link
          i18n
          weight="800"
          textSize="S"
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
