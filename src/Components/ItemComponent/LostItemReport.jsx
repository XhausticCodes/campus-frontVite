import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  lostItemList, // For Admin
  lostItemListByUser, // For Student
} from "../../Services/ItemService";
import { getUserDetails } from "../../Services/LoginService";
import { FaSearch, FaRegSadTear } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

const LostItemReport = () => {
  const [lostItems, setLostItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // First, get the current logged-in user's details to check their role
    getUserDetails()
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, []);

  // Fetching items based on user's role
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "Admin") {
        // Admin sees all lost items
        lostItemList()
          .then((response) => {
            setLostItems(response.data);
          })
          .catch((error) => {
            console.error("Error fetching all lost items:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else if (currentUser.role === "Student") {
        // Student sees only their lost items
        lostItemListByUser()
          .then((response) => {
            setLostItems(response.data);
          })
          .catch((error) => {
            console.error("Error fetching user's lost items:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [currentUser]);

  const handleFoundSubmission = (itemId) => {
    // Navigate to the FoundItemSubmission page with the item's ID
    navigate(`/Found-Submit/${itemId}`);
  };

  if (loading) {
    return <div className="text-center text-lg mt-10">Loading items...</div>;
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
        <div className="flex flex-row justify-start mb-6">
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-all duration-300 group"
            style={{ cursor: "pointer" }}
            onClick={returnBack}
          >
            <FaArrowLeftLong className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="transition-transform">Back</span>
          </button>
        </div>

        <div className="text-center mb-8">
          <FaSearch size={40} className="text-indigo-600 mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-gray-800">Lost Item Report</h1>
          <p className="text-gray-500 mt-2">
            Items that are currently reported as lost.
          </p>
        </div>

        {lostItems.length === 0 ? (
          <div className="text-center py-10">
            <FaRegSadTear size={50} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">
              No Lost Items Found
            </h2>
            <p className="text-gray-500 mt-2">
              There are currently no items reported as lost.
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
                    "Color",
                    "Location Lost",
                    "Lost Date",
                    "Reported By",
                    // Only show "Action" column for students
                    ...(currentUser?.role === "Student" ? ["Action"] : []),
                  ].map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-5 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lostItems.map((item) => (
                  <tr
                    key={item.itemId}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-2 py-2 whitespace-nowrap">
                      {/* Image Display Cell */}
                      <img
                        src={item.imageUrl}
                        alt={item.itemName}
                        className="h-16 w-16 object-cover rounded-md shadow-md border"
                        // onError is a fallback in case the image URL is broken
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
                      {item.color}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.lostDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-600">
                      {item.username}
                    </td>
                    {currentUser?.role === "Student" && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleFoundSubmission(item.itemId)}
                          style={{ cursor: "pointer" }}
                          className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                        >
                          Mark as Found
                        </button>
                      </td>
                    )}
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

export default LostItemReport;
