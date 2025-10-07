import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItemById, foundItemSubmission } from "../../Services/ItemService";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

const FoundItemSubmission = () => {
  const { id } = useParams(); // Get item ID from the URL
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [foundDate, setFoundDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch the details of the specific item using the ID from the URL
    if (id) {
      getItemById(id)
        .then((response) => {
          setItem(response.data);
        })
        .catch((error) => {
          console.error("Error fetching item details:", error);
          setError("Could not load item details.");
        });
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!foundDate) {
      setError("Please select a valid found date.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Create the updated item object with the new foundDate
    const updatedItem = {
      ...item,
      foundDate: foundDate,
    };

    foundItemSubmission(updatedItem)
      .then(() => {
        alert("Item successfully marked as found!");
        // Navigate back to the student/admin menu or the report page
        navigate("/StudentMenu"); // Or navigate(-1) to go back to the previous page
      })
      .catch((error) => {
        console.error("Failed to submit found item:", error);
        setError("An error occurred during submission. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (!item && !error) {
    return <div className="text-center text-lg mt-10">Loading item data...</div>;
  }
  
  if (error) {
     return <div className="text-center text-red-500 text-lg mt-10">{error}</div>;
  }

  const returnBack = () => {
    navigate(-1);
  };
  
  // Common input field styling
  const inputStyles = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed";
  const labelStyles = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-5 space-y-6">
      <div className="flex flex-row justify-start">
        <button className="bg-indigo-500 text-white px-3 py-2 rounded flex flex-row items-center justify-center gap-2 hover:bg-indigo-700 transition-all duration-300 group " style={{cursor:"pointer"}} onClick={returnBack} >
        <FaArrowLeftLong className="h-5 w-5 group-hover:scale-80 group-hover:translate-x-1 transition-all duration-300" />
        <span className="group-hover:translate-x-1 transition-all duration-300">
          Back
        </span>
          </button>
        </div>
        <div className="flex flex-col items-center">
          <FaCheckCircle size={40} className="text-green-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 text-center">Found Item Submission</h2>
          <p className="text-gray-500 mt-2">Confirm the details and add the date the item was found.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyles}>Item ID</label>
              <input type="text" value={item.itemId} className={inputStyles} readOnly />
            </div>
            <div>
              <label className={labelStyles}>Item Name</label>
              <input type="text" value={item.itemName} className={inputStyles} readOnly />
            </div>
            <div>
              <label className={labelStyles}>Category</label>
              <input type="text" value={item.category} className={inputStyles} readOnly />
            </div>
             <div>
              <label className={labelStyles}>Brand</label>
              <input type="text" value={item.brand} className={inputStyles} readOnly />
            </div>
            <div>
              <label className={labelStyles}>Color</label>
              <input type="text" value={item.color} className={inputStyles} readOnly />
            </div>
            <div>
              <label className={labelStyles}>Location Lost</label>
              <input type="text" value={item.location} className={inputStyles} readOnly />
            </div>
            <div className="md:col-span-2">
                <label htmlFor="foundDate" className={labelStyles}>Select Found Date *</label>
                <input
                  id="foundDate"
                  type="date"
                  value={foundDate}
                  onChange={(e) => setFoundDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out mt-6"
          >
            {isSubmitting ? "Submitting..." : "Submit Found Item"}
          </button>
          
           {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default FoundItemSubmission;