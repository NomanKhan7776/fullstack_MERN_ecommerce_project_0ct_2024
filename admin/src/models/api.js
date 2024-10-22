import axios from "axios";
import { backendUrl } from "../config/config.js";
export const fetchLogin = async (endpoint, email, password) => {
  try {
    const response = await axios.post(`${backendUrl}${endpoint}`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      console.error(error);
    }
  }
};
