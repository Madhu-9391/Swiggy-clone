// OrderContext.jsx
import React, { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [orders, setOrders] = useState([]);

  const addToCart = (id, name, price) => {
    setCart((prev) => ({
      ...prev,
      [id]: prev[id]
        ? { ...prev[id], qty: prev[id].qty + 1 }
        : { id, name, price, qty: 1 },
    }));
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      if (!prev[id]) return prev;
      if (prev[id].qty === 1) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return {
        ...prev,
        [id]: { ...prev[id], qty: prev[id].qty - 1 },
      };
    });
  };

  const placeOrderHandler = (restaurantName, restaurantImage, paymentMode) => {
    if (Object.keys(cart).length === 0) return null;

    const subtotal = Object.values(cart).reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );
    const DELIVERY_FEE = 40;
    const total = subtotal + DELIVERY_FEE;

    const newOrder = {
      orderId: Date.now(),
      restaurantName,
      restaurantImage,
      items: Object.values(cart),
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total,
      paymentMode,
    };

    setOrders((prev) => [...prev, newOrder]);
    setCart({});
    return newOrder.orderId;
  };

  return (
    <OrderContext.Provider
      value={{ cart, addToCart, removeFromCart, placeOrderHandler, orders }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
