import { Flex, Heading } from "@/components/UI";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";

export default async function HeroSection() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <Flex
      direction="col"
      justifyContent="center"
      alignItems="center"
      className="my-20 w-full"
    >
      <Flex
        direction="col"
        justifyContent="center"
        alignItems="center"
        className="animate-pulse flex flex-col justify-center items-center"
      >
        <Image src="/logo/Original.svg" alt="Origin" width={500} height={500} />
      </Flex>
      <Heading as="h1" size="XL" weight="900">
        {t("MainPage.heroTitle")}
      </Heading>
      <Heading
        direction={locale === "en" ? "ltr" : "rtl"}
        as="h2"
        size="S"
        align="center"
        weight="800"
      >
        {t("MainPage.heroSlogan")}
      </Heading>
    </Flex>
  );
}
