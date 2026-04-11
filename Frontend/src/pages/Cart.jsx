import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>
          Cart is empty.{" "}
          <Link to="/products" className="text-blue-600">
            Go Shopping
          </Link>
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 bg-white p-4 rounded shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>₹{item.price}</p>
                  <p>Qty: {item.qty}</p>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="text-red-600 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-bold">
              Total: ₹{totalPrice}
            </h2>

            <button className="mt-3 bg-green-600 text-white px-6 py-2 rounded">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
