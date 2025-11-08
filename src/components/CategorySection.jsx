import { useState, useRef } from "react";
import { Link } from "react-router-dom";
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

export default function CategorySection({ category, products, loading }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const sliderRef = useRef(null);

  // Number of products to show per slide based on screen size
  const getProductsPerSlide = () => {
    if (typeof window === 'undefined') return 6;
    const width = window.innerWidth;
    if (width < 640) return 2;  // mobile
    if (width < 1024) return 3; // tablet
    if (width < 1280) return 4; // small desktop
    return 6; // large desktop
  };

  const productsPerSlide = getProductsPerSlide();
  const totalSlides = Math.ceil(products.length / productsPerSlide);

  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle favorite
  const handleAddToFavorites = async (id) => {
    // dispatch(addToFavorites(id)); // Uncomment if you have this action
    try {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Failed to add to favorites:", error);
    }
  };

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

    const handleFavoriteClick = (id) => {
      handleAddToFavorites(id);
      setIsFavorite(!isFavorite);
    };

    return (
      <div className="border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 bg-white flex flex-col h-full relative">
        {/* Favorite Heart Icon */}
        <button
          onClick={() => handleFavoriteClick(product._id)}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all duration-200 group"
        >
          {isFavorite ? (
            <HeartIconSolid className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors" />
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
          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 min-h-[3rem] leading-tight">
            {product.title}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-blue-600">
              ₨ {product.price?.toLocaleString()}
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full capitalize">
              {product.category}
            </span>
          </div>

          {/* Condition and Stock */}
          <div className="flex items-center justify-between text-xs">
            <span className={`px-2 py-1 rounded-full font-medium ${
              product.condition === "New" 
                ? "bg-green-100 text-green-800" 
                : "bg-gray-100 text-gray-800"
            }`}>
              {product.condition}
            </span>
            
            <span className={`px-2 py-1 rounded font-medium ${
              product.stock > 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}>
              {product.stock > 0 ? "In Stock" : "Out of stock"}
            </span>
          </div>

          {/* View Details Button */}
          <button
            onClick={() => window.location.href = `/product/${product._id}`}
            className="w-full px-3 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors mt-auto"
          >
            View Details
          </button>
        </div>
      </div>
    );
  };

  // Get products for current slide
  const getCurrentSlideProducts = () => {
    const start = currentIndex * productsPerSlide;
    const end = start + productsPerSlide;
    return products.slice(start, end);
  };

  if (loading && products.length === 0) {
    return (
      <section className="mb-16">
        <div className="animate-pulse">
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <>
      {showToast && (
        <Toast message="Added to Favourites!" onClose={() => setShowToast(false)} />
      )}
      
      <section className="mb-16 relative">
        {/* Category Header with View All Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{category.icon}</span>
            <h2 className="text-3xl font-bold text-gray-800">{category.name}</h2>
          </div>
          <Link
            to={`/category/${category.name}`}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors border border-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg"
          >
            <span>View All</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Previous products"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {currentIndex < totalSlides - 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Next products"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Products Grid */}
          <div
            ref={sliderRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {getCurrentSlideProducts().map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        {totalSlides > 1 && (
          <div className="flex justify-center space-x-2 mt-6">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}