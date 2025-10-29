import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignInAlt, FaSignOutAlt, FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";
import logo from '../assets/Images/logo.png';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);

  const getCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    return count;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setCartItemCount(getCartCount()); 
      setIsLoggedIn(!!token);
    };

    window.addEventListener('storage', handleStorageChange);
    setCartItemCount(getCartCount()); 

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4 mb-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-5">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="ShivAmbar Jewels Logo" className="h-10 w-auto" />
            <span className="font-semibold text-xl text-gray-800">ShivAmbar Jewels</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6 absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="text-gray-600 hover:text-indigo-500">Home</Link>
          <Link to="/products" className="text-gray-600 hover:text-indigo-500">Products</Link>
          <Link to="/about" className="text-gray-600 hover:text-indigo-500">About Us</Link>
          <Link to="/contact" className="text-gray-600 hover:text-indigo-500">Contact</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="text-gray-600 hover:text-indigo-500 relative" title="Cart">
            <FaShoppingCart className="text-2xl" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="text-gray-600 hover:text-indigo-500" title="Profile">
                <FaUserCircle className="text-2xl" />
              </Link>
              <button onClick={handleLogout} className="flex items-center text-gray-600 hover:text-indigo-500" title="Logout">
                <FaSignOutAlt className="text-2xl" />
              </button>
            </>
          ) : (
            <Link to="/login" className="flex items-center text-gray-600 hover:text-indigo-500" title="Login">
              <FaUserCircle className="text-2xl" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}