import Modal from "@/components/Modal";
import DashboardHeader from "./components/Header";
import DashboardSidebar from "./components/Sidebar";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-screen grid 2xl:grid-cols-12 2xl:grid-rows-12">
      <Modal />
      <div className="2xl:col-span-2 2xl:row-span-12 2xl:block hidden">
        <DashboardSidebar />
      </div>
      <div className="2xl:col-span-10 2xl:row-span-2">
        <DashboardHeader />
      </div>
      <div
        className="2xl:col-span-10 2xl:row-span-10 pt-4 overflow-y-scroll items-center"
        dir="ltr"
      >
        <div dir="rtl">{children}</div>
      </div>
    </div>
  );
}
