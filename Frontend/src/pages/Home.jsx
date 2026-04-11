import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchProducts } from "../features/services/productService";

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchProducts();
        // Randomly select 3 products instead of just first 3
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 3));
        setError(null);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  // Loading skeleton
  const renderSkeleton = () => {
    return [...Array(3)].map((_, index) => (
      <div key={index} className="bg-white rounded shadow animate-pulse">
        <div className="w-full h-48 bg-gray-300 rounded-t"></div>
        <div className="p-4">
          <div className="h-6 bg-gray-300 rounded mb-2"></div>
          <div className="h-5 bg-gray-300 rounded mb-3 w-1/3"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner with improved responsive design */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Welcome to MyStore 🛒
              </h1>
              <p className="text-lg sm:text-xl mb-6 text-blue-100">
                Best place to buy quality products at affordable prices with fast delivery.
              </p>
              
              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto lg:mx-0">
                <div className="text-center">
                  <div className="text-2xl font-bold">10k+</div>
                  <div className="text-sm text-blue-200">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-blue-200">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-blue-200">Support</div>
                </div>
              </div>

              {!user ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link 
                    to="/login" 
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition transform hover:scale-105"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <Link 
                  to="/dashboard" 
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>

            <div className="hidden lg:block">
              <img
                src="https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1084.jpg"
                alt="Shopping Banner"
                className="w-full max-w-lg mx-auto rounded-lg shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🚚", title: "Free Shipping", desc: "On orders above ₹499" },
              { icon: "💰", title: "Money Back", desc: "30 days guarantee" },
              { icon: "🔒", title: "Secure Payments", desc: "100% secure" },
              { icon: "⭐", title: "Best Offers", desc: "Discounts & deals" }
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition">
                <span className="text-3xl">{feature.icon}</span>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular products loved by customers
            </p>
          </div>

          {error && (
            <div className="text-center text-red-600 mb-8 p-4 bg-red-50 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? renderSkeleton() : (
              featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <div 
                    key={product._id} 
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Link to={`/products/${product._id}`} className="block overflow-hidden rounded-t-xl">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-56 object-cover hover:scale-110 transition duration-300"
                        loading="lazy"
                      />
                    </Link>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-1">{product.name}</h3>
                      <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                        {product.description || "High quality product with best features"}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-blue-600">₹ {product.price}</span>
                        {product.rating && (
                          <span className="flex items-center text-yellow-500">
                            ⭐ {product.rating}
                          </span>
                        )}
                      </div>
                      <Link
                        to={`/products/${product._id}`}
                        className="bg-blue-600 text-white w-full block text-center py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No products available at the moment.
                </div>
              )
            )}
          </div>

          <div className="mt-12 text-center">
            <Link 
              to="/products" 
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 group"
            >
              View All Products 
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated!</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to get updates on new products and special offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}