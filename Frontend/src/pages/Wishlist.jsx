import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">❤️ Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p>
          Wishlist is empty.{" "}
          <Link to="/products" className="text-blue-600">
            Browse Products
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover mb-3"
              />

              <h3 className="font-semibold">{item.name}</h3>
              <p className="mb-2">₹{item.price}</p>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    dispatch(addToCart({ ...item, qty: 1 }))
                  }
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() =>
                    dispatch(removeFromWishlist(item._id))
                  }
                  className="border px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
