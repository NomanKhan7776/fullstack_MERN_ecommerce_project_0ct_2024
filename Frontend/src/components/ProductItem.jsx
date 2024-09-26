import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ products }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      className="text-gray-700 cursor-pointer"
      to={`/product/${products._id}`}
    >
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={products.image[0]}
          alt=""
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{products.name}</p>
      <p className="text-sm font-medium">
        {currency}
        {products.price}
      </p>
    </Link>
  );
};

export default ProductItem;
