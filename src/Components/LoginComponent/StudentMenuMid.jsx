import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const StudentMenuMid = () => {
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
        <div className="flex items-center justify-around">
          <div className="flex items-center space-x-4">
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
                      href="/Items"
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
            <div className="relative">
              <button
                onClick={() => toggleDropdown("student")}
                className="flex items-center px-3 py-2 text-black font-bold hover:bg-yellow-500 rounded"
              >
                Student
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {openDropdown === "student" && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded shadow-lg z-50 border border-gray-200">
                  <div className="py-2">
                    <div className="px-4 py-2 bg-gray-100 border-b border-gray-200">
                      <span className="font-bold text-gray-800">Student</span>
                    </div>
                    <a
                      href=""
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Student List
                    </a>
                    <a
                      href=""
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Remove Student
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("lost-item")}
                className="flex items-center px-3 py-2 text-black font-bold hover:bg-yellow-500 rounded"
              >
                Lost-Item
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {openDropdown === "lost-item" && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded shadow-lg z-50 border border-gray-200">
                  <div className="py-2">
                    <div className="px-4 py-2 bg-gray-100 border-b border-gray-200">
                      <span className="font-bold text-gray-800">
                        Lost Items
                      </span>
                    </div>
                    <a
                      href=""
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Lost Item Registration
                    </a>
                    <a
                      href=""
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Lost Item List
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

            <div className="relative">
              <button
                onClick={() => toggleDropdown("found-item")}
                className="flex items-center px-3 py-2 text-black font-bold hover:bg-yellow-500 rounded"
              >
                Found-Item
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {openDropdown === "found-item" && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded shadow-lg z-50 border border-gray-200">
                  <div className="py-2">
                    <div className="px-4 py-2 bg-gray-100 border-b border-gray-200">
                      <span className="font-bold text-gray-800">
                        Found Items
                      </span>
                    </div>
                    <a
                      href=""
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Found Item Submission
                    </a>
                    <a
                      href=""
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Found Item List
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("report")}
                className="flex items-center px-3 py-2 text-black font-bold hover:bg-yellow-500 rounded"
              >
                Report
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {openDropdown === "report" && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded shadow-lg z-50 border border-gray-200">
                  <div className="py-2">
                    <div className="px-4 py-2 bg-gray-100 border-b border-gray-200">
                      <span className="font-bold text-gray-800">Report</span>
                    </div>
                    <a
                      href=""
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Found Item Report
                    </a>
                    <a
                      href=""
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Lost Item Report
                    </a>
                    <a
                      href=""
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Lost Found Analysis
                    </a>
                  </div>
                </div>
              )}
            </div>

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

export default StudentMenuMid;
