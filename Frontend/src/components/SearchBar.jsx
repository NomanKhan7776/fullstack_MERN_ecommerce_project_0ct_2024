import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("collection")) {
      setShowSearch(false);
      setSearch("");
    }
    if (!showSearch) setSearch("");
  }, [location, setShowSearch, setSearch, showSearch]);

  const searchProduct = (e) => {
    setSearch(e.target.value);
  };

  if (!showSearch || !location.pathname.includes("collection")) {
    return null;
  }

  return (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 outline-none bg-inherit text-sm"
          value={search}
          onChange={searchProduct}
        />
        <img className="w-4" src={assets.search_icon} alt="Search" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt="Close"
      />
    </div>
  );
};

export default SearchBar;
