import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// child page ke liye
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(
    window.innerWidth > 768
  );

  useEffect(() => {

    const handleResize = () => {

      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }

    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);

  }, []);

  return (

    <div className="dashboard-container">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div
        className={`dashboard-content ${
          sidebarOpen ? "" : "full"
        }`}
      >

        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <Outlet />

      </div>

    </div>

  );

};

export default Layout;