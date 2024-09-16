import React, { useState } from "react";
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
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your password"),
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const watchPassword = watch("password", "");

  // Simple password strength check based on length
  const calculatePasswordStrength = (password: string) => {
    if (password.length >= 6 && password.length < 8) {
      setPasswordStrength("Weak");
    } else if (password.length >= 8 && password.length < 12) {
      setPasswordStrength("Moderate");
    } else if (password.length >= 12) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("");
    }
  };

  // Watch password field and update password strength
  React.useEffect(() => {
    calculatePasswordStrength(watchPassword);
  }, [watchPassword]);

  // Handle form submission
  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("http://localhost:8899/register", {
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

        {/* Username Field */}
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

        {/* Email Field */}
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

        {/* Password Field */}
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

          {/* Password Strength */}
          {watchPassword && (
            <div className="mt-1">
              <p
                className={`text-sm font-semibold ${
                  passwordStrength === "Weak"
                    ? "text-red-500"
                    : passwordStrength === "Moderate"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                Password Strength: {passwordStrength}
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700">
            Confirm Password
            <input
              {...register("passwordConfirmation")}
              type="password"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
            {errors.passwordConfirmation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.passwordConfirmation.message}
              </p>
            )}
          </label>
        </div>

        {/* Submit Button */}
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
