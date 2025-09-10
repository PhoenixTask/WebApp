import { GradientText, Heading } from "../UI";
import { useTranslations } from "next-intl";

export default function PhoenixTask() {
  const t = useTranslations();

  return (
    <GradientText
      colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
      animationSpeed={10}
      showBorder={false}
      className="p-2"
    >
      <Heading as="h1" size="XS" className="select-none">
        {t("brandName")}
      </Heading>
    </GradientText>
  );
}
