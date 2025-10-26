import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getMyProducts,
} from "./redux-Toolkit/features/product/productActions";
import { useNavigate } from "react-router-dom";

export default function MyProducts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { myProducts, error, loading } = useSelector((state) => state.product);

  console.log("My Products: ", myProducts);

  useEffect(() => {
    dispatch(getMyProducts());
  }, [dispatch]);

  // Handle delete function
  const handleDelete = (productId) => {
    // Add your delete logic here
    console.log("Delete product:", productId);
  };

  // Loading skeleton component for list view
  const ProductSkeleton = () => (
    <div className="flex items-center py-3 px-2 animate-pulse">
      <div className="flex items-center flex-1 min-w-0">
        <div className="bg-gray-200 rounded-lg w-12 h-12 flex-shrink-0 mr-3"></div>
        <div className="flex-1 space-y-2 min-w-0">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="hidden md:block w-16 h-4 bg-gray-200 rounded mx-2"></div>
      <div className="hidden sm:block w-20 h-6 bg-gray-200 rounded mx-2"></div>
      <div className="hidden lg:block w-20 h-6 bg-gray-200 rounded mx-2"></div>
      <div className="flex space-x-1 ml-2">
        <div className="w-12 h-8 bg-gray-200 rounded"></div>
        <div className="w-12 h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  // Show loading state
  if (loading) {
    return (
      <div className="animate-fade-in max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">My Products</h2>
          <button
            onClick={() => navigate("/sellProduct")}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
          >
            Add New Product
          </button>
        </div>
        
        {/* Table Header - Hidden on mobile */}
        <div className="bg-gray-50 rounded-lg">
          <div className="hidden sm:grid sm:grid-cols-12 gap-2 py-3 px-4 text-xs sm:text-sm font-medium text-gray-600">
            <div className="sm:col-span-5 lg:col-span-4">PRODUCT</div>
            <div className="sm:col-span-2 text-right">PRICE</div>
            <div className="sm:col-span-2 text-center">STOCK</div>
            <div className="lg:col-span-2 hidden lg:block">CATEGORY</div>
            <div className="sm:col-span-3 lg:col-span-2 text-right">ACTIONS</div>
          </div>
          
          {/* Skeleton Rows */}
          <div className="divide-y divide-gray-100">
            {[1, 2, 3, 4, 5].map((item) => (
              <ProductSkeleton key={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Products</h2>
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <svg
              className="w-12 h-12 text-red-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-red-800 mb-2">
              Failed to load products
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => dispatch(getAllProducts())}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const products = myProducts?.data || myProducts || [];

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">My Products</h2>
        <button
          onClick={() => navigate("/sellProduct")}
          className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
        >
          Add New Product
        </button>
      </div>

      {products.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm">
          {/* Table Header - Hidden on mobile */}
          <div className="hidden sm:grid sm:grid-cols-12 gap-2 py-3 px-4 bg-gray-50 text-xs sm:text-sm font-medium text-gray-600 rounded-t-lg">
            <div className="sm:col-span-5 lg:col-span-4">PRODUCT</div>
            <div className="sm:col-span-2 text-right">PRICE</div>
            <div className="sm:col-span-2 text-center">STOCK</div>
            <div className="lg:col-span-2 hidden lg:block">CATEGORY</div>
            <div className="sm:col-span-3 lg:col-span-2 text-right">ACTIONS</div>
          </div>

          {/* Products List */}
          <div className="divide-y divide-gray-100">
            {products.map((item) => (
              <div
                key={item._id || item.id}
                className="flex flex-col sm:grid sm:grid-cols-12 gap-2 py-3 px-2 sm:px-4 hover:bg-gray-50 transition-colors"
              >
                {/* Product Image & Title - Full width on mobile */}
                <div className="sm:col-span-5 lg:col-span-4 flex items-center space-x-3 mb-2 sm:mb-0">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400">
                        <svg
                          className="w-5 h-5"
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
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-1">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    )}
                    {/* Mobile only price and stock */}
                    <div className="sm:hidden flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-blue-600">
                        ${item.price}
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          item.stock > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.stock > 0 ? `${item.stock} stock` : "Out of stock"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price - Hidden on mobile */}
                <div className="hidden sm:block sm:col-span-2 text-right">
                  <span className="text-sm sm:text-base font-bold text-blue-600">
                    ${item.price}
                  </span>
                </div>

                {/* Stock - Hidden on mobile */}
                <div className="hidden sm:block sm:col-span-2 text-center">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      item.stock > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
                  </span>
                </div>

                {/* Category - Hidden on mobile and tablet */}
                <div className="hidden lg:block lg:col-span-2">
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Actions */}
                <div className="sm:col-span-3 lg:col-span-2 flex justify-end sm:justify-end">
                  <div className="flex space-x-1 sm:space-x-2">
                    <button
                      onClick={() => navigate(`/edit-product/${item._id}`)}
                      className="px-2 py-1 sm:px-3 sm:py-2 bg-green-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span className="hidden xs:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-2 py-1 sm:px-3 sm:py-2 bg-red-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span className="hidden xs:inline">Delete</span>
                    </button>
                  </div>
                </div>

                {/* Mobile category - Show below on mobile */}
                <div className="sm:hidden flex justify-between items-center mt-2">
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Empty state
        <div className="text-center py-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6 text-sm">
              You haven't added any products yet. Start by adding your first
              product!
            </p>
            <button
              onClick={() => navigate("/sellProduct")}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Add Your First Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
}