import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../features/order/myorderSlice";
import { Link } from "react-router-dom";

export default function MyOrders() {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const ordersArray = Array.isArray(orders) ? orders : [];

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (error)
    return <h2 className="text-center mt-10 text-red-500">{error}</h2>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {ordersArray.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        <div className="space-y-4">
          {ordersArray.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-lg shadow-sm bg-white"
            >
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-500">
                  Order ID: {order._id}
                </p>
                <p className="text-sm font-semibold text-green-600">
                  ₹{order.totalPrice}
                </p>
              </div>

              <p className="text-sm mb-2">
                Status:{" "}
                <span className="font-medium">
                  {order.isDelivered ? "Delivered" : "Pending"}
                </span>
              </p>

              <div className="space-y-2">
                {order.orderItems?.map((item) => (
                  <div
                    key={item.product}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} x ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to={`/order/${order._id}`}
                className="inline-block mt-3 text-blue-600 text-sm hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}