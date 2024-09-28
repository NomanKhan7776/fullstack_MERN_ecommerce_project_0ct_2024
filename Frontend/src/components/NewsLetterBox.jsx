import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NewsLetterBox = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email }) => {
    console.log("email added", email);
    toast.success("Email Subscribed Successfully");
    reset();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, odio.
      </p>
      <form
        className="flex w-full sm:w-1/2 items-center gap-3 mx-auto mt-6 mb-2 border pl-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("email", {
            required: " Email is required",
            pattern: { value: /^\S+@\S+\.\S{2,}$/, message: "Invalid email" },
          })}
          type="email"
          placeholder="Enter Your Email"
          className="w-full sm:flex-1 outline-none"
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};

export default NewsLetterBox;
