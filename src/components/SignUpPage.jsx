import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // ----------------------Validate phone ---------------------------
    if (!formData.phone) {
      isValid = false;
      newErrors.phone = "Please Enter your phone number";
    }

    // ---------------------------------Validate email-------------------------
    if (!formData.email) {
      isValid = false;
      newErrors.email = "Please enter your email address";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      newErrors.email = "Please Enter a valid email address";
    }

    // -------------------------------Validate password-----------------------------
    if (!formData.password) {
      isValid = false;
      newErrors.password = "Please Enter your password";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://dev-api.lazyfolks.in/accounts/signup/",
          formData
        );
        setSuccessMessage("Registration successful!");
        setErrors({});
      } catch (error) {
        setSuccessMessage("");
        setErrors({ server: "Registration failed. Please try again later." });
      }
    }
  };

  return (
    <>
      <div className="mx-auto mt-[7rem] max-w-screen-xl px-4 py-16 shadow-2xl rounded-3xl sm:px-6 lg:px-8">
      <div className="flex justify-center gap-10 mb-5">
          <div className="flex justify-center w-[10rem] py-[1.4rem]  border-gray-300 cursor-pointer border-2 rounded-lg bg-gray-100 hover:border-gray-200" >
               <img src="/Apple.svg" alt="" />
          </div>
          <div className="flex justify-center w-[10rem] py-[1.4rem] border-gray-300 cursor-pointer border-2 rounded-lg bg-gray-100 hover:border-gray-200" >
               <img className="" src="/google.svg" alt="" />
          </div>
      </div>
      <p className="text-center my-[2rem]">or sign up with email</p>
        <div className="signup-container">
          <form onSubmit={handleSubmit} className="required">
            <label className="block text-1xl font-medium text-gray-700">
              
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 p-3 w-full rounded-md border-gray-200 shadow-2xl sm:text-sm"
                placeholder="Phone"
              />
              {errors.phone && <p className="error-message">{errors.phone}</p>}
            </label>
            <label className="block text-1xl font-medium text-gray-700">
             
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1  p-3 w-full rounded-md border-gray-200 shadow-2xl sm:text-sm"
                placeholder="Email"
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </label>
            <label className="block text-1xl font-medium text-gray-700">
             
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1  p-3 w-full rounded-md border-gray-200 shadow-2xl sm:text-sm"
                placeholder="Password"
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </label>
            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white mt-2"
            >
              Sign Up
            </button>
          </form>
          {errors.server && <p className="error-message">{errors.server}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SignupPage;
