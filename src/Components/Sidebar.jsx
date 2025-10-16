import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  User,
  Settings,
  BarChart2,
  ChevronDown,
  ChevronRight,
  Package,
  FileText,
  Users,
  Archive,
  ArchiveRestore,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { ThemeContext } from "../Context/ThemeContext";

const Sidebar = ({ isOpen, setIsOpen, currentUser }) => {
  const { theme } = useContext(ThemeContext);
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (itemName) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  // Admin navigation items
  const adminNavItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: Home,
      type: "single",
    },
    {
      name: "Reports",
      icon: FileText,
      type: "dropdown",
      items: [
        { name: "Lost Items", path: "/LostReport", icon: Archive },
        { name: "Found Items", path: "/FoundReport", icon: ArchiveRestore },
      ],
    },
    {
      name: "Students",
      icon: Users,
      type: "dropdown",
      items: [
        { name: "View Students", path: "/DeleteStudentList", icon: Users },
      ],
    },
  ];

  // Student navigation items
  const studentNavItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: Home,
      type: "single",
    },
    {
      name: "Items",
      icon: Package,
      type: "dropdown",
      items: [
        { name: "Lost Item Registration", path: "/LostSubmit", icon: MapPin },
        {
          name: "Found Item Submission",
          path: "/FoundSubmit",
          icon: CheckCircle,
        },
        { name: "Lost Item Track", path: "/LostItemTrack", icon: FileText },
      ],
    },
    {
      name: "Reports",
      icon: FileText,
      type: "dropdown",
      items: [
        { name: "Found Item Report", path: "/FoundReport", icon: FileText },
        { name: "Lost Item Report", path: "/LostReport", icon: FileText },
      ],
    },
  ];

  const navItems =
    currentUser?.role === "Admin" ? adminNavItems : studentNavItems;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(true)}
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full w-64 flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 border-r ${
          theme === "light"
            ? "bg-white border-gray-200 text-gray-900"
            : "bg-gray-800 border-gray-700 text-white"
        }`}
      >
        <div
          className={`flex items-center justify-center h-20 border-b ${
            theme === "light" ? "border-gray-200" : "border-gray-700"
          }`}
        >
          <span
            className={`text-2xl font-bold ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Lost & Found App
          </span>
        </div>

        <nav className="flex-1 flex flex-col justify-between">
          <div className="px-4 py-6 space-y-1">
            {navItems.map((item) => {
              if (item.type === "single") {
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(true)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? theme === "light"
                            ? "bg-blue-500 text-white"
                            : "bg-blue-500 text-white"
                          : theme === "light"
                          ? "text-gray-700 hover:bg-gray-100"
                          : "text-gray-400 hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </NavLink>
                );
              } else {
                const isExpanded = expandedItems[item.name];
                return (
                  <div key={item.name}>
                    <button
                      onClick={() => toggleExpanded(item.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${
                        theme === "light"
                          ? "text-gray-700 hover:bg-gray-100"
                          : "text-gray-400 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.name}
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.items.map((subItem) => (
                          <NavLink
                            key={subItem.name}
                            to={subItem.path}
                            onClick={() => setIsOpen(true)}
                            className={({ isActive }) =>
                              `flex items-center px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                                isActive
                                  ? theme === "light"
                                    ? "bg-blue-500 text-white"
                                    : "bg-blue-500 text-white"
                                  : theme === "light"
                                  ? "text-gray-600 hover:bg-gray-50"
                                  : "text-gray-400 hover:bg-gray-900 hover:text-white"
                              }`
                            }
                          >
                            <subItem.icon className="h-4 w-4 mr-3" />
                            {subItem.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>

          <div className="px-4 py-6">
            <NavLink
              to="/Personal"
              onClick={() => setIsOpen(true)}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? theme === "light"
                      ? "bg-blue-500 text-white"
                      : "bg-blue-500 text-white"
                    : theme === "light"
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <User className="h-5 w-5 mr-3" />
              Profile
            </NavLink>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
