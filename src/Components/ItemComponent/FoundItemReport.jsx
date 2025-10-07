import React, { useState, useEffect } from "react";
import {
  foundItemList, // For Admin
  foundItemListByUser, // For Student
} from "../../Services/ItemService";
import { getUserDetails } from "../../Services/LoginService";
import { FaGift, FaRegFolderOpen } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const FoundItemReport = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the current logged-in user's details to determine their role
    getUserDetails()
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // After getting the user, fetch the appropriate list of found items
    if (currentUser) {
      if (currentUser.role === "Admin") {
        // Admins see all found items across the application
        foundItemList()
          .then((response) => {
            setFoundItems(response.data);
          })
          .catch((error) => {
            console.error("Error fetching all found items:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else if (currentUser.role === "Student") {
        // Students only see items they reported that have been found
        foundItemListByUser()
          .then((response) => {
            setFoundItems(response.data);
          })
          .catch((error) => {
            console.error("Error fetching user's found items:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [currentUser]); // This effect depends on the currentUser state

  if (loading) {
    return (
      <div className="text-center text-lg mt-10">Loading found items...</div>
    );
  }

  const returnBack = () => {
    if (currentUser?.role === "Admin") {
      navigate("/AdminMenu");
    } else {
      navigate("/StudentMenu");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-row justify-start">
          <button
            className="bg-indigo-500 text-white px-3 py-2 rounded flex flex-row items-center justify-center gap-2 hover:bg-indigo-700 transition-all duration-300 group "
            style={{ cursor: "pointer" }}
            onClick={returnBack}
          >
            <FaArrowLeftLong className="h-5 w-5 group-hover:scale-80 group-hover:translate-x-1 transition-all duration-300" />
            <span className="group-hover:translate-x-1 transition-all duration-300">
              Back
            </span>
          </button>
        </div>
        <div className="text-center mb-8">
          <FaGift size={40} className="text-indigo-600 mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-gray-800">
            Found Item Report
          </h1>
          <p className="text-gray-500 mt-2">
            Items that have been successfully found and reported.
          </p>
        </div>

        {foundItems.length === 0 ? (
          <div className="text-center py-10">
            <FaRegFolderOpen size={50} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">
              No Found Items to Display
            </h2>
            <p className="text-gray-500 mt-2">
              There are currently no items marked as found.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Image",
                    "Item ID",
                    "Item Name",
                    "Category",
                    "Brand",
                    "Location Lost",
                    "Lost Date",
                    "Found Date",
                    "Reported By",
                  ].map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {foundItems.map((item) => (
                  <tr key={item.itemId} className="hover:bg-gray-50">
                    <td className="px-2 py-2 whitespace-nowrap">
                      <img
                        src={item.imageUrl}
                        alt={item.itemName}
                        className="h-16 w-16 object-cover rounded-md shadow-md border"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/100x100/EEE/31343C?text=No+Image";
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.itemId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.itemName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.brand}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.lostDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      {item.foundDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.username}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoundItemReport;
