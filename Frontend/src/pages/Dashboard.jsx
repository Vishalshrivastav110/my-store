import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaShoppingBag,
  FaHeart,
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
  FaBox,
  FaCog,
  FaChartLine,
  FaBell,
  FaEnvelope,
  FaStar,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt
} from "react-icons/fa";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems = [] } = useSelector((state) => state.cart || {});
  const { wishlistItems = [] } = useSelector((state) => state.wishlist || {});
  
  const [activeTab, setActiveTab] = useState("overview");
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration (replace with actual API calls)
  useEffect(() => {
    // Simulate fetching user data
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Mock recent orders
        const mockOrders = [
          { id: 1, date: "2024-01-15", total: 1299, status: "Delivered", items: 2 },
          { id: 2, date: "2024-01-10", total: 899, status: "Shipped", items: 1 },
          { id: 3, date: "2024-01-05", total: 2499, status: "Processing", items: 3 },
        ];
        setRecentOrders(mockOrders);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Delivered": return "text-green-600 bg-green-100";
      case "Shipped": return "text-blue-600 bg-blue-100";
      case "Processing": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  // Statistics
  const stats = [
    { label: "Total Orders", value: recentOrders.length, icon: FaBox, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Cart Items", value: cartItems.length, icon: FaShoppingCart, color: "text-green-600", bg: "bg-green-100" },
    { label: "Wishlist", value: wishlistItems.length, icon: FaHeart, color: "text-pink-600", bg: "bg-pink-100" },
    { label: "Reviews", value: 5, icon: FaStar, color: "text-yellow-600", bg: "bg-yellow-100" }, // Mock data
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header with Cover Image */}
        <div className="relative mb-8">
          <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl"></div>
          <div className="bg-white rounded-b-2xl shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white -mt-12">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              </div>
              
              {/* Last login (mock) */}
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <div className="text-sm text-gray-500">
                  <FaClock className="inline mr-1" />
                  Last login: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex flex-wrap gap-2">
            {[
              { id: "overview", label: "Overview", icon: FaChartLine },
              { id: "orders", label: "Orders", icon: FaBox },
              { id: "profile", label: "Profile", icon: FaUser },
              { id: "settings", label: "Settings", icon: FaCog },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <tab.icon />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                  <div className={`${stat.bg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <stat.icon className={`${stat.color} text-xl`} />
                  </div>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FaBox className="text-blue-600" />
                  Recent Orders
                </h2>
                <Link to="/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All →
                </Link>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex justify-between items-center">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  ))}
                </div>
              ) : recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className="flex items-center gap-4 mb-2 sm:mb-0">
                        <div className="bg-blue-100 p-2 rounded">
                          <FaTruck className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-gray-600">{order.date} • {order.items} items</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <span className="font-bold">₹{order.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FaBox className="text-4xl mx-auto mb-3 text-gray-400" />
                  <p>No orders yet</p>
                  <Link to="/products" className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block">
                    Start Shopping →
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                to="/products"
                className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition group"
              >
                <FaShoppingBag className="text-2xl text-blue-600 mx-auto mb-2 group-hover:scale-110 transition" />
                <h3 className="font-medium">Shop</h3>
                <p className="text-xs text-gray-500">Browse products</p>
              </Link>
              <Link
                to="/cart"
                className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition group"
              >
                <FaShoppingCart className="text-2xl text-green-600 mx-auto mb-2 group-hover:scale-110 transition" />
                <h3 className="font-medium">Cart</h3>
                <p className="text-xs text-gray-500">{cartItems.length} items</p>
              </Link>
              <Link
                to="/wishlist"
                className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition group"
              >
                <FaHeart className="text-2xl text-pink-600 mx-auto mb-2 group-hover:scale-110 transition" />
                <h3 className="font-medium">Wishlist</h3>
                <p className="text-xs text-gray-500">{wishlistItems.length} items</p>
              </Link>
              {/* <Link
             
                to="/profile"
                className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition group"
              >
                <FaUser className="text-2xl text-purple-600 mx-auto mb-2 group-hover:scale-110 transition" />
                <h3 className="font-medium">Profile</h3>
                <p className="text-xs text-gray-500">Manage account</p>
              </Link> */}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <FaBox className="text-blue-600" />
              My Orders
            </h2>
            
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse h-20 bg-gray-100 rounded"></div>
                ))}
              </div>
            ) : recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex flex-wrap justify-between items-center mb-3">
                      <div>
                        <span className="font-semibold">Order #{order.id}</span>
                        <span className="text-sm text-gray-600 ml-3">{order.date}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Items: {order.items}</span>
                      <span className="text-lg font-bold text-blue-600">₹{order.total}</span>
                    </div>
                    <button className="mt-3 text-sm text-blue-600 hover:text-blue-700">
                      View Details →
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaBox className="text-5xl mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                <p className="text-gray-500 mb-4">Looks like you haven't placed any orders</p>
                <Link to="/products" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <FaUser className="text-blue-600" />
              Profile Information
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="p-3 bg-gray-50 rounded-lg">{user?.name || 'Not provided'}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="p-3 bg-gray-50 rounded-lg">{user?.email || 'Not provided'}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="p-3 bg-gray-50 rounded-lg">{user?.phone || 'Not provided'}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                  <div className="p-3 bg-gray-50 rounded-lg">{user?.createdAt?.split('T')[0] || 'January 2024'}</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  {user?.address || '123 Main Street, City, State 12345'}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Edit Profile
                </button>
                <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <FaCog className="text-blue-600" />
              Account Settings
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaBell className="text-blue-600" />
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Receive updates about orders and promotions</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-600" />
                  <div>
                    <h3 className="font-medium">Marketing Emails</h3>
                    <p className="text-sm text-gray-600">Receive special offers and deals</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="pt-4">
                <button className="text-red-600 hover:text-red-700 font-medium">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={logoutHandler}
            className="flex items-center gap-2 bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition transform hover:scale-105"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}