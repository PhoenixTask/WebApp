import HomeHero from "@/components/UI/Heading/HomeHero";
import LandingFooter from "@/components/UI/LandingFooter/LandingFooter";
import Navbar from "@/components/UI/navbar/nav";
import ProjectGallery from "@/components/UI/ProjectGallery/ProjectGallery";

export default function MainPage() {
  return (
    <>
      <Navbar />
      <HomeHero />
      <ProjectGallery />
      <LandingFooter />
    </>
  );
}
