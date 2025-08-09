"use client";

import Image from "next/image";
import { GradientText, Heading, Link } from "@/components/UI";
import { useGetProfile } from "@/hooks/useUser";
import { getUserId, removeTokens } from "@/functions/tokenManager";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const menuItems = [
  { label: "نمایش لیستی", href: "/list" },
  { label: "نمایش ستونی", href: "/column" },
  { label: "نمایش تقویمی", href: "/calendar" },
];

export default function Navbar() {
  const router = useRouter();
  const queryClient = useQueryClient();

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
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <Link
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
                    target="_blank"
                    to="/personal-info"
                    textSize="S"
                    weight="600"
                  >
                    تنظیمات حساب کاربری
                  </Link>
                </li>
                <li>
                  <a
                    className="text-error font-semibold text-sm"
                    onClick={logoutHandler}
                  >
                    خروج از حساب کاربری
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
                        target="_blank"
                        to="/personal-info"
                        textSize="S"
                        weight="600"
                      >
                        تنظیمات حساب کاربری
                      </Link>
                    </li>
                    <li>
                      <a
                        className="text-error font-semibold text-sm"
                        onClick={logoutHandler}
                      >
                        خروج از حساب کاربری
                      </a>
                    </li>
                  </ul>
                </div>

                {menuItems.map((item) => (
                  <Link
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
            <Link to="/login" textSize="M" weight="600">
              ورود
            </Link>
            <Link to="/register" textSize="M" weight="600">
              ثبت‌نام
            </Link>
          </div>
        )}
      </div>
      <div className="flex">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={10}
          showBorder={false}
          className="p-2"
        >
          <Heading as="h1" size="XS" className="select-none">
            فونیکس تسک
          </Heading>
        </GradientText>
      </div>
    </div>
  );

  function logoutHandler() {
    queryClient.clear();
    removeTokens();
    router.refresh();
  }
}
