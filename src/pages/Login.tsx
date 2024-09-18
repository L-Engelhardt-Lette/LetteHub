import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom"; // Use Link for navigation
import { useAuth } from "../context/AuthContext";

// Validation schema
const schema = yup.object().shape({
  username: yup.string().required("Username is required"), // Ensure 'username' is used
  password: yup.string().required("Password is required"),
});

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setLoginError(null); // Reset any previous login errors
      console.log("Attempting to log in with:", data);

      // Attempt login
      const success = await login(data.username, data.password);
      if (success) {
        console.log("Login successful, navigating to dashboard.");
        navigate("/");
      } else {
        setLoginError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-backgroundlight dark:bg-backgrounddark">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-2xl font-bold mb-4">Login</p>

        {loginError && (
          <div className="mb-4 text-red-500 text-sm">{loginError}</div>
        )}

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
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded-lg w-full ${
            !isValid || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Login"}
        </button>

        <p className="mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
