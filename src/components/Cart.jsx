import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

const MENU_ITEMS = [
  { id: 1, name: 'Paneer Butter Masala', price: 220 },
  { id: 2, name: 'Butter Naan', price: 40 },
  { id: 3, name: 'Veg Biryani', price: 180 },
  { id: 4, name: 'Gulab Jamun', price: 70 },
];

const DELIVERY_FEE = 40;

const Cart = () => {
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const location = useLocation();
  const { restaurantName = "Your Selected Restaurant", restaurantImage = "" } = location.state || {};

  const addToCart = (id) => {
    setCart((prevCart) => {
      const item = MENU_ITEMS.find((i) => i.id === id);
      const existing = prevCart[id] || { ...item, qty: 0 };
      return {
        ...prevCart,
        [id]: { ...existing, qty: existing.qty + 1 },
      };
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updated = { ...prevCart };
      if (updated[id]) {
        updated[id].qty -= 1;
        if (updated[id].qty <= 0) delete updated[id];
      }
      return updated;
    });
  };

  const placeOrder = () => {
    setOrderNumber(Math.floor(100000 + Math.random() * 900000));
    setCart({});
  };

  const subtotal = Object.values(cart).reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );
  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const total = subtotal + DELIVERY_FEE;

  return (
    <div>
      <Header/>
      <style>{`
        body {
          margin: 0;
          font-family: sans-serif;
          background: #f2f2f2;
        }

        .header {
          background: white;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .cart-icon {
          background: #eee;
          padding: 0.5rem;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
        }

        .cart-icon span {
          position: absolute;
          top: -8px;
          right: -8px;
          background: red;
          color: white;
          padding: 2px 6px;
          font-size: 12px;
          border-radius: 50%;
        }

        .restaurant-info {
          text-align: center;
          padding: 1rem;
        }

        .restaurant-info img {
          width: 300px;
          border-radius: 10px;
        }

        .menu {
          padding: 1rem;
          width:100%;
          height:100%;
          margin: auto;
        }

        .menu-item {
          background: white;
          margin-bottom: 1rem;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .menu-item button {
          background: #28a745;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
        }

        .cart-panel {
          position: fixed;
          top: 0;
          right: -100%;
          width: 300px;
          height: 100%;
          background: white;
          box-shadow: -2px 0 10px rgba(0,0,0,0.2);
          transition: right 0.3s ease;
          padding: 1rem;
          z-index: 1000;
          overflow-y: auto;
        }

        .cart-panel.open {
          right: 0;
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cart-header button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .cart-item {
          border-bottom: 1px solid #ddd;
          padding: 0.5rem 0;
          display: flex;
          justify-content: space-between;
        }

        .cart-item button {
          margin: 0 3px;
          padding: 3px 8px;
          border: none;
          background: #007bff;
          color: white;
          border-radius: 3px;
          cursor: pointer;
        }

        .summary {
          margin-top: 1rem;
        }

        .summary button {
          background-color: #ff6600;
          color: white;
          padding: 10px 20px;
          margin-top: 10px;
          width: 100%;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
        }

        .order-confirmation {
          text-align: center;
          padding: 2rem;
        }

        .order-confirmation h2 {
          color: green;
        }
      `}</style>

      {/* Restaurant info */}
      {restaurantName && (
        <div className="restaurant-info">
          <h2>{restaurantName}</h2>
          {restaurantImage && <img src={restaurantImage} alt={restaurantName} />}
        </div>
      )}

      {/* Cart header */}
      <div className="header">
        <h1>Swiggy Cart</h1>
        <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
          🛒<span>{totalItems}</span>
        </div>
      </div>

      {/* Menu items */}
      <div className="menu">
        {MENU_ITEMS.map((item) => (
          <div key={item.id} className="menu-item">
            <div>
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
            </div>
            <button onClick={() => addToCart(item.id)}>Add</button>
          </div>
        ))}
      </div>

      {/* Cart panel */}
      <div className={`cart-panel ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)}>✖</button>
        </div>

        <div className="cart-content">
          {orderNumber ? (
            <div className="order-confirmation">
              <h2>✅ Order Placed!</h2>
              <p>Your tracking number is: <strong>#{orderNumber}</strong></p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {Object.values(cart).map((item) => (
                  <div key={item.id} className="cart-item">
                    <div>
                      <strong>{item.name}</strong><br />
                      ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
                    </div>
                    <div>
                      <button onClick={() => removeFromCart(item.id)}>-</button>
                      <button onClick={() => addToCart(item.id)}>+</button>
                    </div>
                  </div>
                ))}
              </div>

              {totalItems > 0 && (
                <div className="summary">
                  <p>Subtotal: ₹{subtotal}</p>
                  <p>Delivery Fee: ₹{DELIVERY_FEE}</p>
                  <hr />
                  <p><strong>Total: ₹{total}</strong></p>
                  <input type="radio" name="payment" value="cod" defaultChecked />
                  <label>Cash On Delivery</label>

                  <button onClick={placeOrder}>Place Order</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
