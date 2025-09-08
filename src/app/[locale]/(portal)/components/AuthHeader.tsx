"use client";

import { Link } from "@/components/UI";
import { usePathname } from "next/navigation";

export default function AuthHeader() {
  const currentPath = usePathname(); 

  return (
    <header className="flex justify-between items-center mx-20 mt-10 h-11">
      <h1 className="logo h-fit">فونیکس تسک</h1>
      <div className="flex gap-2 items-center">
        <h6 className="font-medium">
          {currentPath.includes("/login")
            ? "ثبت‌نام نکردی؟"
            : "قبلا ثبت‌نام کردی؟"}
        </h6>
        <Link
          i18n
          weight="800"
          textSize="S"
          to={currentPath.includes("/login") ? "/register" : "/login"}
        >
          {currentPath.includes("/login") ? "ثبت‌نام" : "ورود"}
        </Link>
      </div>
    </header>
  );
}
