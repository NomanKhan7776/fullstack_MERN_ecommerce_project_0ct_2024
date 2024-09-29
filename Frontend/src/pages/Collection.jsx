import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [filterProducts, setFilterProducts] = useState(products);
  const [subCategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const sortingPrice = (productsToSort) => {
    let sortedProducts = [...productsToSort];
    switch (sortType) {
      case "low-high":
        sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "relavent":
      default:
        return sortedProducts;
    }
    return sortedProducts;
  };
  const filterSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubcategory((pre) => pre.filter((item) => item !== e.target.value));
    } else {
      setSubcategory((pre) => [...pre, e.target.value]);
    }
  };
  const filterCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((pre) => [...pre, e.target.value]);
    }
  };
  useEffect(() => {
    let filtered = products;
    if (category.length > 0) {
      filtered = filtered.filter((product) =>
        category.includes(product.category)
      );
    }
    if (subCategory.length > 0) {
      filtered = filtered.filter((product) =>
        subCategory.includes(product.subCategory)
      );
    }
    if (search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    filtered = sortingPrice(filtered);
    setFilterProducts(filtered);
  }, [category, products, subCategory, search, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <motion.img
            className="h-3 sm:hidden"
            src={assets.dropdown_icon}
            alt=""
            animate={{ rotate: showFilter ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </p>
        {/* Category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={filterCategory}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={filterCategory}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={filterCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        {/* Subcategory filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={filterSubCategory}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={filterSubCategory}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={filterSubCategory}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* product sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {filterProducts.map((product) => (
            <div key={product._id}>
              <ProductItem products={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
