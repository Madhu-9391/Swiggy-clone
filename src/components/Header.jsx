import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUserEmail('');
    navigate('/swiggy/login'); // Redirect to login
  };

  return (
    <header>
      <div className="nav">
        <div className="nav1">
          <img src="/images/logo.png" alt="logo" width="90px" height="55px" />
          <a href="">Other</a>
          <i className="ri-arrow-down-s-line"></i>
        </div>
        <div className="nav2">
          <i className="ri-suitcase-line"></i>
          <a href="swiggycorporate.html">Swiggy Corporate</a>
          <a href="search.html"><i className="ri-search-line"></i>Search</a>
          <a href="offers.html"><i className="ri-discount-percent-line"></i>Offers</a>
          <a href="help.html"><i className="ri-question-line"></i>Help</a>

          {
            userEmail ? (
              <>
                <span style={{ fontWeight: 'bold', marginRight: '10px' }}>
                  <i className="ri-user-3-fill"></i> {userEmail}
                </span>
                <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/swiggy/login" id="signin">
                <i className="ri-user-3-fill"></i>Sign In
              </Link>
            )
          }

          <Link to="/swiggy/cart" id="cart1">
            <i className="ri-shopping-cart-2-line"></i>Cart
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
