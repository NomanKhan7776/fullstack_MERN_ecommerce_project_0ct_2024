import express from "express";
import {
  allOrders,
  allUserOrders,
  orderPlace,
  orderPlaceStripe,
  stripeWebhook,
  updateOrderStatus,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

//admin panel feature
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateOrderStatus);

//payment method feature
orderRouter.post("/place", authUser, orderPlace);
orderRouter.post("/stripe", authUser, orderPlaceStripe);

//user feature
orderRouter.post("/userorders", authUser, allUserOrders);

//stripe verify
orderRouter.post("/verifyStripe", authUser, verifyStripe);
export default orderRouter;
