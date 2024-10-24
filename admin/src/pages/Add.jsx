import { useState } from "react";
import { assets } from "../assets/assets.js";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../config/config";

const Add = ({ token }) => {
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subCategory: "Topwear",
    sizes: [],
    bestSeller: false,
  });

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setImages({ ...images, [key]: file });
    } else {
      toast.error("Please upload a valid image file (JPEG/PNG)");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const sizesToggle = (size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((item) => item !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        !form.name ||
        !form.description ||
        !form.price ||
        images.image1 === null
      ) {
        toast.error(
          "Please fill all required fields and upload at least one image"
        );
        return;
      }

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("subCategory", form.subCategory);
      formData.append("sizes", JSON.stringify(form.sizes));
      formData.append("bestSeller", form.bestSeller);

      Object.keys(images).forEach((key) => {
        if (images[key]) {
          formData.append(key, images[key]);
        }
      });

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setForm({
          name: "",
          description: "",
          price: "",
          category: "Men",
          subCategory: "Topwear",
          sizes: [],
          bestSeller: false,
        });
        setImages({
          image1: null,
          image2: null,
          image3: null,
          image4: null,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2">
          {["image1", "image2", "image3", "image4"].map((imgKey, index) => {
            return (
              <label key={imgKey} htmlFor={imgKey}>
                <img
                  className="w-20"
                  src={
                    !images[imgKey]
                      ? assets.upload_area
                      : URL.createObjectURL(images[imgKey])
                  }
                  alt={`Product Image${index + 1}`}
                />
                <input
                  onChange={(e) => handleImageChange(e, imgKey)}
                  type="file"
                  id={imgKey}
                  hidden
                />
              </label>
            );
          })}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          name="name"
          onChange={handleInputChange}
          value={form.name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          name="description"
          onChange={handleInputChange}
          value={form.description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write content here"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            name="category"
            onChange={handleInputChange}
            className="w-full px-3 py-2"
            value={form.category}
            required
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub category</p>
          <select
            name="subCategory"
            onChange={handleInputChange}
            className="w-full px-3 py-2"
            value={form.subCategory}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product price</p>
          <input
            name="price"
            onChange={handleInputChange}
            value={form.price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div key={size} onClick={() => sizesToggle(size)}>
              <p
                className={`${
                  form.sizes.includes(size) ? "bg-pink-200" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          name="bestSeller"
          onChange={() =>
            setForm((prev) => ({ ...prev, bestSeller: !prev.bestSeller }))
          }
          checked={form.bestSeller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button className="w-28 py-3 mt-4 bg-black text-white" type="submit">
        ADD
      </button>
    </form>
  );
};

export default Add;
