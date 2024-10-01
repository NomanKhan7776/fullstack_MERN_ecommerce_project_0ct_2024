import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductCollections from "./ProductCollections";
import ProductItem from "./ProductItem";
const RelatedCategory = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length === 0) return;

    let relatedProducts = products.filter(
      (item) => item.category === category && item.subCategory === subCategory
    );
    setRelated(relatedProducts.slice(0, 5));
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2 ">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6">
        {related.length > 0 ? (
          related.map((item) => <ProductItem key={item._id} products={item} />)
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedCategory;
