import LanguageSwitcher from "@/components/LanguageSwitcher";
import DashboardSidebar from "..";
import ChangeModeButton from "@/components/ChangeThemeMode";

export default function MobileSidebar() {
  return (
    <div className="drawer drawer-start 2xl:hidden z-40">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-4"
          className="w-10 h-10 drawer-button btn btn-primary hover:btn-secondary rounded-full"
        >
          |||
        </label>
      </div>
      <div className="drawer-side h-screen overflow-y-hidden">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <div className="flex flex-col bg-base-200 h-full overflow-y-hidden">
          <div className="flex items-center justify-between px-4 gap-x-5">
            <LanguageSwitcher />
            <ChangeModeButton />
          </div>
          <DashboardSidebar />
        </div>
      </div>
    </div>
  );
}
