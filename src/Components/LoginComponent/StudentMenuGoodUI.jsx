import React, { useState } from "react";
import {
  ChevronDown,
  Package,
  User,
  Search,
  FileText,
  LogOut,
  Menu,
  X,
  Bell,
  Settings,
  Home,
  MapPin,
  Clock,
  CheckCircle,
  BookUser,
} from "lucide-react";

const StudentMenuGoodUI = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const menuItems = [
    {
      title: "Personal",
      icon: BookUser ,
      items: [
        { name: "Profile", href: "/Profile", icon: CheckCircle },
        { name: "Lost Item List", href: "/LostReport", icon: FileText },
        { name: "Found Item List", href: "/FoundReport", icon: FileText },
      ],
    },
    {
      title: "Items",
      icon: Package,
      items: [
        { name: "Lost Item Registration", href: "/LostSubmit", icon: MapPin },
        {
          name: "Found Item Submission",
          href: "/LostReport",
          icon: CheckCircle,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">
                  Lost & Found
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {menuItems.map((menuItem, index) => (
                  <div key={index} className="relative">
                    <button
                      onClick={() => toggleDropdown(menuItem.title)}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <menuItem.icon className="w-4 h-4 mr-2" />
                      {menuItem.title}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>

                    {/* Dropdown Menu */}
                    {openDropdown === menuItem.title && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg z-50 border border-gray-200 py-2">
                        <div className="px-4 py-2 bg-gray-50 boxrder-b border-gray-100">
                          <span className="text-sm font-semibold text-gray-800">
                            {menuItem.title}
                          </span>
                        </div>
                        {menuItem.items.map((item, itemIndex) => (
                          <a
                            key={itemIndex}
                            href={item.href}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <item.icon className="w-4 h-4 mr-3 text-gray-400" />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right side actions */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Bell className="h-6 w-6" />
                </button>
                <button className="ml-3 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Settings className="h-6 w-6" />
                </button>
                <a
                  href="/"
                  className="ml-3 flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {menuItems.map((menuItem, index) => (
                <div key={index}>
                  <button
                    onClick={() => toggleDropdown(menuItem.title)}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <menuItem.icon className="w-5 h-5 mr-3" />
                      {menuItem.title}
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* Mobile Dropdown */}
                  {openDropdown === menuItem.title && (
                    <div className="ml-6 mt-2 space-y-1">
                      {menuItem.items.map((item, itemIndex) => (
                        <a
                          key={itemIndex}
                          href={item.href}
                          className="flex items-center px-3 py-2 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        >
                          <item.icon className="w-4 h-4 mr-3 text-gray-400" />
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Logout */}
              <a
                href="/"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="text-3xl text-center">Student Menu</div>
      </div>
    </div>
  );
};

export default StudentMenuGoodUI;
