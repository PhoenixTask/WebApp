import { Flex } from "@/components/UI";
import GithubButton from "@/components/UI/GithubButton";

export default function LandingFooter() {
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full mt-60 bg-[#1881fa] border-t border-base-300 shadow-inner relative text-white">
      <div className="relative w-full h-32 bg-[#1881fa]">
        <div id="wave1" className="wave" />
        <div id="wave2" className="wave" />
        <div id="wave3" className="wave" />
        <div id="wave4" className="wave" />
        <Flex
          direction="col"
          alignItems="center"
          className="max-w-6xl mx-auto px-6 py-8 md:flex-row md:justify-between gap-6"
        >
          <Flex>
            <GithubButton username="PhoenixTask" repo="WebApp" />
            <GithubButton username="PhoenixTask" repo="dotnet-backend" />
          </Flex>

          <div className="w-52 text-xs">
            © {startYear}-{currentYear} ساخته شده با 🩷
          </div>
        </Flex>
      </div>
    </footer>
  );
}
