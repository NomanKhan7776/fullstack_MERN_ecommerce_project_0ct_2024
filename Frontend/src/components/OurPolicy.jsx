import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      {/* Policy Item 1 */}
      <motion.div
        whileHover={{ scale: 1.1, translateY: -5 }} // Hover animation
        className="cursor-pointer"
      >
        <img src={assets.exchange_icon} alt="" className="w-12 m-auto mb-5 " />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We Offer hassle Free Exchange Policy</p>
      </motion.div>

      {/* Policy Item 2 */}
      <motion.div
        whileHover={{ scale: 1.1, translateY: -5 }} // Hover animation
        className="cursor-pointer"
      >
        <img src={assets.quality_icon} alt="" className="w-12 m-auto mb-5 " />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">We Provide 7 Days Free Return Policy</p>
      </motion.div>

      {/* Policy Item 3 */}
      <motion.div
        whileHover={{ scale: 1.1, translateY: -5 }} // Hover animation
        className="cursor-pointer"
      >
        <img src={assets.support_img} alt="" className="w-12 m-auto mb-5 " />
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-gray-400">We Provide 24/7 Support</p>
      </motion.div>
    </div>
  );
};

export default OurPolicy;
