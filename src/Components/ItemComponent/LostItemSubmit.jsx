import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaArrowLeftLong } from "react-icons/fa6";
import {
  lostItemSubmission,
  itemIdGenerator,
} from "../../Services/ItemService";
import { getUserDetails } from "../../Services/LoginService";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";

const DEFAULT_IMAGE_URL =
  "https://res.cloudinary.com/dyowvqcsn/image/upload/v1759833173/Gemini_Generated_Image_vu4wr4vu4wr4vu4w_niixw0.png";

const LostItemSubmit = () => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newId, setNewId] = useState("");

  // --------------
  const [imageFile, setImageFile] = useState(null);
  const[imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  // --------------

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
    imageUrl: "",
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
    } else {
      setImageFile(null);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    // Clear the input field
    const input = document.getElementById("image-upload-input");
    if (input) {
      input.value = "";
    }
  };

  const uploadImgToCloudinary = async () => {
    if (!imageFile) return null;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", imageFile);

    formData.append("upload_preset", "LostFoundApp");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dyowvqcsn/image/upload",
        formData
      );
      setIsUploading(false);
      return response.data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      setIsUploading(false);
      setErrors((prev) => ({
        ...prev,
        image: "Image Upload Failed. Please try again.",
      }));
      return null;
    }
  };

  const foundItemFormSubmit = async () => {
    let finalImageUrl = DEFAULT_IMAGE_URL;

    if (imageFile) {
      const uploadedUrl = await uploadImgToCloudinary();
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;
      } else {
        setIsSubmitting(false);
        return;
      }
    }

    const finalItem = {
      ...item,
      itemId: newId,
      username: campusUser.username,
      userEmail: campusUser.email,
      lostDate: ldate,
      entryDate: edate,
      imageUrl: finalImageUrl,
    };

    return lostItemSubmission(finalItem).then(() => {
      alert("Lost Item Submitted Successfully!");
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
    foundItemFormSubmit().finally(() => {
      setIsSubmitting(false);
      setIsUploading(false);
    });
  };

  const navBack = () => {
    if (campusUser.role === "Admin") navigate("/AdminMenu");
    else navigate("/StudentMenu");
  };

  // Common input field styling
  const inputStyles =
    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";
  const labelStyles = "block text-sm font-medium text-gray-700 mb-1";
  const errorStyles = "text-red-500 text-xs mt-1";

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-2">
      <div className="w-full bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="flex flex-row justify-start">
          <button
            className="bg-pink-400 px-3 py-2 rounded flex flex-row items-center justify-center gap-2 hover:bg-pink-500 transition-all duration-300 group "
            style={{ cursor: "pointer" }}
            onClick={navBack}
          >
            <FaArrowLeftLong className="h-5 w-5 group-hover:scale-80 group-hover:translate-x-1 transition-all duration-300" />
            <span className="group-hover:translate-x-1 transition-all duration-300">
              Back
            </span>
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 bg-pink-100 rounded-full">
            <FaBoxOpen size={35} className="text-pink-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Lost Item Submission
          </h2>
          <p className="text-gray-500 mt-2">Campus Lost & Found Portal</p>
        </div>

        <form onSubmit={handleValidation} className="">
          {/* User & Date Information */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-cols items-start justify-center space-x-8 border-gray-200 border-b pb-6">
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
                <div className="grid grid-cols-1 gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
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
                            setErrors((prev) => ({
                              ...prev,
                              lostDate: undefined,
                            }));
                          }
                          setLdate(event.target.value);
                        }}
                      />
                      {errors.lostDate && (
                        <p className={errorStyles}>{errors.lostDate}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
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
                <div className="border-gray-200 pl-6 border-l ">
                  <label htmlFor="imageUpload" className={labelStyles}>
                    Upload Item Image *
                  </label>
                  <div className="mt-2 flex items-center justify-center w-full">
                    <div className="relative w-full h-48">
                      <label
                        htmlFor="image-upload-input"
                        className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        {imageFile ? (
                          <div className="relative w-full h-full">
                            <img
                              src={URL.createObjectURL(imageFile)}
                              alt="Preview"
                              className="h-full w-full object-contain rounded-lg p-2"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                removeImage();
                              }}
                              style={{ cursor: "pointer" }}
                              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 flex items-center justify-center text-sm font-bold transition-colors duration-200"
                              title="Remove image"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FaCloudUploadAlt className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, or JPEG
                            </p>
                          </div>
                        )}
                        <input
                          id="image-upload-input"
                          type="file"
                          className="hidden"
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>
                  {errors.image && (
                    <p className={errorStyles}>{errors.image}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Main Form Section */}
            <div className="border-gray-200 border-l pl-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    Location
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

          {/* <div className="mt-6 border-t border-gray-200 pt-6">
            <label htmlFor="imageUpload" className={labelStyles}>
              Upload Item Image *
            </label>
            <div className="mt-2 flex items-center justify-center w-full">
              <label
                htmlFor="image-upload-input"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                {imageFile ? (
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Preview"
                    className="h-full w-full object-contain rounded-lg p-2"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaCloudUploadAlt className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, or JPEG</p>
                  </div>
                )}
                <input
                  id="image-upload-input"
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            {errors.image && <p className={errorStyles}>{errors.image}</p>}
          </div> */}

          <button
            type="submit"
            disabled={isSubmitting || isUploading} // Disable button during upload or submission
            style={{ cursor: "pointer" }}
            className="w-full bg-pink-500 text-white font-bold py-3 px-4 rounded-md hover:bg-pink-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out mt-6"
          >
            {isUploading
              ? "Uploading Image..."
              : isSubmitting
              ? "Submitting..."
              : "Submit Lost Item"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LostItemSubmit;
