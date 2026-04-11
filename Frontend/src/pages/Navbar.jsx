import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import {
  FaShoppingCart,
  FaHeart,
  FaBars,
  FaTimes,
  FaUser,
  FaStore,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth || {});
  const { cartItems = [] } = useSelector((state) => state.cart || {});
  const { wishlistItems = [] } = useSelector((state) => state.wishlist || {});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
    setMenuOpen(false);
    setUserMenuOpen(false);
  };

  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <nav
      className={`bg-gradient-to-r from-gray-900 to-black text-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-2xl py-2" : "shadow-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            <FaStore className="text-blue-500" />
            <span className="hidden sm:inline">MyStore</span>
            <span className="sm:hidden">🛒</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            
            <Link to="/" className="hover:text-blue-400 text-sm font-medium">
              Home
            </Link>

            <Link to="/products" className="hover:text-blue-400 text-sm font-medium">
              Products
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative group">
              <FaHeart size={20} className="group-hover:text-red-400" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative group">
              <FaShoppingCart size={20} className="group-hover:text-green-400" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalCartItems}
                </span>
              )}
            </Link>

            {/* User */}
            <div className="relative" ref={userMenuRef}>
              {!user ? (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-sm hover:text-blue-400">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 hover:text-blue-400"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <FaUser size={14} />
                    </div>
                    <span className="text-sm hidden lg:inline">
                      {user.name?.split(" ")[0] || "Account"}
                    </span>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl">
                      <Link
                        to="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={logoutHandler}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 bg-gray-800 rounded-lg p-4 space-y-3">
            
            <Link to="/" onClick={() => setMenuOpen(false)}>
              🏠 Home
            </Link>

            <Link to="/products" onClick={() => setMenuOpen(false)}>
              📦 Products
            </Link>

            <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
              ❤️ Wishlist ({wishlistItems.length})
            </Link>

            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              🛒 Cart ({totalCartItems})
            </Link>

            {!user ? (
              <>
                <Link to="/login">🔑 Login</Link>
                <Link to="/register">📝 Register</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard">📊 Dashboard</Link>
                <button onClick={logoutHandler}>🚪 Logout</button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}