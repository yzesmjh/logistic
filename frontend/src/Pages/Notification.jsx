import { useState, useLayoutEffect } from "react";
import Aside from "../Components/Dashboard/Aside";
import Header from "../Components/Dashboard/Header";
import NotificationsMain from "../Components/Notification/NotificationsMain";
import useHeaderData from "../Hooks/useHeaderData";

export default function Notification() {
  const { userInfo, token } = useHeaderData();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useLayoutEffect(() => {
    document.title = "FedyTransist | Notifications";
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Aside
        user={userInfo}
        token={token}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <NotificationsMain />
      </div>
    </div>
  );
}
