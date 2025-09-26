import DashboardSidebar from "../../Sidebar";

export default function MobileSidebar() {
  return (
    <div className="drawer drawer-start">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
          |||
        </label>
      </div>
      <div className="drawer-side h-screen overflow-y-hidden">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <div className="menu bg-base-200 h-full overflow-y-hidden">
          <DashboardSidebar />
        </div>
      </div>
    </div>
  );
}
