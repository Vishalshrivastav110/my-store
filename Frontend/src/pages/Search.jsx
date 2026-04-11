// import { useEffect, useState } from "react";
// import { useSearchParams, Link } from "react-router-dom";
// import { fetchProducts } from "../features/services/productService";
// import { FaSearch } from "react-icons/fa";

// export default function Search() {

//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const [searchParams] = useSearchParams();
//   const searchQuery = searchParams.get("search") || "";

//   // Fetch products
//   useEffect(() => {

//     const getProducts = async () => {
//       try {
//         const data = await fetchProducts();
//         setProducts(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getProducts();

//   }, []);

//   // 🔍 Search Logic
//   useEffect(() => {

//     let result = [...products];

//     if (searchQuery) {

//       const term = searchQuery.toLowerCase();

//       result = result.filter(product =>
//         [product.name, product.description, product.category]
//           .filter(Boolean)
//           .some(field =>
//             field.toLowerCase().includes(term)
//           )
//       );

//     }

//     setFilteredProducts(result);

//   }, [products, searchQuery]);

//   return (

//     <div className="max-w-7xl mx-auto px-4 py-8">

//       {/* Page Title */}
//       <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
//         <FaSearch />
//         Search Results for "{searchQuery}"
//       </h1>

//       {/* No Result */}
//       {filteredProducts.length === 0 && (
//         <p className="text-gray-500">
//           No products found.
//         </p>
//       )}

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

//         {filteredProducts.map((product) => (

//           <div
//             key={product._id}
//             className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
//           >

//             <Link to={`/products/${product._id}`}>
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-48 object-cover"
//               />
//             </Link>

//             <div className="p-4">

//               <h2 className="font-semibold text-lg mb-1">
//                 {product.name}
//               </h2>

//               <p className="text-gray-600 text-sm mb-2">
//                 {product.description?.slice(0, 60)}...
//               </p>

//               <div className="flex justify-between items-center">

//                 <span className="text-blue-600 font-bold">
//                   ₹ {product.price}
//                 </span>

//                 <Link
//                   to={`/products/${product._id}`}
//                   className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
//                 >
//                   View
//                 </Link>

//               </div>

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// }