import React, { useState, useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ThemeContext } from "../Context/ThemeContext";
import { useAuth } from "../Context/AuthContext";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useAuth();

  // A simple function to derive a title from the current path
  const getPageTitle = () => {
    const path = location.pathname.substring(1); // remove leading '/'
    if (path === "") {
      if (currentUser?.role === "Admin") {
        return "Admin Dashboard";
      } else {
        return "Student Dashboard";
      }
    }
    // Convert path to readable title
    const pathSegments = path.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
    return (
      lastSegment.charAt(0).toUpperCase() +
      lastSegment.slice(1).replace(/([A-Z])/g, " $1")
    );
  };

  return (
    <div
      className={`relative min-h-screen font-sans ${
        theme === "light" ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        currentUser={currentUser}
      />

      <div className="flex flex-col flex-1 md:pl-64">
        <Header
          pageTitle={getPageTitle()}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="mt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
