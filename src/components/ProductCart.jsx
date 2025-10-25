import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  addOrder,
} from "./redux-Toolkit/features/product/productActions";
import { toast } from "react-toastify";

const placeholderImage =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 24 16' fill='none' stroke='%23999' stroke-width='1'><rect x='1' y='1' width='22' height='14' rx='2' ry='2' /><path d='M3 13l5-6 4 5 5-7 4 7' stroke-linecap='round' stroke-linejoin='round'/></svg>";

const ProductCart = () => {
  const dispatch = useDispatch();
  const {
    cartItems: rawCartItems = [],
    loading,
    error,
  } = useSelector((state) => state.product);

  // normalize cartItems if backend returns { data: [...] } or array
  const cartItems = Array.isArray(rawCartItems)
    ? rawCartItems
    : rawCartItems?.data || [];

  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [checkoutData, setCheckoutData] = useState({
    quantity: 1,
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const handleOpenCheckout = (product) => {
    setSelectedProduct(product);
    setCheckoutData({
      quantity: 1,
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
    setShowCheckout(true);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    const { quantity, cardName, cardNumber, expiryDate, cvv } = checkoutData;
    if (!cardName || !cardNumber || !expiryDate || !cvv) {
      toast.error("Please fill in all payment details");
      return;
    }

    if (!selectedProduct) {
      toast.error("No product selected for checkout");
      return;
    }

    try {
      const orderData = {
        cardName: cardName,
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv,
        totalPrice: parseInt(selectedProduct.price * quantity),
        productName: selectedProduct.title,
        productId: selectedProduct._id,
        quantity: parseInt(quantity),
      };
    console.log("Order Data:", orderData);
      const response = await dispatch(addOrder(orderData));

      if (response?.meta?.requestStatus === "fulfilled") {
        toast.success("Order placed successfully!");
        setShowCheckout(false);
      } else {
        toast.error("Checkout failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while placing the order.");
    }
  };

  if (loading) {
    return (
      <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center space-x-4 border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-gray-200 w-20 h-20 rounded-xl animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
              </div>
              <div className="h-6 bg-blue-200 rounded w-20 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="animate-fade-in relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>

      <div className="space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-600">No items in your cart.</p>
        ) : (
          cartItems.map((item) => {
            // Support both new `images` array and old `image` field
            const src =
              (Array.isArray(item.images) &&
                item.images.length > 0 &&
                item.images[0]) ||
              item.image ||
              placeholderImage;

            return (
              <div
                key={item._id || item.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="flex items-start md:items-center w-full md:w-auto">
                  <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 mr-4">
                    <img
                      src={src}
                      alt={item.title || "Product"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = placeholderImage;
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-800 truncate">
                      {item.title}
                    </h3>
                    <p className="text-gray-500">${item.price}</p>
                    <p className="text-blue-600 font-medium">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>
                </div>

                {/* Actions: keep on its own column / row depending on screen */}
                <div className="mt-4 md:mt-0 md:ml-6 flex items-center space-x-3">
                  <button
                    onClick={() => handleOpenCheckout(item)}
                    className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-colors text-sm"
                  >
                    Order Now
                  </button>

                  {/* small secondary action (example) */}
                  <button
                    onClick={() => {
                      // future: open product details or remove from cart
                      console.log("View details clicked", item._id);
                    }}
                    className="hidden md:inline-block px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-transform duration-300 scale-100 relative overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Complete Your Order</h2>
                  <p className="text-blue-100 text-sm mt-1">
                    {selectedProduct.title}
                  </p>
                </div>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="text-white/80 hover:text-white transition-colors text-xl bg-white/10 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center"
                  aria-label="Close checkout"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              <form onSubmit={handleCheckout} className="space-y-5">
                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      className="w-full border border-gray-300 rounded-xl p-3 pl-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={checkoutData.quantity}
                      onChange={(e) =>
                        setCheckoutData({
                          ...checkoutData,
                          quantity: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="John Doe"
                    value={checkoutData.cardName}
                    onChange={(e) =>
                      setCheckoutData({
                        ...checkoutData,
                        cardName: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-xl p-3 pl-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="1234 5678 9012 3456"
                      value={checkoutData.cardNumber}
                      onChange={(e) =>
                        setCheckoutData({
                          ...checkoutData,
                          cardNumber: e.target.value,
                        })
                      }
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Expiry & CVV */}
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="MM/YY"
                      value={checkoutData.expiryDate}
                      onChange={(e) =>
                        setCheckoutData({
                          ...checkoutData,
                          expiryDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        className="w-full border border-gray-300 rounded-xl p-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="123"
                        value={checkoutData.cvv}
                        onChange={(e) =>
                          setCheckoutData({
                            ...checkoutData,
                            cvv: e.target.value,
                          })
                        }
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3.5 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-800 transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Complete Purchase
                </button>
              </form>

              {/* Security Notice */}
              <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Your payment information is secure and encrypted
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCart;
