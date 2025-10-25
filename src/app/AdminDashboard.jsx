import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import UsersManagement from "../components/UsersManagement";
import ProductsManagement from "../components/ProductsManagement";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import OrdersManagement from "../components/OrdersManagement";
import SystemSettings from "../components/SystemSettings";
import { getCurrentUser } from "../components/redux-Toolkit/features/user/userActions";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("analytics");
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log("User Data on admin dasboard", user)
  // ✅ Fetch current user once
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  // ✅ Update adminData only when `user` changes
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setAdminData({
        name: user.firstName || "Admin User",
        email: user.email || "admin@example.com",
        joinDate: "January 2024",
        role: "Administrator",
        totalUsers: 1247,
        totalProducts: 568,
        pendingOrders: 23,
        totalRevenue: "$12,847",
        systemHealth: "98%",
      });
    }
  }, [user]);

  const menuItems = [
    {
      id: "analytics",
      label: "Analytics",
      icon: "📊",
      count: adminData?.systemHealth,
    },
    {
      id: "users",
      label: "Users",
      icon: "👥",
      count: adminData?.totalUsers,
    },
    {
      id: "products",
      label: "Products",
      icon: "📦",
      count: adminData?.totalProducts,
    },
    {
      id: "orders",
      label: "Orders",
      icon: "🛒",
      count: adminData?.pendingOrders,
    },
    { 
      id: "settings", 
      label: "System Settings", 
      icon: "⚙️" 
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "analytics":
        return <AnalyticsDashboard />;
      case "users":
        return <UsersManagement />;
      case "products":
        return <ProductsManagement />;
      case "orders":
        return <OrdersManagement />;
      case "settings":
        return <SystemSettings />;
      default:
        return <AnalyticsDashboard />;
    }
  };

  if (!adminData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-80 bg-white shadow-2xl min-h-screen animate-slide-in">
            {/* Admin Profile Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {adminData.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {adminData.name}
                  </h2>
                  <p className="text-gray-600 text-sm">{adminData.email}</p>
                  <p className="text-purple-600 text-xs font-semibold bg-purple-50 px-2 py-1 rounded-full mt-1">
                    {adminData.role}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Admin since {adminData.joinDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-semibold">{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        activeTab === item.id
                          ? "bg-white text-purple-600"
                          : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8 animate-fade-in">
            <div className="max-w-6xl mx-auto">
              {/* Welcome Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 text-lg">
                  Manage your platform and monitor system performance.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Users</p>
                      <p className="text-3xl font-bold text-gray-800">
                        {adminData.totalUsers}
                      </p>
                    </div>
                    <div className="text-3xl">👥</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Products</p>
                      <p className="text-3xl font-bold text-gray-800">
                        {adminData.totalProducts}
                      </p>
                    </div>
                    <div className="text-3xl">📦</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Pending Orders</p>
                      <p className="text-3xl font-bold text-gray-800">
                        {adminData.pendingOrders}
                      </p>
                    </div>
                    <div className="text-3xl">🛒</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">System Health</p>
                      <p className="text-3xl font-bold text-gray-800">
                        {adminData.systemHealth}
                      </p>
                    </div>
                    <div className="text-3xl">⚡</div>
                  </div>
                </div>
              </div>

              {/* Dynamic Content Area */}
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;