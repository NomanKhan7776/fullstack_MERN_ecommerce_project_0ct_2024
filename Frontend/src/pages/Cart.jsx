import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
const Cart = () => {
  const { products, cartItems, currency, updateOrRemoveFromCart } =
    useContext(ShopContext);
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (products.length > 0) {
      let tempData = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const existantProduct = tempData.find(
              (item) => item._id === productId && item.size === size
            );
            if (existantProduct) {
              existantProduct.quantity += cartItems[productId][size];
            } else {
              tempData.push({
                _id: productId,
                size: size,
                quantity: cartItems[productId][size],
              });
            }
          }
        }
      }
      setCartProducts(tempData);
    }
  }, [cartItems, products]);
  return (
    <div className="border-t pt-14 ">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div className="">
        {cartProducts.length > 0 ? (
          cartProducts.map((item, index) => {
            let productData = products.find(
              (product) => product._id === item._id
            );
            return (
              <div
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 "
                key={`${item._id}-${item.size}`}
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20 "
                    src={productData.image[0]}
                    alt=""
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateOrRemoveFromCart(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <img
                  onClick={() => updateOrRemoveFromCart(item._id, item.size, 0)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt=""
                />
              </div>
            );
          })
        ) : (
          <p>There is no Item In the cart</p>
        )}
      </div>
      {cartProducts.length > 0 ? (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <button
                onClick={() => navigate("/place-order")}
                className="bg-black text-white text-sm my-8 px-8 py-3"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
