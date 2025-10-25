import React, { useState } from 'react';

const CategoriesManagement = () => {
  const [categories] = useState([
    { id: 1, name: 'Electronics', products: 45, status: 'Active' },
    { id: 2, name: 'Clothing', products: 89, status: 'Active' },
    { id: 3, name: 'Home & Garden', products: 34, status: 'Active' },
    { id: 4, name: 'Sports', products: 23, status: 'Inactive' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Categories Management</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                category.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {category.status}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{category.products} products</p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Edit
              </button>
              <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesManagement;