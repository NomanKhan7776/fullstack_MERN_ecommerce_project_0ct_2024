import { useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Navebar = () => {
  const [visible, setVisible] = useState(false);

  // Framer Motion variants for the navbar animation
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Framer Motion variants for the sidebar animation
  const sidebarVariants = {
    open: {
      width: "100vw",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        staggerChildren: 0.2,
      },
    },
    closed: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Framer Motion variants for the individual NavLinks with hover effect
  const linkVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    hover: {
      scale: 1.05,
      backgroundColor: "#333",
      color: "#fff",
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className="flex justify-between items-center py-5 font-medium"
    >
      <img src={assets.logo} alt="logo" />
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to={"/"} className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to={"/collection"}
          className="flex flex-col items-center gap-1"
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to={"/about"} className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to={"/contact"} className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img src={assets.search_icon} alt="" className="w-5 cursor-pointer" />
        <div className="group relative">
          <img
            src={assets.profile_icon}
            alt=""
            className="w-5 min-w-5 cursor-pointer"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-slate-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to={"/cart"} className="relative">
          <img src={assets.cart_icon} alt="" className="w-5 min-w-5 " />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 rounded-full bg-black text-white aspect-square text-[8px]">
            10
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt=""
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* Sidebar for Small Screens */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={visible ? "open" : "closed"}
        className="fixed top-0 right-0 bottom-0 bg-white overflow-hidden z-50"
      >
        <div className="flex flex-col text-gray-600 h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>

          {/* Animated NavLinks with hover effect */}
          <motion.div
            variants={linkVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="py-2 pl-6 border"
          >
            <NavLink onClick={() => setVisible(false)} to={"/"}>
              HOME
            </NavLink>
          </motion.div>

          <motion.div
            variants={linkVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="py-2 pl-6 border"
          >
            <NavLink onClick={() => setVisible(false)} to={"/collection"}>
              COLLECTION
            </NavLink>
          </motion.div>

          <motion.div
            variants={linkVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="py-2 pl-6 border"
          >
            <NavLink onClick={() => setVisible(false)} to={"/about"}>
              ABOUT
            </NavLink>
          </motion.div>

          <motion.div
            variants={linkVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="py-2 pl-6 border"
          >
            <NavLink onClick={() => setVisible(false)} to={"/contact"}>
              CONTACT
            </NavLink>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Navebar;
