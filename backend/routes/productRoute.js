import express from "express";
import {
  addProduct,
  singleProduct,
  listProduct,
  removeProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/delete", adminAuth, removeProduct);
productRouter.get("/list", listProduct);
productRouter.post("/single", singleProduct);

export default productRouter;