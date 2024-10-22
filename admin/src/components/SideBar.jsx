import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const navLinkVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
};

const SideBar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2 ">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.2, staggerChildren: 0.1 }}
        >
          <motion.div variants={navLinkVariants} whileHover="hover">
            <NavLink
              className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
              to={"/add"}
            >
              <img className="w-5 h-5" src={assets.add_icon} alt="" />
              <p className="hidden md:block">Add Items</p>
            </NavLink>
          </motion.div>

          <motion.div variants={navLinkVariants} whileHover="hover">
            <NavLink
              className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
              to={"/list"}
            >
              <img className="w-5 h-5" src={assets.order_icon} alt="" />
              <p className="hidden md:block">List Items</p>
            </NavLink>
          </motion.div>

          <motion.div variants={navLinkVariants} whileHover="hover">
            <NavLink
              className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
              to={"/orders"}
            >
              <img className="w-5 h-5" src={assets.order_icon} alt="" />
              <p className="hidden md:block">Orders</p>
            </NavLink>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SideBar;
