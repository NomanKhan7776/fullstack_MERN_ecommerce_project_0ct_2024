import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    token,
    backendUrl,
    cartItems,
    setCartItems,
    products,
    cartTotal,
    delivery_fee,
  } = useContext(ShopContext);
  const navigate = useNavigate();

  // Use React Hook Form
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();

  // Handle form submission
  const onSubmit = async (formData) => {
    // await handleValidation();
    if (!method || !token) {
      toast.error("Please select a payment method");
      return;
    }
    if (!token) {
      navigate("/login");
      toast.error("Please Login To place Order");
      return;
    }
    try {
      let orderItems = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === productId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[productId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: cartTotal() + delivery_fee,
      };

      switch (method) {
        case "cod": {
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
            reset();
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }

          break;
        }
        case "stripe":
          {
            const stripeResponse = await axios.post(
              `${backendUrl}/api/order/stripe`,
              orderData,
              { headers: { token } }
            );
            if (stripeResponse.data.success) {
              const { session_url } = stripeResponse.data;
              window.location.href = session_url;
            } else {
              toast.error(stripeResponse.data.message);
            }
          }

          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleValidation = async () => {
    const isValid = await trigger();
    if (!isValid) {
      if (errors.firstname) showErrorToast(errors.firstname.message);
      if (errors.lastname) showErrorToast(errors.lastname.message);
      if (errors.email) showErrorToast(errors.email.message);
      if (errors.street) showErrorToast(errors.street.message);
      if (errors.city) showErrorToast(errors.city.message);
      if (errors.state) showErrorToast(errors.state.message);
      if (errors.country) showErrorToast(errors.country.message);
      if (errors.zipcode) showErrorToast(errors.zipcode.message);
      if (errors.phone) showErrorToast(errors.phone.message);
    }
  };

  return (
    <form
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            {...register("firstname", { required: "First name is required" })}
            placeholder="First Name"
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            {...register("lastname", { required: "Last name is required" })}
            placeholder="Last Name"
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Invalid email address",
            },
          })}
          placeholder="Email Address"
          type="email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />

        <input
          {...register("street", { required: "Street address is required" })}
          placeholder="Street"
          type="text"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />

        <div className="flex gap-3">
          <input
            {...register("city", { required: "City is required" })}
            placeholder="City"
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />

          <input
            {...register("state", { required: "State is required" })}
            placeholder="State"
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            {...register("zipcode", {
              required: "Zipcode is required",
              minLength: {
                value: 5,
                message: "Zipcode must be at least 5 characters long",
              },
            })}
            placeholder="Zipcode"
            type="number"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />

          <input
            {...register("country", { required: "Country is required" })}
            placeholder="Country"
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          {...register("phone", {
            required: "Phone number is required",
            minLength: {
              value: 10,
              message: "Phone number must be at least 10 digits long",
            },
          })}
          placeholder="Phone"
          type="number"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      {/* right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12 ">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* payment method selection */}
          <div className="flex gap-3 flex-col lg:flex-row ">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                } `}
              ></p>
              <img src={assets.stripe_logo} className="h-5 mx-4 " alt="" />
            </div>
            
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                } `}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
            onClick={handleValidation}
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
