import { useState } from "react";
import { useLocation } from "react-router";

import Sidebar from "../components/Admin/Sidebar";
import DashboardInfo from "../components/Admin/DashboardInfo";
import ManageStories from "../components/Admin/ManageStories";
import ManageSeries from "../components/Admin/ManageSeries";
import ManageCategories from "../components/Admin/ManageCategories";
import Ads from "../components/Admin/ManageAds";
import Settings from "../components/Admin/Settings";

export default function Dashboard() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  const renderContent = () => {
    switch (active) {
      case "/admin":
        return <DashboardInfo />;
      case "/admin/story":
        return <ManageStories />;
      case "/admin/series":
        return <ManageSeries />;
      case "/admin/category":
        return <ManageCategories />;
      case "/admin/ads":
        return <Ads />;
      case "/admin/settings":
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

