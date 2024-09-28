import React from "react";
import { assets } from "../assets/assets";
const Footer = () => {
  return (
    <div>
      <div className="flex flex-col  sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className="">
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eaque
            itaque, molestias accusamus est exercitationem voluptatibus
            excepturi saepe corporis distinctio accusantium nostrum, ad nobis
            placeat et. Libero fugiat sed cum et,
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col text-gray-600 gap-1">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col text-gray-600 gap-1">
            <li>+92-308-32357-23</li>
            <li>nknomankhan30@gmail.com</li>
            <a
              href="https://www.linkedin.com/in/noman-khan-842a29131"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li>Linkedin</li>
            </a>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center ">Copyright 2024@ forever.com - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
