import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "./redux-Toolkit/features/product/productActions";

const ProductsManagement = () => {
  const dispatch = useDispatch();
  const { allProducts, loading, error } = useSelector((state) => state.product);
  console.log("All products in Admin Dashboard", allProducts);
  const [searchTerm, setSearchTerm] = useState("");
 
  console.log("All products in admin dashboard",allProducts)
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Filter products based on search term
  const filteredProducts = allProducts?.filter(
    (product) =>
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-2 text-gray-600">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-600 bg-red-50 px-4 py-3 rounded-lg text-center max-w-md mx-auto">
          Error loading products: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 w-full">
        <h2 className="text-2xl font-bold text-gray-800">
          Products Management
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 whitespace-nowrap">
            Add Product
          </button>
        </div>
      </div>

      {/* Products Count */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 w-full">
        <p className="text-gray-600">
          Total Products:{" "}
          <span className="font-semibold text-purple-600">
            {filteredProducts?.length || 0}
          </span>
        </p>
      </div>

      {/* Products Table Container with Fixed Width and Scroll */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden w-full">
        {filteredProducts && filteredProducts.length > 0 ? (
          <>
            {/* Desktop Table with Horizontal Scroll */}
            <div className="hidden lg:block w-full">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Stock
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr
                        key={product._id || product.id}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-4 py-4 max-w-xs">
                          <div className="flex items-center min-w-0">
                            {product.images && (
                              <img
                                src={product.images[0]}
                                alt={product.title}
                                className="h-10 w-10 rounded-lg object-cover mr-3 flex-shrink-0"
                              />
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 truncate">
                                {product.title}
                              </p>
                              {product.description && (
                                <p className="text-gray-500 text-sm truncate">
                                  {product.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-900 font-medium">
                          ${product.price}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              product.stock > 10
                                ? "bg-green-100 text-green-800"
                                : product.stock > 0
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              product.status === "Active" || product.stock > 0
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.status ||
                              (product.stock > 0 ? "Active" : "Out of Stock")}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 font-medium text-sm px-3 py-1 rounded border border-blue-200 hover:bg-blue-50 transition-colors whitespace-nowrap">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-900 font-medium text-sm px-3 py-1 rounded border border-red-200 hover:bg-red-50 transition-colors whitespace-nowrap">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards (below lg) */}
            <div className="lg:hidden w-full">
              <div className="p-4 space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id || product.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow w-full"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3 flex-1 min-w-0">
                        {product.images && (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-900 truncate">
                            {product.title}
                          </h3>
                          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">Category</span>
                        <span className="font-medium text-gray-900 capitalize truncate">
                          {product.category}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">Price</span>
                        <span className="font-medium text-gray-900">
                          ${product.price}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">Stock</span>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            product.stock > 10
                              ? "bg-green-100 text-green-800"
                              : product.stock > 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">Status</span>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            product.status === "Active" || product.stock > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.status ||
                            (product.stock > 0 ? "Active" : "Out of Stock")}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4 pt-3 border-t border-gray-100">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center">
                        Edit
                      </button>
                      <button className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors text-center">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 w-full">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "No products match your search criteria."
                : "There are no products in your inventory."}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsManagement;
