import Order from "../models/order.js";

export const createOrder = async (req, res) => {
  const { orderItems, totalAmount, address } = req.body;

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    totalAmount,
    address
  });

  res.json(order);
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};
