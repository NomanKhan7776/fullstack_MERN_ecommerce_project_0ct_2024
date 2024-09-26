import React, { useContext, useEffect, useState } from "react";

import ProductCollections from "./ProductCollections";
import { ShopContext } from "../context/ShopContext";

function LatestCollection() {
  const [latestCollection, setLatestCollection] = useState([]);
  const { products } = useContext(ShopContext);
  useEffect(() => {
    setLatestCollection(products.slice(0, 10));
  }, [products]);
  return (
    <ProductCollections
      Collection={latestCollection}
      text1={"LATEST"}
      text2={"COLLECTION"}
    />
  );
}

export default LatestCollection;
