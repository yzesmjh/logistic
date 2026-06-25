import React, { useLayoutEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const BaseUrl = import.meta.env.VITE_BASEURL;
  const navigate = useNavigate();

  useLayoutEffect(() => {
    document.title = "FedyTransist | Login";
    if (sessionStorage.getItem("user")) {
      window.location.href = "/dashboard";
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      customerId: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      customerId: Yup.string()
        .min(5, "Customer ID must be at least 5 characters")
        .required("Customer ID is required"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      setIsLoading(true);
      try {
        const response = await axios.post(`${BaseUrl}users/login`, values);

        if (response.status === 200) {
          const returnedData = response?.data?.data;
          sessionStorage.setItem("user", JSON.stringify(returnedData.userInfo));
          sessionStorage.setItem("token", JSON.stringify(returnedData.token));

          toast.success(`Welcome back, ${returnedData.userInfo.firstname}!`, {
            position: "top-right",
            autoClose: 3000,
          });

          setTimeout(() => {
            navigate("/dashboard", {
              state: {
                message: `Welcome ${returnedData.userInfo.firstname} ${returnedData.userInfo.lastname}`,
              },
              replace: true,
            });
          }, 2000);
        } else {
          toast.warn(response.data.responseMessage || "Login failed");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.responseMessage ||
          "Login failed. Please try again.";
        setFieldError("apiresponse", errorMessage);
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
        setIsLoading(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-50 animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">FT</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Fedy<span className="text-orange-500">Transit</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Sign in to your logistics dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Customer ID Field */}
            <div>
              <label
                htmlFor="customerId"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Customer ID
              </label>
              <div className="relative">
                <input
                  id="customerId"
                  name="customerId"
                  type="text"
                  {...formik.getFieldProps("customerId")}
                  className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                    formik.touched.customerId && formik.errors.customerId
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                  }`}
                  placeholder="Enter your customer ID"
                />
                {formik.touched.customerId && formik.errors.customerId && (
                  <div className="absolute right-3 top-3">
                    <span className="text-red-500">⚠</span>
                  </div>
                )}
              </div>
              {formik.touched.customerId && formik.errors.customerId && (
                <div className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="mr-1">•</span>
                  {formik.errors.customerId}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 pr-12 ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.83 3.83"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="mr-1">•</span>
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* API Response Error */}
            {formik.errors.apiresponse && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-red-700 dark:text-red-400 text-sm">
                    {formik.errors.apiresponse}
                  </span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <ThreeCircles
                    height="20"
                    width="20"
                    radius="5"
                    color="#ffffff"
                    ariaLabel="three-circles-loading"
                    wrapperClass="mr-2"
                  />
                  Signing In...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-500 font-semibold transition-colors duration-200"
              >
                Contact support
              </a>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Your information is securely encrypted
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
