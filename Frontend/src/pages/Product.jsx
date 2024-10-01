import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import ProductDetails from "../components/ProductDetails";
const Product = () => {
  const { productId } = useParams();
  const { products } = useContext(ShopContext);
  const [product, setProduct] = useState(null);

  const [img, setImg] = useState("");

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((item) => item._id === productId);
      setProduct(foundProduct);
      setImg(foundProduct.image[0]);
    }
  }, [productId, products]);

  return (
    <div>
      {product ? (
        <ProductDetails productdetails={product} img={img} setImg={setImg} />
      ) : (
        <p>Loading...</p>
      )}{" "}
    </div>
  );
};

export default Product;
