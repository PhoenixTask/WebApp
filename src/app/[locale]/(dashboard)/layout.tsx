import Modal from "@/components/Modal";
import DashboardHeader from "./components/Header";
import DashboardSidebar from "./components/Sidebar";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr] 2xl:grid-cols-12 2xl:grid-rows-12">
      <Modal />
      <div className="hidden 2xl:block 2xl:col-span-2 2xl:row-span-12 border-l border-neutral shadow-lg overflow-hidden">
        <DashboardSidebar />
      </div>
      <div className="col-span-full 2xl:col-span-10 2xl:row-span-2">
        <DashboardHeader />
      </div>
      <div
        className="col-span-full 2xl:col-span-10 2xl:row-span-10 overflow-y-auto pt-4"
        dir="ltr"
      >
        <div dir="rtl">{children}</div>
      </div>
    </div>
  );
}
