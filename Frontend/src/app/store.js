import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import orderReducer from "../features/order/myorderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,           // ✅ MUST
    wishlist: wishlistReducer,   // ✅ MUST
    order: orderReducer,          // ✅ MUST
  },
});
