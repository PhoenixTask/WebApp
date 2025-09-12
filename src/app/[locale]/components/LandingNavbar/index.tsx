"use client";

import Image from "next/image";
import { Link } from "@/components/UI";
import { routeType } from "@/i18n/routing";
import { useGetProfile } from "@/hooks/useUser";
import { getUserId, removeTokens } from "@/functions/tokenManager";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import ChangeModeButton from "@/components/ChangeThemeMode";
import { useTranslations } from "next-intl";
import PhoenixTask from "@/components/PhoenixTask";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function LandingNavbar() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const t = useTranslations();

  const linkItems: { label: string; href: routeType }[] = [
    { label: t("listLink"), href: "/list" },
    { label: t("columnLink"), href: "/column" },
    { label: t("calendarLink"), href: "/calendar" },
  ];

  const userId = getUserId();
  const { data: userProfileURL } = useGetProfile(userId);

  return (
    <div className="navbar bg-base-300 shadow-sm px-5 fixed top-0 z-20">
      <div className="flex-1">
        <div className="md:hidden">
          {userProfileURL && (
            <div className="dropdown dropdown-start">
              <div
                tabIndex={0}
                className="relative w-10 h-10 overflow-hidden bg-base-300 text-base-content flex justify-center items-center rounded-full cursor-pointer hover:scale-110 hover:opacity-95 transition-all duration-300 ease-in-out"
              >
                <Image
                  src={userProfileURL}
                  alt={t("altProfileImage")}
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {linkItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      i18n
                      target="_blank"
                      textSize="S"
                      weight="600"
                      aria-label={item.label}
                      to={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    i18n
                    target="_blank"
                    to="/personal-info"
                    textSize="S"
                    weight="600"
                  >
                    {t("MainPage.personalInfoLink")}
                  </Link>
                </li>
                <li>
                  <a
                    className="text-error font-semibold text-sm"
                    onClick={logoutHandler}
                  >
                    {t("logoutLink")}
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>
          <div className="hidden md:flex items-center gap-4">
            {userProfileURL && (
              <>
                <div className="dropdown dropdown-start">
                  <div
                    tabIndex={0}
                    className="relative w-10 h-10 overflow-hidden bg-base-300 text-base-content flex justify-center items-center rounded-full cursor-pointer hover:scale-110 hover:opacity-95 transition-all duration-300 ease-in-out"
                  >
                    <Image
                      src={userProfileURL}
                      alt="تصویر پروفایل"
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>

                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <Link
                        i18n
                        target="_blank"
                        to="/personal-info"
                        textSize="S"
                        weight="600"
                      >
                        {t("MainPage.personalInfoLink")}
                      </Link>
                    </li>
                    <li>
                      <a
                        className="text-error font-semibold text-sm"
                        onClick={logoutHandler}
                      >
                        {t("logoutLink")}
                      </a>
                    </li>
                  </ul>
                </div>

                {linkItems.map((item) => (
                  <Link
                    i18n
                    target="_blank"
                    textSize="M"
                    weight="600"
                    aria-label={item.label}
                    key={item.label}
                    to={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
        {!userId && (
          <div className="flex items-center gap-3">
            <Link i18n to="/login" textSize="M" weight="600">
              {t("Portal.Login.title")}
            </Link>
            <Link i18n to="/register" textSize="M" weight="600">
              {t("Portal.register.title")}
            </Link>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <PhoenixTask />
        <LanguageSwitcher />
        <ChangeModeButton />
      </div>
    </div>
  );

  function logoutHandler() {
    queryClient.clear();
    removeTokens();
    router.refresh();
  }
}
