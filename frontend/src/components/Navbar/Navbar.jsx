import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const { token, setToken, search, setSearch, food_list } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowProfileMenu(false);
    navigate("/");
  };

  const filteredItems = food_list.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchItemClick = (itemId) => {
    setShowSearch(false);
    setSearch("");

    if (window.location.pathname !== "/") {
      navigate("/");
    }

    setTimeout(() => {
      const element = document.getElementById(`food-${itemId}`);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="logo-text">Tomato.</h1>
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>

        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>

        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>

        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>

      <div className="navbar-right">
        <img
          src={assets.search_icon}
          alt="search"
          onClick={() => setShowSearch((prev) => !prev)}
        />

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket" />
          </Link>
          <div className="dot"></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img
              src={assets.profile_icon}
              alt="profile"
              onClick={() => setShowProfileMenu((prev) => !prev)}
            />

            {showProfileMenu && (
              <ul className="nav-profile-dropdown active-dropdown">
                <li
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate("/myorders");
                  }}
                >
                  <img src={assets.bag_icon} alt="orders" />
                  <p>Orders</p>
                </li>

                <hr />

                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="logout" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {showSearch && (
        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search food items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>

          {search && (
            <div className="search-results">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    className="search-item"
                    key={item._id}
                    onClick={() => handleSearchItemClick(item._id)}
                  >
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <span>${item.price}</span>
                  </div>
                ))
              ) : (
                <div className="no-results">Items are not there</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;