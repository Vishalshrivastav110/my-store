import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchProducts } from "../features/services/productService";
import { 
  FaSearch, 
  FaFilter, 
  FaSortAmountDown, 
  FaSortAmountUp,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaStar,
  FaRegStar
} from "react-icons/fa";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  
  // Categories (extract from products)
  const [categories, setCategories] = useState([]);
  
  // URL params for sharing filters
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories);
        
        // Check URL params for filters
        const categoryParam = searchParams.get('category');
        const searchParam = searchParams.get('search');
        
        if (categoryParam) setSelectedCategory(categoryParam);
        if (searchParam) setSearchTerm(searchParam);
        
        setError(null);
      } catch (err) {
        setError("Failed to load products. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [searchParams]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Apply price filter
    result = result.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Apply sorting
    switch(sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle filter changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchParams({ category, search: searchTerm });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchParams({ category: selectedCategory, search: e.target.value });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange({ min: 0, max: 10000 });
    setSortBy("default");
    setSearchParams({});
  };

  // Loading skeleton
  const renderSkeleton = () => {
    return [...Array(6)].map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md animate-pulse">
        <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
        <div className="p-4">
          <div className="h-6 bg-gray-300 rounded mb-2"></div>
          <div className="h-5 bg-gray-300 rounded mb-3 w-1/3"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    ));
  };

  // Render stars for rating
  const renderStars = (rating = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300 inline" />);
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            All Products
          </h1>
          <p className="text-gray-600">
            Discover our collection of high-quality products
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="md:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Filter Toggle Button (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            <FaFilter />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`
            md:w-64 md:block
            ${showFilters ? 'block' : 'hidden'}
          `}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedCategory === "all"}
                      onChange={() => handleCategoryChange("all")}
                      className="mr-2"
                    />
                    All Categories
                  </label>
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={() => handleCategoryChange(category)}
                        className="mr-2"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Min: ₹{priceRange.min}</label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Max: ₹{priceRange.max}</label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(searchTerm || selectedCategory !== "all" || priceRange.min > 0 || priceRange.max < 10000) && (
                <div>
                  <h3 className="font-medium mb-2">Active Filters</h3>
                  <div className="flex flex-wrap gap-2">
                    {searchTerm && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center">
                        Search: {searchTerm}
                        <button onClick={() => setSearchTerm("")} className="ml-1">
                          <FaTimes size={12} />
                        </button>
                      </span>
                    )}
                    {selectedCategory !== "all" && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center">
                        {selectedCategory}
                        <button onClick={() => setSelectedCategory("all")} className="ml-1">
                          <FaTimes size={12} />
                        </button>
                      </span>
                    )}
                    {(priceRange.min > 0 || priceRange.max < 10000) && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                        ₹{priceRange.min} - ₹{priceRange.max}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {error && (
              <div className="text-center text-red-600 mb-8 p-4 bg-red-50 rounded">
                {error}
              </div>
            )}

            {/* Results count */}
            {!loading && !error && (
              <p className="text-gray-600 mb-4">
                Showing {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? renderSkeleton() : (
                currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <div 
                      key={product._id} 
                      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <Link to={`/products/${product._id}`} className="block overflow-hidden rounded-t-lg">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-48 object-cover hover:scale-110 transition duration-300"
                          loading="lazy"
                        />
                      </Link>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-1 line-clamp-1">{product.name}</h3>
                        
                        {/* Rating */}
                        {product.rating && (
                          <div className="flex items-center mb-2">
                            {renderStars(product.rating)}
                            <span className="text-sm text-gray-600 ml-2">
                              ({product.numReviews || 0})
                            </span>
                          </div>
                        )}
                        
                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {product.description || "High quality product with best features"}
                        </p>
                        
                        {/* Price and Category */}
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-2xl font-bold text-blue-600">
                            ₹ {product.price}
                          </span>
                          {product.category && (
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {product.category}
                            </span>
                          )}
                        </div>
                        
                        <Link
                          to={`/products/${product._id}`}
                          className="bg-blue-600 text-white w-full block text-center py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 mb-4">No products match your filters.</p>
                    <button
                      onClick={clearFilters}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Clear all filters
                    </button>
                  </div>
                )
              )}
            </div>

            {/* Pagination */}
            {!loading && filteredProducts.length > productsPerPage && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-lg ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <FaChevronLeft />
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === index + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-lg ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}