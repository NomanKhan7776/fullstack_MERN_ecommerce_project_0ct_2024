import { createContext, useEffect, useState } from "react";
import { produce } from "immer";
import { toast } from "react-toastify";
import axios from "axios";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

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
      if (token) {
        try {
          await axios.post(
            `${backendUrl}/api/cart/add`,
            { productId, size },
            { headers: { token } }
          );
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
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

  const updateOrRemoveFromCart = async (productId, size, quantity) => {
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
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { productId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
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

  const getProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token"))
      setToken(localStorage.getItem("token"));
    getUserCart(localStorage.getItem("token"));
  }, []);

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
    backendUrl,
    token,
    setToken,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
