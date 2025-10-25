import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "./redux-Toolkit/features/product/productActions";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.product);

  console.log("My Orders: ", orders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const getStatusColor = (status) => {
    const colors = {
      delivered: "bg-green-100 text-green-800 border-green-200",
      shipped: "bg-blue-100 text-blue-800 border-blue-200",
      processing: "bg-yellow-100 text-yellow-800 border-yellow-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      delivered: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
      shipped: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      processing: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      cancelled: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ),
    };
    return icons[status];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading)
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Loading your orders...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 text-lg">
        Failed to load orders: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">
            View your order history and track shipments
          </p>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-500 mb-6">
              When you place orders, they will appear here.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Mobile View */}
            <div className="lg:hidden bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border-b border-gray-200 last:border-b-0 p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        #{order._id.slice(0, 10)}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDate(order.orderedAt)}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="ml-1.5 capitalize">
                        {order.status || "pending"}
                      </span>
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.items?.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="text-gray-900 font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="text-sm">
                      <span className="text-gray-600">Total: </span>
                      <span className="font-semibold text-gray-900">
                        ${order.totalPrice?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    {order.tracking && (
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Track Order
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      Order ID
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      Items
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      Total
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6 font-medium text-gray-900">
                        #{order._id.slice(0, 10)}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {formatDate(order.orderedAt)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          {order.items?.map((item, index) => (
                            <div
                              key={index}
                              className="text-sm text-gray-600"
                            >{`${item.quantity}x ${item.name}`}</div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-gray-900">
                        ${order.totalPrice?.toFixed(2) || "0.00"}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          <span className="ml-1.5 capitalize">
                            {order.status || "pending"}
                          </span>
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-3">
                          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                            View Details
                          </button>
                          {order.tracking && (
                            <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                              Track
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
