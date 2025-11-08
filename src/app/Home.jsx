import { useEffect, useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import { getAllProducts, getCategoryItems } from "../components/redux-Toolkit/features/product/productActions";
import CategorySection from "../components/CategorySection";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";

const Home = () => {
  // This ensures the component re-renders cleanly on every navigation
  useEffect(() => {
    window.scrollTo(0, 0); // reset scroll position
  }, []);
  
  const [categoryProducts, setCategoryProducts] = useState({});
  const { allProducts, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  
  console.log("All Products: ", allProducts);
  
  const categories = [
    { id: "mobiles", name: "Mobiles", icon: "📱" },
    { id: "vehicles", name: "vehicles", icon: "🚗" },
    { id: "electronics", name: "Electronics", icon: "💻" },
    { id: "property", name: "Property", icon: "🏠" },
  ];

  // Fetch all products only once
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Organize products by category - FIXED FILTERING LOGIC
  useEffect(() => {
    if (allProducts && Array.isArray(allProducts)) {
      console.log("Organizing products by category...");
      
      const organized = {};
      categories.forEach((category) => {
        // Case-insensitive comparison and handle different category formats
        const categoryProducts = allProducts.filter((product) => {
          const productCategory = product.category?.toLowerCase().trim();
          const targetCategory = category.name.toLowerCase().trim();
          
          console.log(`Comparing: "${productCategory}" with "${targetCategory}"`);
          
          return productCategory === targetCategory;
        });
        
        organized[category.id] = categoryProducts;
        console.log(`Category ${category.name}:`, categoryProducts.length, "products");
      });
      
      console.log("Final organized categories:", organized);
      setCategoryProducts(organized);
    }
  }, [allProducts]);

  // Show error state if needed
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-lg font-medium text-red-800 mb-2">Failed to load products</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => dispatch(getAllProducts())}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 transition-all duration-300">
      <Header />
      <main className="px-4 sm:px-6 lg:px-8">
        {/* <Search /> */}
        <HeroSection />
        <FeaturedProducts key={Date.now()} allProducts={allProducts} loading={loading} error={error} />
        
        {/* Categories Sections */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {categories.map((category) => {
            const products = categoryProducts[category.id] || [];
            console.log(`Rendering ${category.name}:`, products.length, "products");
            
            return (
              <CategorySection
                key={category.id}
                category={category}
                products={products}
                loading={loading}
              />
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;