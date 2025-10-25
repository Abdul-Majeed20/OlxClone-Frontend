import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../components/redux-Toolkit/features/product/productActions";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SellProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    location: "",
    condition: "Used",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle multiple file input
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    // Validate file count
    const totalFiles = imageFiles.length + files.length;
    if (totalFiles > 5) {
      toast.error("❌ Maximum 5 images allowed");
      return;
    }

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`❌ ${file.name} is not an image file`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error(`❌ ${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Update image files state
    setImageFiles(prev => [...prev, ...validFiles]);

    // Create previews for new files
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, {
          id: Math.random().toString(36).substr(2, 9),
          url: reader.result,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove individual image
  const removeImage = (id) => {
    const previewIndex = imagePreviews.findIndex(preview => preview.id === id);
    if (previewIndex !== -1) {
      setImagePreviews(prev => prev.filter(preview => preview.id !== id));
      setImageFiles(prev => prev.filter((_, index) => index !== previewIndex));
    }
  };

  // Clear all images
  const clearAllImages = () => {
    setImageFiles([]);
    setImagePreviews([]);
  };

  // Handle form submission with FormData
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productData.title || !productData.price) {
      alert("Please fill in all required fields");
      return;
    }

    if (imageFiles.length === 0) {
      toast.error("❌ Please upload at least one image");
      return;
    }

    setIsSubmitting(true);

    // Create FormData for file upload
    const formData = new FormData();

    // Append all product data
    formData.append("title", productData.title);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("description", productData.description);
    formData.append("location", productData.location);
    formData.append("condition", productData.condition);

    // Append all image files
    imageFiles.forEach((file, index) => {
      formData.append("images", file); // Note: using "images" (plural) to indicate multiple files
    });
     
    try {
      await dispatch(addProduct(formData));
      console.log("Form Data", formData);
      
      // Success animation and reset
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("✅ Product added successfully!");

        // Reset form
        setProductData({
          title: "",
          price: "",
          category: "",
          description: "",
          location: "",
          condition: "Used",
        });
        setImageFiles([]);
        setImagePreviews([]);
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      toast.error("❌ Failed to add product");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Sell Your Product
            </h1>
            <p className="text-gray-600 text-lg">
              Fill in the details below to list your item for sale
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 animate-slide-up">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="space-y-6"
            >
              {/* Two Column Layout for First Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={productData.title}
                    onChange={handleChange}
                    placeholder="e.g., iPhone 13 Pro Max"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Price (PKR) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ₨
                    </span>
                    <input
                      type="number"
                      name="price"
                      value={productData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full px-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Two Column Layout for Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
                  >
                    <option value="">Select category</option>
                    <option value="Mobiles">📱 Mobiles</option>
                    <option value="Electronics">💻 Electronics</option>
                    <option value="Vehicles">🚗 Vehicles</option>
                    <option value="Furniture">🛋️ Furniture</option>
                    <option value="Fashion">👕 Fashion</option>
                    <option value="Property">🏠 Property</option>
                  </select>
                </div>

                {/* Condition */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Condition
                  </label>
                  <select
                    name="condition"
                    value={productData.condition}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
                  >
                    <option value="Used">🔄 Used</option>
                    <option value="New">🆕 New</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={productData.location}
                  onChange={handleChange}
                  placeholder="e.g., Karachi, Lahore, Islamabad"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  placeholder="Describe your product in detail..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                ></textarea>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-semibold text-gray-700">
                    Product Images
                  </label>
                  <span className="text-sm text-gray-500">
                    {imagePreviews.length}/5 images
                  </span>
                </div>

                {/* Drag & Drop Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center transition-all duration-300 hover:border-blue-400 hover:bg-blue-50">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                    disabled={imagePreviews.length >= 5}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`cursor-pointer block ${imagePreviews.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-400 mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-gray-600 mb-1">
                        {imagePreviews.length >= 5 
                          ? "Maximum 5 images reached" 
                          : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG, JPEG up to 5MB each
                      </p>
                    </div>
                  </label>
                </div>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-4 animate-fade-in">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm font-medium text-gray-700">
                        Preview ({imagePreviews.length} images):
                      </p>
                      <button
                        type="button"
                        onClick={clearAllImages}
                        className="text-sm text-red-500 hover:text-red-700 font-medium"
                      >
                        Clear All
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={preview.id} className="relative group">
                          <img
                            src={preview.url}
                            alt={`Preview ${index + 1}`}
                            className="h-24 w-full object-cover rounded-lg shadow-md border group-hover:opacity-75 transition-opacity"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg" />
                          <button
                            type="button"
                            onClick={() => removeImage(preview.id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            ×
                          </button>
                          <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                    Posting Product...
                  </div>
                ) : (
                  "🚀 Post Product Now"
                )}
              </button>

              {/* Required Fields Note */}
              <p className="text-xs text-gray-500 text-center">
                * indicates required fields
              </p>
            </form>
          </div>
        </div>

        {/* Add custom animations to global CSS */}
        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }
          .animate-slide-up {
            animation: slide-up 0.6s ease-out;
          }
        `}</style>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default SellProduct;