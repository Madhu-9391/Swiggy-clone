import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [userEmail, setUserEmail] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUserEmail('');
    setDropdownOpen(false);
    navigate('/swiggy/login');
  };

  return (
    <>
      {/* Inline CSS */}
      <style>{`
        .header {
          background: #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          position: relative;
          z-index: 100;
        }
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 24px;
        }
        .nav1, .nav2 {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .user-dropdown {
          position: relative;
          display: inline-block;
        }
        .user-btn {
          font-weight: bold;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 6px 10px;
        }
        .user-btn:hover {
          background: #f0f0f0;
          border-radius: 6px;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 6px;
          width: 180px;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 6px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          z-index: 999;
        }
        .dropdown-menu ul {
          list-style: none;
          margin: 0;
          padding: 6px 0;
        }
        .dropdown-menu li {
          width: 100%;
        }
        .dropdown-menu a,
        .dropdown-menu button {
          display: block;
          width: 100%;
          padding: 8px 12px;
          text-align: left;
          background: none;
          border: none;
          outline: none;
          cursor: pointer;
          font-size: 14px;
          color: #333;
        }
        .dropdown-menu a:hover,
        .dropdown-menu button:hover {
          background: #f5f5f5;
        }
      `}</style>

      {/* Header JSX */}
      <header className="header">
        <div className="nav">
          {/* Left Side */}
          <div className="nav1">
            <img src="/images/logo.png" alt="logo" width="90px" height="55px" />
            <a href="">Other</a>
            <i className="ri-arrow-down-s-line"></i>
          </div>

          {/* Right Side */}
          <div className="nav2">
            <i className="ri-suitcase-line"></i>
            <a href="swiggycorporate.html">Swiggy Corporate</a>
            <a href="search.html"><i className="ri-search-line"></i> Search</a>
            <a href="offers.html"><i className="ri-discount-percent-line"></i> Offers</a>
            <a href="help.html"><i className="ri-question-line"></i> Help</a>

            {/* User Dropdown */}
            {userEmail ? (
              <div className="user-dropdown" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="user-btn"
                >
                  <i className="ri-user-3-fill"></i> {userEmail}
                </button>

                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <ul>
                      <li>
                        <Link to="/swiggy/myorders" onClick={() => setDropdownOpen(false)}>My Orders</Link>
                      </li>
                      <li>
                        <Link to="/swiggy/account" onClick={() => setDropdownOpen(false)}>My Account Info</Link>
                      </li>
                      <li>
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/swiggy/login" id="signin">
                <i className="ri-user-3-fill"></i> Sign In
              </Link>
            )}

            {/* Cart */}
            <Link to="/swiggy/cart" id="cart1">
              <i className="ri-shopping-cart-2-line"></i> Cart
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
