import { direction } from "@/functions/direction";
import HeroSection from "./HeroSection";
import ProjectGallery from "./ProjectGallery";

type Props = {
  locale: string;
};

export default function LandingSection({ locale }: Props) {
  return (
    <div {...direction(locale)}>
      <HeroSection />
      <ProjectGallery />
    </div>
  );
}
