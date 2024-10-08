import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { produce } from "immer";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (productId, size) => {
    if (!size) return toast.error("Please select a size before adding to cart");
    try {
      setCartItems((currentCartItems) =>
        produce(currentCartItems, (draft) => {
          if (!draft[productId]) {
            draft[productId] = {};
          }
          if (!draft[productId][size]) {
            draft[productId][size] = 0;
          }
          draft[productId][size] += 1;
        })
      );
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        totalCount += cartItems[productId][size];
      }
    }
    return totalCount;
  };

  const updateOrRemoveFromCart = (productId, size, quantity) => {
    setCartItems((currentCartItems) =>
      produce(currentCartItems, (draft) => {
        if (quantity > 0) {
          draft[productId][size] = quantity;
        } else {
          delete draft[productId][size];
          if (Object.keys(draft[productId]).length === 0) {
            delete draft[productId];
          }
        }
      })
    );
  };

  const cartTotal = () => {
    let totalAmount = 0;
    for (const productId in cartItems) {
      let cartProduct = products.find((item) => item._id === productId);
      if (!cartProduct) {
        console.warn(`Product with id ${productId} not found.`);
        continue;
      }
      for (const size in cartItems[productId]) {
        try {
          const quantity = cartItems[productId][size];
          if (typeof quantity === "number" && quantity > 0)
            totalAmount += cartProduct.price * quantity;
        } catch (error) {
          console.error(error);
        }
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    showSearch,
    setSearch,
    setShowSearch,
    addToCart,
    cartItems,
    getCartCount,
    updateOrRemoveFromCart,
    cartTotal,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
