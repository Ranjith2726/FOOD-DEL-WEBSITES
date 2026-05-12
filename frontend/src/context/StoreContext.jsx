import { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  // CART ITEMS

  const [cartItems, setCartItems] = useState({});

  // SEARCH STATE

  const [search, setSearch] = useState("");

  // ADD TO CART

  const addToCart = (itemId) => {

    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId]
        ? prev[itemId] + 1
        : 1
    }));

  };

  // REMOVE FROM CART

  const removeFromCart = (itemId) => {

    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1
    }));

  };

  // TOTAL CART AMOUNT

  const getTotalCartAmount = () => {

    let totalAmount = 0;

    for (const item in cartItems) {

      if (cartItems[item] > 0) {

        let itemInfo = food_list.find(
          (product) => product._id === item
        );

        totalAmount += itemInfo.price * cartItems[item];

      }

    }

    return totalAmount;

  };

  // CONTEXT VALUE

  const contextValue = {

    food_list,

    cartItems,
    setCartItems,

    addToCart,
    removeFromCart,

    getTotalCartAmount,

    // SEARCH

    search,
    setSearch

  };

  return (

    <StoreContext.Provider value={contextValue}>

      {props.children}

    </StoreContext.Provider>

  );

};

export default StoreContextProvider;