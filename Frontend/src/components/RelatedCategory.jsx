import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion"; 

const containerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2, 
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

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

      {/* Framer Motion applied to the container */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileInView={"visible"}
      >
        {related.length > 0 ? (
          related.map((item) => (
            <motion.div key={item._id} variants={itemVariants}>
              <ProductItem key={item._id} products={item} />
            </motion.div>
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </motion.div>
    </div>
  );
};

export default RelatedCategory;
