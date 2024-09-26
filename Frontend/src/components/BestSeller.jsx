import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductCollections from "./ProductCollections";

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const { products } = useContext(ShopContext);
  useEffect(() => {
    const bestSellerProducts = products.filter((product) => product.bestseller);
    setBestSeller(bestSellerProducts.slice(0, 5));
  }, [products]);

  return (
    <ProductCollections
      Collection={bestSeller}
      text1={"BEST"}
      text2={"SELLER"}
    />
  );
};

export default BestSeller;
