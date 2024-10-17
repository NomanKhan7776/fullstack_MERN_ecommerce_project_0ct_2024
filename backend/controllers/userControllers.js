import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createToken from "../utils/generateToken.js";

//route for login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email))
    return res
      .status(404)
      .json({ success: false, message: "email is INVALID" });
  const existUser = await userModel.findOne({ email });
  if (!existUser) {
    return res
      .status(404)
      .json({ success: false, message: "invalid email and password" });
  }
  const isMatch = await bcrypt.compare(password, existUser.password);
  if (isMatch) {
    const token = createToken(existUser._id);
    res.status(200).json({ success: true, token });
  } else {
    res
      .status(404)
      .json({ success: false, message: "invalid email and password" });
  }
};

//route for register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await userModel.findOne({ email });
    if (existUser)
      return res
        .status(409)
        .json({ success: false, message: "user already exist" });
    if (!validator.isEmail(email))
      return res.json({ success: false, message: "Enter a valid Email" });

    if (password.length < 8)
      return res.json({
        success: false,
        message: "Please Enter a strong Password",
      });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error.message });
  }
};

//route for adminlogin
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = await jwt.sign(email + password, process.env.JWT_SECRET);
      res.status(200).json({ success: true, token });
    } else {
      res.status(404).json({ success: false, message: "invalid credintials" });
    }
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
