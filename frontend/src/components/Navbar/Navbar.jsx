import React, { useState, useContext } from 'react'
import './Navbar.css'
import { assets, food_list } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("menu")
  const [showSearch, setShowSearch] = useState(false)
  const [filteredFoods, setFilteredFoods] = useState([])

  const {
    getTotalCartAmount,
    search,
    setSearch
  } = useContext(StoreContext)

  // SEARCH FUNCTION

  const handleSearch = (e) => {

    const value = e.target.value

    setSearch(value)

    if (value.trim() === "") {

      setFilteredFoods([])

      return

    }

    const filtered = food_list.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredFoods(filtered)

  }

  // CLICK SEARCH ITEM

  const handleFoodClick = (id) => {

    const foodElement = document.getElementById(id)

    if (foodElement) {

      foodElement.scrollIntoView({
        behavior: "smooth",
        block: "center"
      })

    }

    setShowSearch(false)

    setSearch("")

  }

  return (

    <div className='navbar'>

      <Link to='/'>
        <img
          src={assets.logo}
          alt="logo"
          className="logo"
        />
      </Link>

      <ul className="navbar-menu">

        <li>
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            home
          </Link>
        </li>

        <li>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            menu
          </a>
        </li>

        <li>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            mobile-app
          </a>
        </li>

        <li>
          <a
            href="#footer"
            onClick={() => setMenu("contact")}
            className={menu === "contact" ? "active" : ""}
          >
            contact us
          </a>
        </li>

      </ul>

      <div className="navbar-right">

        <img
          src={assets.search_icon}
          alt="search"
          onClick={() => setShowSearch(!showSearch)}
          style={{ cursor: "pointer" }}
        />

        <div className="navbar-searchicon">

          <Link to='/cart'>

            <img
              src={assets.basket_icon}
              alt="basket"
            />

          </Link>

          <div
            className={
              getTotalCartAmount() === 0
                ? ""
                : "dot"
            }
          ></div>

        </div>

        <button onClick={() => setShowLogin(true)}>
          sign in
        </button>

      </div>

      {/* SEARCH SECTION */}

      {
        showSearch && (

          <div className="search-container">

            {/* SEARCH BOX */}

            <div className="search-box">

              <input
                type="text"
                placeholder="Search food..."
                value={search}
                onChange={handleSearch}
              />

            </div>

            {/* SEARCH RESULTS */}

            {
              search.length > 0 && (

                <div className="search-results">

                  {
                    filteredFoods.length > 0 ? (

                      filteredFoods.map((item) => (

                        <div
                          className="search-item"
                          key={item._id}
                          onClick={() =>
                            handleFoodClick(item._id)
                          }
                        >

                          <img
                            src={item.image}
                            alt={item.name}
                          />

                          <p>{item.name}</p>

                        </div>

                      ))

                    ) : (

                      <p className="no-results">
                        No food found
                      </p>

                    )
                  }

                </div>

              )
            }

          </div>

        )
      }

    </div>

  )
}

export default Navbar