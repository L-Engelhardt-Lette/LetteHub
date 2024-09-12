import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define Yup validation schema
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("/api/auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (response.data.success) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-2xl font-bold mb-4">Register</p>
        <div className="mb-4">
          <label className="block text-gray-700">
            Username
            <input
              {...register("username")}
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Email
            <input
              {...register("email")}
              type="email"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Password
            <input
              {...register("password")}
              type="password"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </label>
        </div>

        <button
          type="submit"
          className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition-colors duration-300 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
