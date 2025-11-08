import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryItems } from "./redux-Toolkit/features/product/productActions";
import Header from "./Header";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

// ✅ Toast Component
const Toast = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 animate-slide-in-right z-50">
    <span className="text-lg">❤️</span>
    <span className="font-medium">{message}</span>
    <button
      onClick={onClose}
      className="ml-2 text-white hover:text-gray-200 text-lg font-bold"
    >
      ×
    </button>
  </div>
);

export default function CategoryProducts() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allProducts, error, loading } = useSelector((state) => state.product);
  
  const [filters, setFilters] = useState({
    priceRange: [0, 5000000],
    condition: "all",
    location: "",
    sortBy: "newest"
  });
  
  const [showToast, setShowToast] = useState(false);

  console.log("All Products in product Category", allProducts);

  useEffect(() => {
    if (category) {
      dispatch(getCategoryItems(category));
    }
  }, [category, dispatch]);

  // ✅ Loading Skeleton
  const ProductSkeleton = () => (
    <div className="border border-gray-200 rounded-2xl p-4 animate-pulse">
      <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  // ✅ Product Card Component
  const ProductCard = ({ product }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddToFavorites = async (id) => {
      // dispatch(addToFavorites(id)); // Uncomment if you have this action
      try {
        setIsFavorite(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } catch (error) {
        console.error("Failed to add to favorites:", error);
      }
    };

    return (
      <div className="border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 bg-white flex flex-col h-full relative">
        {/* Favorite Heart Icon */}
        <button
          onClick={() => handleAddToFavorites(product._id)}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all duration-200 group"
        >
          {isFavorite ? (
            <HeartIconSolid className="h-6 w-6 text-red-500" />
          ) : (
            <HeartIcon className="h-6 w-6 text-gray-400 group-hover:text-red-400 transition-colors" />
          )}
        </button>

        {/* Product Image */}
        <div className="bg-gray-100 h-48 rounded-xl mb-4 flex items-center justify-center overflow-hidden flex-shrink-0">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-gray-400 flex flex-col items-center">
              <svg
                className="w-12 h-12 mb-2"
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
              <span className="text-sm">No Image</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-grow space-y-3">
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 min-h-[3.5rem]">
            {product.title}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              ₨ {product.price?.toLocaleString()}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full capitalize">
              {product.category}
            </span>
          </div>

          {product.description && (
            <p className="text-gray-600 text-sm line-clamp-3 h-12 overflow-hidden">
              {product.description}
            </p>
          )}

          {/* Condition and Location */}
          <div className="flex items-center justify-between text-sm">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.condition === "New" 
                ? "bg-green-100 text-green-800" 
                : "bg-gray-100 text-gray-800"
            }`}>
              {product.condition}
            </span>
            
            {product.location && (
              <div className="flex items-center text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="line-clamp-1 max-w-[100px]">{product.location}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 mt-auto">
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                product.stock > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of stock"}
            </span>

            <button
              onClick={() => navigate(`/product/${product._id}`)}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Filter products based on selected filters
  const filteredProducts = allProducts?.filter(product => {
    // Price filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    
    // Condition filter
    if (filters.condition !== "all" && product.condition !== filters.condition) {
      return false;
    }
    
    // Location filter
    if (filters.location && !product.location?.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Sort products
  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      default:
        return 0;
    }
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 5000000],
      condition: "all",
      location: "",
      sortBy: "newest"
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="animate-pulse mb-8">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filter Skeleton */}
              <div className="lg:col-span-1 space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
              {/* Products Skeleton */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <ProductSkeleton key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
              <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-red-800 mb-2">Failed to load products</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => dispatch(getCategoryItems(category))}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      {showToast && (
        <Toast message="Added to Favourites!" onClose={() => setShowToast(false)} />
      )}
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 capitalize mb-2">
              {category} Products
            </h1>
            <p className="text-gray-600">
              {sortedProducts?.length || 0} products found
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                  <button
                    onClick={resetFilters}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Reset All
                  </button>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange("priceRange", [filters.priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₨ 0</span>
                      <span>₨ {filters.priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Condition Filter */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Condition</h3>
                  <div className="space-y-2">
                    {["all", "New", "Used"].map(condition => (
                      <label key={condition} className="flex items-center">
                        <input
                          type="radio"
                          name="condition"
                          value={condition}
                          checked={filters.condition === condition}
                          onChange={(e) => handleFilterChange("condition", e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700 capitalize">
                          {condition === "all" ? "All Conditions" : condition}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Location</h3>
                  <input
                    type="text"
                    placeholder="Enter city..."
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Sort By */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Sort By</h3>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {sortedProducts?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product._id || product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                    </svg>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {allProducts?.length === 0 
                        ? `No products available in ${category} category`
                        : "No products match your filters"
                      }
                    </p>
                    {allProducts?.length > 0 && (
                      <button
                        onClick={resetFilters}
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}