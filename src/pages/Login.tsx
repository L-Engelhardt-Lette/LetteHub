import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Define the schema using Yup
const schema = yup.object().shape({
  identifier: yup.string().required("Email or Name is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Initialize the form with React Hook Form and Yup Resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema), // Integrate Yup with React Hook Form
    mode: "onChange", // This ensures isValid is updated as the user types
  });

  const onSubmit = async (data: any) => {
    try {
      await login(data.identifier, data.password);
      toast.success("Welcome!");
      navigate("/dashboard"); // Redirect only on successful login
    } catch (error) {
      toast.error("Login failed"); // This will be caught by the AuthContext logic
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-2xl font-bold mb-4">Login</p>
        <p className="text-sm text-gray-600 mb-6">
          Login now and get full access to our app.
        </p>

        <div className="mb-4">
          <label className="block text-gray-700">
            Email or Name
            <input
              {...register("identifier")}
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your email or name"
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">
                {errors.identifier.message}
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
          className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center ${
            !isValid || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isValid || isSubmitting} // Disable button if form is invalid or submitting
        >
          {isSubmitting ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : null}
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-500">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
