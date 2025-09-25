"use client";

import React from "react";
import { StickyScroll } from "./StickyScrollReveal";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ProjectGallery() {
  const t = useTranslations("MainPage.Features");

  const features = [
    {
      title: t("0.title"),
      description: t("0.description"),
      content: (
        <div className="flex h-full w-full items-center justify-center">
          <Image
            src="/view/column.png"
            alt={t("0.altImage")}
            width={2000}
            height={1000}
          />
        </div>
      ),
    },
    {
      title: t("1.title"),
      description: t("1.description"),
      content: (
        <div className="flex h-full w-full items-center justify-center text-white">
          <Image
            src="/view/list.png"
            alt={t("1.altImage")}
            width={2000}
            height={1000}
          />
        </div>
      ),
    },
    {
      title: t("2.title"),
      description: t("2.description"),
      content: (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
          <Image
            src="/view/calendar.png"
            alt={t("2.altImage")}
            width={2000}
            height={1000}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl py-4 my-10 mx-5">
      <StickyScroll content={features} />
    </div>
  );
}
