import { useState } from "react";
import Sidebar from "../components/Admin/Sidebar";
import DashboardInfo from "../components/Admin/DashboardInfo";
import ManageStories from "../components/Admin/ManageStories";
import ManageSeries from "../components/Admin/ManageSeries";
import ManageCategories from "../components/Admin/ManageCategories";
import Ads from "../components/Admin/ManageAds";
import Settings from "../components/Admin/Settings";

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard Info");

  const renderContent = () => {
    switch (active) {
      case "Dashboard":
        return <DashboardInfo />;
      case "Manage Stories":
        return <ManageStories />;
      case "Manage Series":
        return <ManageSeries />;
      case "Manage Categories":
        return <ManageCategories />;
      case "Manage Ads":
        return <Ads />;
      case "Settings":
        return <Settings />;
      default:
        return <DashboardInfo />;
    }
  };

  return (
    <div className="flex min-h-screen min-w-screen bg-pink-100">
      <Sidebar active={active} setActive={setActive} />
      <main className="flex-1 p-8 overflow-y-auto bg-grey-900">
        {renderContent()}
      </main>
    </div>
  );
}

