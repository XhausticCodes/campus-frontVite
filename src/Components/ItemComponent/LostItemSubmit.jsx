import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa6";
import {
  lostItemSubmission,
  itemIdGenerator,
} from "../../Services/ItemService";
import { getUserDetails } from "../../Services/LoginService";

const LostItemSubmit = () => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newId, setNewId] = useState("");
  const [campusUser, setCampusUser] = useState({
    username: "",
    password: "",
    personName: "",
    email: "",
    role: "",
  });

  const [item, setItem] = useState({
    itemId: 0,
    username: "",
    userEmail: "",
    itemName: "",
    category: "",
    color: "",
    brand: "",
    location: "",
    lostDate: new Date(),
    entryDate: new Date(),
  });

  let [ldate, setLdate] = useState(new Date());
  let [edate, setEdate] = useState(new Date());

  // Generate ItemId
  const setFoundItemId = () => {
    itemIdGenerator().then((response) => {
      setNewId(response.data);
    });
  };

  // Get User Info
  const setUserDetails = () => {
    getUserDetails().then((response) => {
      setCampusUser(response.data);
      // Pre-fill user details into the item state
      setItem((prev) => ({
        ...prev,
        username: response.data.username,
        userEmail: response.data.email,
      }));
    });
  };

  useEffect(() => {
    setFoundItemId();
    setUserDetails();
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setItem((values) => ({ ...values, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // const handleDescriptionChange = (event) => {
  //   const { name, value } = event.target;
  //   setItem((prev) => ({
  //     ...prev,
  //     description: {
  //       ...prev.description,
  //       [name]: value,
  //     },
  //   }));
  // };

  const foundItemFormSubmit = () => {
    const finalItem = {
      ...item,
      itemId: newId,
      // Keep description only if present to avoid spreading undefined
      description: item.description
        ? { ...item.description, itemId: newId }
        : undefined,
      username: campusUser.username,
      userEmail: campusUser.email,
      lostDate: ldate,
      entryDate: edate,
    };

    return lostItemSubmission(finalItem).then(() => {
      alert("Found Item Submitted Successfully!");
      navigate("/StudentMenu");
    });
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!ldate) {
      tempErrors.lostDate = "Found Date is required";
      isValid = false;
    }
    if (!edate) {
      tempErrors.entryDate = "Entry Date is required";
      isValid = false;
    }
    if (!String(item.itemName || "").trim()) {
      tempErrors.itemName = "Item Name is required";
      isValid = false;
    }
    if (!String(item.location || "").trim()) {
      tempErrors.location = "Location is required";
      isValid = false;
    }
    if (!String(item.category || "").trim()) {
      tempErrors.category = "Item Category is required";
      isValid = false;
    }
    if (!String(item.brand || "").trim()) {
      tempErrors.brand = "Item Brand is required";
      isValid = false;
    }
    if (!String(item.color || "").trim()) {
      tempErrors.color = "Item Color is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    foundItemFormSubmit().finally(() => setIsSubmitting(false));
  };

  // Common input field styling
  const inputStyles =
    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";
  const labelStyles = "block text-sm font-medium text-gray-700 mb-1";
  const errorStyles = "text-red-500 text-xs mt-1";

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 bg-indigo-100 rounded-full">
            <FaBoxOpen size={35} className="text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Lost Item Submission
          </h2>
          <p className="text-gray-500 mt-2">Campus Lost & Found Portal</p>
        </div>

        <form onSubmit={handleValidation} className="">
          {/* User & Date Information */}
          <div className="grid grid-cols-2 gap-6">
            <div className="grid grid-rows-1 md:grid-rows-2 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyles}>Generated Item ID</label>
                  <input
                    className={`${inputStyles} bg-gray-100 cursor-not-allowed`}
                    value={newId}
                    readOnly
                  />
                </div>
                <div>
                  <label className={labelStyles}>User Name</label>
                  <input
                    className={`${inputStyles} bg-gray-100 cursor-not-allowed`}
                    value={item.username}
                    readOnly
                  />
                </div>
                <div>
                  <label className={labelStyles}>User Email</label>
                  <input
                    className={`${inputStyles} bg-gray-100 cursor-not-allowed`}
                    value={item.userEmail}
                    readOnly
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="lostDate" className={labelStyles}>
                    Select Lost Date
                  </label>
                  <input
                    id="lostDate"
                    type="date"
                    className={inputStyles}
                    value={ldate}
                    onChange={(event) => {
                      if (errors.lostDate) {
                        setErrors((prev) => ({ ...prev, lostDate: undefined }));
                      }
                      setLdate(event.target.value);
                    }}
                  />
                  {errors.lostDate && (
                    <p className={errorStyles}>{errors.lostDate}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="entryDate" className={labelStyles}>
                    Select Entry Date
                  </label>
                  <input
                    id="entryDate"
                    type="date"
                    className={inputStyles}
                    value={edate}
                    onChange={(event) => {
                      if (errors.entryDate) {
                        setErrors((prev) => ({
                          ...prev,
                          entryDate: undefined,
                        }));
                      }
                      setEdate(event.target.value);
                    }}
                  />
                  {errors.entryDate && (
                    <p className={errorStyles}>{errors.entryDate}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Item Description Section */}
            <div className="border-gray-200 border-l pl-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="itemName" className={labelStyles}>
                    Item Name *
                  </label>
                  <input
                    id="itemName"
                    name="itemName"
                    className={inputStyles}
                    value={item.itemName}
                    onChange={onChangeHandler}
                  />
                  {errors.itemName && (
                    <p className={errorStyles}>{errors.itemName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="category" className={labelStyles}>
                    Category
                  </label>
                  <input
                    id="category"
                    name="category"
                    className={inputStyles}
                    value={item.category}
                    onChange={onChangeHandler}
                  />
                  {errors.category && (
                    <p className={errorStyles}>{errors.category}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="color" className={labelStyles}>
                    Color
                  </label>
                  <input
                    id="color"
                    name="color"
                    className={inputStyles}
                    value={item.color}
                    onChange={onChangeHandler}
                  />
                  {errors.color && (
                    <p className={errorStyles}>{errors.color}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="brand" className={labelStyles}>
                    Brand
                  </label>
                  <input
                    id="brand"
                    name="brand"
                    className={inputStyles}
                    value={item.brand}
                    onChange={onChangeHandler}
                  />
                  {errors.brand && (
                    <p className={errorStyles}>{errors.brand}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="location" className={labelStyles}>
                    Location of Lost
                  </label>
                  <input
                    id="location"
                    name="location"
                    className={inputStyles}
                    value={item.location}
                    onChange={onChangeHandler}
                  />
                  {errors.location && (
                    <p className={errorStyles}>{errors.location}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ cursor: "pointer" }}
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out mt-6"
          >
            {isSubmitting ? "Submitting..." : "Submit Found Item"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LostItemSubmit;
