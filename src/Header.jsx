import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    setIsLoggedIn(!!username);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header__container">
        <NavLink to="/services" onClick={closeMenu} className="header__logo">
          <img src="/logo.png" alt="LinguaBrief Logo" className="header__logo-image" />
        </NavLink>

        <button
          className="header__menu-button"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}>
          <NavLink to="/services" onClick={closeMenu} className="nav-link">
            Services
          </NavLink>

          {!isLoggedIn && (
            <>
              <NavLink to="/login" onClick={closeMenu} className="nav-link">
                Login
              </NavLink>
              <NavLink to="/signup" onClick={closeMenu} className="nav-link">
                Sign Up
              </NavLink>
            </>
          )}

          {isLoggedIn && (
            <button className="btn signout-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
