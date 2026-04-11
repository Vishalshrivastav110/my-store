import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductById } from "../features/services/productService";
import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist } from "../features/wishlist/wishlistSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };
    getProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  // ✅ ADD TO CART
  const addToCartHandler = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty,
      })
    );
  };

  // ✅ ADD TO WISHLIST
  const addToWishlistHandler = () => {
    dispatch(
      addToWishlist({
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
      })
    );
  };

  // ✅ BUY NOW
  const buyNowHandler = () => {
    addToCartHandler();
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* IMAGE */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded"
            />
          </div>

          {/* DETAILS */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-blue-600 text-2xl font-semibold mb-4">
              ₹ {product.price}
            </p>
            <p className="text-gray-700 mb-6">{product.description}</p>

            {product.countInStock > 0 ? (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <label className="font-medium">Qty:</label>
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="border px-3 py-1 rounded"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={addToCartHandler}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex-1"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={addToWishlistHandler}
                    className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 flex-1"
                  >
                    Wishlist
                  </button>

                  <button
                    onClick={buyNowHandler}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex-1"
                  >
                    Buy Now
                  </button>
                </div>
              </>
            ) : (
              <p className="text-red-500 font-semibold">Out of Stock</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}