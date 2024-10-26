import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(
          `${backendUrl}/api/user/register`,
          data
        );
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        }
        reset();
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, data);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          reset();
        } else {
          toast.error();
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message);
      } else if (error.response && error.response.status === 404) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const showErrorToast = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const handleValidation = async () => {
    const isValid = await trigger();
    if (!isValid) {
      if (errors.name) showErrorToast(errors.name.message);
      if (errors.email) showErrorToast(errors.email.message);
      if (errors.password) showErrorToast(errors.password.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl ">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        {currentState === "Login" ? (
          ""
        ) : (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            {...register("name", {
              required: "Name Is Required",
              minLength: {
                value: 4,
                message: "Name must be at least 4 characters",
              },
            })}
          />
        )}

        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
        />
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer ">Forgot Your Password?</p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer"
            >
              Login Here
            </p>
          )}
        </div>
        <button
          type="submit"
          onClick={handleValidation}
          className="bg-black text-white font-light px-8 py-2 mt-4"
        >
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </>
  );
};

export default Login;
