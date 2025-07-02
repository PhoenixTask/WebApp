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
          {currentPath === "/login" || currentPath === "/forget-password"
            ? "ثبت‌نام نکردی؟"
            : "قبلا ثبت‌نام کردی؟"}
        </h6>
        <Link
          weight="800"
          textSize="S"
          to={
            currentPath === "/login" || currentPath === "/forget-password"
              ? "/register"
              : "/login"
          }
        >
          {currentPath === "/login" || currentPath === "/forget-password"
            ? "ثبت‌نام"
            : "ورود"}
        </Link>
      </div>
    </header>
  );
}
