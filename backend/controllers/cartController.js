import userModel from "../models/userModel.js";

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const addToCart = async (req, res) => {
  try {
    const { userId, productId, size } = req.body;
    const updateField = `cartData.${productId}.${size}`;

    // const userData = await userModel.findById(userId);
    // let cartData = await userData.cartData;
    // if (cartData[productId]) {
    //   if (cartData[productId][size]) {
    //     cartData[productId][size] += 1;
    //   } else {
    //     cartData[productId][size] = 1;
    //   }
    // } else {
    //   cartData[productId] = {};
    //   cartData[productId][size] = 1;
    // }

    // await userModel.findByIdAndUpdate(userId, { cartData });
    const userData = await userModel.findByIdAndUpdate(
      userId,
      { $inc: { [updateField]: 1 } },
      { new: true, upsert: true }
    );
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, productId, size, quantity } = req.body;
    // const userData = await userModel.findById(userId);
    // let cartData = await userData.cartData;
    // cartData[productId][size] = quantity;
    const updateField = `cartData.${productId}.${size}`;

    const userData = await userModel.findByIdAndUpdate(
      userId,
      { $set: { [updateField]: quantity } },
      { new: true }
    );
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { getUserCart, addToCart, updateCart };
