import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import RelatedCategory from "./RelatedCategory";

const ProductDetails = ({ productdetails, img, setImg }) => {
  const { currency, addToCart} = useContext(ShopContext);

  const [magnifyStyle, setMagnifyStyle] = useState({
    display: "none",
    top: 0,
    left: 0,
  });
  const [size, setSize] = useState("");
  const handleMouseMove = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { width, height } = target.getBoundingClientRect();

    const magnifierSize = 200;

    const translateX = Math.min(
      Math.max(offsetX - magnifierSize / 2, 0),
      width - magnifierSize
    );
    const translateY = Math.min(
      Math.max(offsetY - magnifierSize / 2, 0),
      height - magnifierSize
    );

    const xPercent = (offsetX / width) * 100;
    const yPercent = (offsetY / height) * 100;

    setMagnifyStyle({
      display: "block",
      top: `${translateY}px`,
      left: `${translateX}px`,
      backgroundImage: `url(${img})`,
      backgroundPosition: `${xPercent}% ${yPercent}%`,
      backgroundSize: "500%",
      transition:
        "top 0.1s ease, left 0.1s ease, background-position 0.1s ease",
    });
  };

  const handleMouseLeave = () => {
    setMagnifyStyle({ display: "none", top: 0, left: 0 });
  };

  return (
    <div className="border-t-2 pt-10">
      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productdetails.image.map((imgs, index) => (
              <img
                onClick={() => setImg(imgs)}
                src={imgs}
                key={index}
                alt=""
                className="w-[24%] sm:mb-3 sm:w-full flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="relative w-full sm:w-[80%]">
            {/* main image */}
            <motion.img
              key={img}
              src={img}
              alt=""
              className="w-full h-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
            {/* Magnifier div */}
            <div
              className="absolute w-[200px] h-[200px] rounded-full border-2 border-gray-300 bg-no-repeat pointer-events-none"
              style={{ ...magnifyStyle }}
            ></div>
          </div>
        </div>
        {/* product description */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productdetails.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productdetails.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productdetails.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p className="">Select Size</p>
            <div className="flex gap-2">
              {productdetails.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productdetails._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          
          <hr className="mt-8 sm:w-4/5 " />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Orignal Product.</p>
            <p>Cash On Delivery Is Available On This Product.</p>
            <p>Easy Return And Exchange policy Within 7 days.</p>
          </div>
        </div>
      </div>
      {/* description and review section */}

      <div className="mt-20 ">
        <div className="flex ">
          <b className="border px-5 py-3 text-sm ">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
            voluptate voluptatibus saepe hic exercitationem maiores eos nobis
            consectetur expedita at consequuntur sit cum aliquam praesentium
            corporis rem, illo aut nulla culpa amet, vel deserunt doloribus
            asperiores est. Velit officia impedit, placeat excepturi molestiae
            eos labore obcaecati maxime, veniam minima, earum adipisci at? Iure
            commodi, adipisci, fugit sit dolorem quo error odio harum aut eos,
            accusamus voluptatem ipsum sequi!
          </p>
          <p>
            Magnam voluptatibus optio sapiente tenetur, inventore perspiciatis
            repellendus minus! Esse eligendi dolores quia, tempora rem vel
            repellat eos dolorem eius saepe natus repellendus, quis facere non
            voluptatibus odit distinctio sit nobis atque?
          </p>
        </div>
      </div>
      {/* display related product */}
      <RelatedCategory
        category={productdetails.category}
        subCategory={productdetails.subCategory}
      />
    </div>
  );
};

export default ProductDetails;
