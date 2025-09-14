import { Flex } from "@/components/UI";
import Footer from "./components/LandingFooter";
import Navbar from "./components/LandingNavbar";
import Section from "./components/LandingSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MainPage({ params }: Props) {
  const { locale } = await params;

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      direction="col"
      className="select-none"
    >
      <Navbar />
      <Section locale={locale} />
      <Footer />
    </Flex>
  );
}
