import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const StudentMenu = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <div className=" mx-auto px-4">
      <div className="text-center bg-pink-200 py-4">
        <h1 className="text-center text-4xl font-bold text-pink-500 underline italic">
          Lost Found Student Menu
        </h1>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-yellow-400 py-2">
        <div>
          <div className="flex items-center justify-between px-4">
            <div className="flex space-x-4">
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("items1")}
                  className="flex items-center px-3 py-2 text-black font-bold hover:bg-yellow-500 rounded"
                >
                  Items
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {openDropdown === "items1" && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded shadow-lg z-50 border border-gray-200">
                    <div className="py-2">
                      <div className="px-4 py-2 bg-gray-100 border-b border-gray-200">
                        <span className="font-bold text-gray-800">Items</span>
                      </div>
                      <a
                        href="/LostSubmit"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Lost Item Registration
                      </a>
                      <a
                        href=""
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Found Item Submission
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("items2")}
                  className="flex items-center px-3 py-2 text-black font-bold hover:bg-yellow-500 rounded"
                >
                  Reports
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {openDropdown === "items2" && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded shadow-lg z-50 border border-gray-200">
                    <div className="py-2">
                      <div className="px-4 py-2 bg-gray-100 border-b border-gray-200">
                        <span className="font-bold text-gray-800">Items</span>
                      </div>
                      <a
                        href="/LostReport"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Lost Item Report
                      </a>
                      <a
                        href=""
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Lost Item Track
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ------------------------ */}
            <a
              href="/"
              className="px-3 py-2 text-black font-bold bg-red-500 hover:bg-red-600 rounded"
            >
              <b>Logout</b>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default StudentMenu;
