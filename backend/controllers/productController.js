import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      sizes,
      category,
      subCategory,
      bestSeller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const product = new productModel({
      name,
      description,
      price: Number(price),
      image: imageUrl,
      category,
      subCategory,
      bestSeller: bestSeller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      date: Date.now(),
    });

    const newProduct = await product.save();

    res.status(200).json({ success: true, messasge: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ successfull: false, message: error.message });
  }
};

const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ successfull: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.log(error);
    res.json({ successfull: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    if (product === null)
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ successfull: false, message: error.message });
  }
};

export { addProduct, removeProduct, listProduct, singleProduct };
