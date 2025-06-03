import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/api";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const registerHandler = async (data) => {
    setLoader(true);
    try {
      const { data: response } = await api.post(
        "/api/auth/public/register",
        data
      );
      reset();
      navigate("/login");
      toast.success("Registration Successful!");
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed!");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 lg:px-8 px-4">
      <motion.form
        onSubmit={handleSubmit(registerHandler)}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-lg max-w-md w-full px-8 py-10"
      >
        {/* Title */}
        <h1 className="text-center text-3xl font-extrabold text-indigo-600 mb-4">
          Register Here
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Create your account to start shortening links
        </p>

        <div className="space-y-5">
          <TextField
            label="Username"
            required
            id="username"
            type="text"
            message="*Username is required"
            placeholder="Enter your username"
            register={register}
            errors={errors}
          />

          <TextField
            label="Email"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="Enter your email"
            register={register}
            errors={errors}
          />

          <TextField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Enter your password"
            register={register}
            min={6}
            errors={errors}
          />
        </div>

        <button
          disabled={loader}
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 
                     text-white font-semibold py-3 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200"
        >
          {loader ? "Loading..." : "Register"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-indigo-600 font-medium hover:underline">
              Login
            </span>
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default RegisterPage;
