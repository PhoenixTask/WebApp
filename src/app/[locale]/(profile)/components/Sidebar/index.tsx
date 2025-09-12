"use client";

import { Button, Flex, Icon } from "@/components/UI";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import PhoenixTask from "@/components/PhoenixTask";
import { useTranslations } from "next-intl";

export default function ProfileSidebar() {
  const router = useRouter();

  const locale = useLocale();
  const t = useTranslations("Profile");

  return (
    <Flex
      direction="col"
      justifyContent="between"
      alignItems="center"
      className="h-screen py-10 shadow-lg border-l border-neutral"
    >
      <div className="flex flex-col justify-center gap-2 w-72">
        <PhoenixTask />

        <Button onClick={() => router.push(`/${locale}/list`)}>
          <Icon iconName="Arrow" className="rotate-180" />
          <span>{t("back")}</span>
        </Button>
      </div>
    </Flex>
  );
}
