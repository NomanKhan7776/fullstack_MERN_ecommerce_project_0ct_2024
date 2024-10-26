import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudnary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/userCartRoute.js";
import orderRouter from "./routes/orderRout.js";
import { stripeWebhook } from "./controllers/orderController.js";
//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/api/order/webhook", express.raw({ type: "application/json" }), stripeWebhook);

// Content Security Policy middleware
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://js.stripe.com 'sha256-/5Guo2nzv5n/w6ukZpOBZOtTJBJPSkJ6mhHpnBgm3Ls='; style-src 'self' 'unsafe-inline';"
  );
  next();
});

//api endpoint
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order/", orderRouter);
app.get("/", (req, res) => {
  res.send("api working");
});

app.listen(port, () => console.log("server started on port:" + port));
