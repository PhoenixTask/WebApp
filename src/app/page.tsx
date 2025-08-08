import { Button, Link } from "@/components/UI";
import Image from "next/image";
import HomeHero from "./components/HomeHero";
import LandingFooter from "./components/LandingFooter";
import Navbar from "./components/Navbar";
import ProjectGallery from "./components/ProjectGallery";

export default function MainPage() {
  return (
    <div>
      <Navbar />
      <HomeHero />
      <ProjectGallery />
      <LandingFooter />
    </div>
  );
}
