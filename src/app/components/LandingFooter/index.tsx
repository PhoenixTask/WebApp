"use client";

import { Flex } from "@/components/UI";
import GithubButton from "@/components/UI/GithubButton";
import { useEffect, useState } from "react";

export default function LandingFooter() {
  const startYear = 2024;
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
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

          <div className="w-52 text-xs text-white">
            © {startYear}-{currentYear} ساخته شده با 🩷
          </div>
        </Flex>
      </div>
    </footer>
  );
}
