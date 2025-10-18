import React, { useState } from 'react';
import { OrderProvider } from "./components/OrderContext";
import './App.css';
import AdminDashBoard from "./components/AdminDashBoard";
import Cart from './components/Cart'; 
import Header from './components/Header';
import Parts from './components/Parts';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import MyOrders from './components/MyOrders';
import UsersManagement from './components/admin/UsersManagement';
import AdminOrders from './components/admin/AdminOrders';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

const MENU_ITEMS = [
  { id: 1, name: 'Paneer Butter Masala', price: 220 },
  { id: 2, name: 'Butter Naan', price: 40 },
  { id: 3, name: 'Veg Biryani', price: 180 },
  { id: 4, name: 'Gulab Jamun', price: 70 },
];

function AppLayout() {
  const location = useLocation();
  const hideLayoutRoutes = ['/swiggy/login', '/swiggy/register','/swiggy/cart','/swiggy/admin','/swiggy/admin/users','/swiggy/admin/orders','/swiggy/myorders','/swiggy/admin'];
  const isMinimalLayout = hideLayoutRoutes.includes(location.pathname);

  // ✅ Lifted cart state to App
  const [cart, setCart] = useState({});
  const [orders, setOrders] = useState([]);

  const addToCart = (id,name,price) => {
  setCart(prevCart => {
    const item = MENU_ITEMS.find((i) => i.id === id);
    if (!item) return prevCart; // safety check

    const existing = prevCart[id] || { id: item.id, name, price: Number(price), qty: 0 };

    return {
      ...prevCart,
      [id]: {
        ...existing,
        qty: existing.qty + 1,
        price: Number(item.price), // ✅ ensure always a number
      },
    };
  });
};

  

  const removeFromCart = (id) => {
    setCart(prevCart => {
      const updated = { ...prevCart };
      if (updated[id]) {
        updated[id].qty -= 1;
        if (updated[id].qty <= 0) delete updated[id];
      }
      return updated;
    });
  };

  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);

  // ✅ Place order handler for Cart component
  const placeOrderHandler = (cart, restaurantName, restaurantImage) => {
  if (Object.keys(cart).length === 0) return;

  const orderItems = Object.values(cart).map(item => ({
    id: item.id,
    name: item.name,
    qty: Number(item.qty),      // ensure number
    price: Number(item.price),  // ensure number
  }));

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const total = subtotal + 40; // DELIVERY_FEE

  // ✅ Generate a random order number
  const orderNumber = Math.floor(100000 + Math.random() * 900000);



    const newOrder = {
      orderNumber,
      restaurantName,
      restaurantImage,
      items: orderItems,
      total,
      paymentType: "Cash On Delivery",
    };
console.log("Cart before placing order:", cart);
console.log("Order items:", orderItems);

    setOrders(prev => [newOrder, ...prev]);
    return orderNumber;
  };

  return (
  <OrderProvider
    value={{
      cart, setCart,
      orders, setOrders,
      addToCart, removeFromCart,
      placeOrderHandler, totalItems,
    }}
  >
    <div className="App1">
      {!isMinimalLayout && <Header totalItems={totalItems} />}
      <Routes>
        <Route
          path="swiggy/admin"
          element={<AdminDashBoard/>}>
          <Route path="users" element={<UsersManagement />} />
          <Route path="orders" element={<AdminOrders />} />
          
        </Route>

        <Route path="/swiggy/login" element={<Login />} />
        <Route path="/swiggy/register" element={<Register />} />
        <Route path="/swiggy/cart" element={<Cart />} />
        <Route path="/swiggy/myorders" element={<><Header/><MyOrders /><Footer/></>} />
      </Routes>
      {!isMinimalLayout && <Parts />}
      {!isMinimalLayout && <Footer />}
    </div>
  </OrderProvider>
);

}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
