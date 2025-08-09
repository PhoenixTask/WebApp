import { Flex } from "@/components/UI";
import HomeHero from "./components/HomeHero";
import LandingFooter from "./components/LandingFooter";
import Navbar from "./components/Navbar";
import ProjectGallery from "./components/ProjectGallery";

export default function MainPage() {
  return (
    <Flex justifyContent="center" alignItems="center" direction="col" className="select-none">
      <Navbar />
      <HomeHero />
      <ProjectGallery />
      <LandingFooter />
    </Flex>
  );
}
