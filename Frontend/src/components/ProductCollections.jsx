import React from "react";
import { motion } from "framer-motion";
import Title from "./Title";
import ProductItem from "./ProductItem";

const ProductCollections = ({ Collection = [], text1 = "", text2 = "" }) => {
  // Framer Motion Variants for animation
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="mt-10 mb-12">
      <div className="text-center py-8 text-3xl">
        <Title text1={`${text1}`} text2={`${text2}`} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
          nam
        </p>
      </div>

      {/* Grid container with Framer Motion animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6"
      >
        {Collection.map((product) => (
          <motion.div key={product._id} variants={itemVariants}>
            <ProductItem products={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductCollections;
