import { Flex } from "@/components/UI";
import Footer from "./components/LandingFooter";
import Navbar from "./components/LandingNavbar";
import Section from "./components/LandingSection";

export default function MainPage() {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      direction="col"
      className="select-none"
    >
      <Navbar />
      <Section />
      <Footer />
    </Flex>
  );
}
