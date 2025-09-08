"use client";
import { Flex } from "@/components/UI";
import ProfileSidebar from "./components/Sidebar";

type ProfileLayoutProps = {
  children: React.ReactNode;
}
export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="h-screen grid 2xl:grid-cols-12 2xl:grid-rows-12">
      <div className="2xl:col-span-2 2xl:row-span-12 2xl:block hidden">
        <ProfileSidebar />
      </div>
      <Flex direction="col" justifyContent="center" className="w-4/5 h-screen">
        {children}
      </Flex>
    </div>
  );
}
