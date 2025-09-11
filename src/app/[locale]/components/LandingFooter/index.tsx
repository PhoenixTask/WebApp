import { Flex } from "@/components/UI";
import GithubButton from "@/components/UI/GithubButton";
import { direction } from "@/functions/languageHandler";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  locale: string;
};

export default async function LandingFooter({ locale }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations("MainPage");

  console.log("LandingFooter:", locale);

  const startYear = 2024;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-60 bg-primary">
      <div className="relative bg-primary">
        <div id="wave1" className="wave" />
        <div id="wave2" className="wave" />
        <div id="wave3" className="wave" />
        <div id="wave4" className="wave" />
        <Flex
          direction="col"
          alignItems="center"
          justifyContent="center"
          gap="L"
          className="max-w-6xl mx-auto px-6 py-8 md:flex-row md:justify-between"
        >
          <div className="space-x-5">
            <GithubButton username="PhoenixTask" repo="WebApp" />
            <GithubButton username="PhoenixTask" repo="dotnet-backend" />
          </div>

          <div {...direction(locale)} className="w-52 text-xs text-white">
            © {startYear}-{currentYear} {t("madeWith")}
          </div>
        </Flex>
      </div>
    </footer>
  );
}
