import { Button, Link } from "@/components/UI";
import Image from "next/image";
import HomeHero from "./components/HomeHero";
import LandingFooter from "./components/LandingFooter";
import Navbar from "./components/Navbar";
import ProjectGallery from "./components/ProjectGallery";

export default function MainPage() {
  return (
    <>
      {/* <header className="fixed w-full">
        <nav className="py-2.5">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            <div className="space-x-2">
              <Link to="/login" textSize="XL">
                ورود
              </Link>
              <Link to="/register" textSize="XL">
                ثبت‌نام
              </Link>
            </div>
            <Link to="/">
              <Image
                src="/logo/android-chrome-512x512.png"
                alt="PhoenixTask logo"
                width={50}
                height={50}
                className="rounded-full hover:scale-110 hover:opacity-90 transition-all duration-300 ease-in-out"
              />
            </Link>
          </div>
        </nav>
      </header> */}
      <Navbar />
      <HomeHero />
      <ProjectGallery />
      <LandingFooter />
    </>
  );
}
