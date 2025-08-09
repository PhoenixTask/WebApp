"use client";
import React from "react";
import { StickyScroll } from "./StickyScrollReveal";
import Image from "next/image";

const content = [
  {
    title: "نمایش ستونی تسک‌ها",
    description:
      "در حالت ستونی، وظایف شما در قالب ستون‌های قابل شخصی‌سازی نمایش داده می‌شوند. با قابلیت Drag & Drop، می‌توانید به‌سادگی تسک‌ها را بین ستون‌ها جابه‌جا کنید، اولویت‌ها را تغییر دهید و پیشرفت پروژه را به‌صورت بصری و سریع مدیریت کنید.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <Image
          src="/view/column.png"
          alt="نمایش ستونی"
          width={2000}
          height={1000}
        />
      </div>
    ),
  },
  {
    title: "نمایش لیستی تسک‌ها",
    description:
      "حالت لیستی امکان مشاهده همه وظایف در یک ساختار خطی و فشرده را فراهم می‌کند. با این نما، جزئیات هر تسک از جمله توضیحات، برچسب‌ها و مهلت انجام به‌صورت یکجا قابل مشاهده و ویرایش است؛ ایده‌آل برای مرور سریع و مدیریت دقیق.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/view/list.png"
          alt="نمایش لیستی"
          width={2000}
          height={1000}
        />
      </div>
    ),
  },
  {
    title: "نمایش تقویمی تسک‌ها",
    description:
      "در حالت تقویمی، وظایف و رویدادهای شما به‌صورت روزانه، هفتگی یا ماهانه روی یک تقویم تعاملی نمایش داده می‌شوند. این نما کمک می‌کند تا برنامه‌ریزی دقیق‌تری برای موعدها و رویدادها داشته باشید و وظایف را مستقیماً از تقویم مدیریت کنید.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        <Image
          src="/view/calendar.png"
          alt="نمایش تقویمی"
          width={2000}
          height={1000}
        />
      </div>
    ),
  },
];

export default function StickyScrollRevealDemo() {
  return (
    <div className="max-w-7xl py-4 my-10">
      <StickyScroll content={content} />
    </div>
  );
}
