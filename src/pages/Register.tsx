import React, { useState, useEffect } from "react";
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

interface RegisterFormInputs {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // Watch password field and update password strength
  useEffect(() => {
    const subscription = watch((value) => {
      if (value.password) {
        calculatePasswordStrength(value.password);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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

  const API_BASE_URL =
    import.meta.env.VITE_API_SERVER_URL || "http://localhost:8080";

  // Handle form submission
  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        // Adjusted the endpoint to match backend
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
      console.error("Registration error:", error); // Log error for debugging
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-backgroundlight dark:bg-backgrounddark">
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
              className="mt-1 p-2 block w-full border-2 border-gray-300 rounded-md"
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
              className="mt-1 p-2 block w-full border-2 border-gray-300 rounded-md"
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
              className="mt-1 p-2 block w-full border-2 border-gray-300 rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </label>

          {/* Password Strength */}
          {passwordStrength && (
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
              className="mt-1 p-2 block w-full border-2 border-gray-300 rounded-md"
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
          className={`bg-primary text-primarycontent font-semibold py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition-colors duration-300 ${
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
