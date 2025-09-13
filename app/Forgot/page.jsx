"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Lock } from "lucide-react"; // added User + Lock icons

const Page = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // validate form whenever input changes
  useEffect(() => {
    validateForm(false); // run silently
  }, [email, newPassword, confirmPassword]);

  const validateForm = (showErrors = true) => {
    let tempErrors = {};

    // Email validation
    if (!email) {
      if (showErrors) tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      if (showErrors) tempErrors.email = "Enter a valid email address";
    }

    // Password validation
    if (!newPassword) {
      if (showErrors) tempErrors.newPassword = "Password is required";
    } else if (newPassword.length < 8) {
      if (showErrors)
        tempErrors.newPassword = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (!confirmPassword) {
      if (showErrors) tempErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== newPassword) {
      if (showErrors) tempErrors.confirmPassword = "Passwords do not match";
    }

    if (showErrors) setErrors(tempErrors);

    setIsValid(Object.keys(tempErrors).length === 0);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(true)) {
      alert("Form submitted successfully ✅");
      // API call / redirect goes here
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-[90%] sm:w-[400px] flex flex-col items-center"
      >
        <h1 className="text-white text-3xl font-semibold mb-6">
          Reset Password
        </h1>

        {/* Email */}
        <div className="w-full mb-4 relative">
          <p className="text-white text-sm pb-1">Enter your email</p>
          <input
            className="w-full bg-white/20 text-white placeholder-gray-300 px-10 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* User Icon */}
          <User className="absolute left-3 top-9 text-gray-300" size={18} />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* New Password */}
        <div className="w-full mb-4 relative">
          <p className="text-white text-sm pb-1">Enter your new password</p>
          <input
            className="w-full bg-white/20 text-white placeholder-gray-300 px-10 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 pr-10"
            placeholder="New password"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {/* Lock Icon */}
          <Lock className="absolute left-3 top-9 text-gray-300" size={18} />
          {/* Show/Hide Password */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-300 hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.newPassword && (
            <p className="text-red-400 text-xs mt-1">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="w-full mb-4 relative">
          <p className="text-white text-sm pb-1">Confirm password</p>
          <input
            className="w-full bg-white/20 text-white placeholder-gray-300 px-10 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 pr-10"
            placeholder="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* Lock Icon */}
          <Lock className="absolute left-3 top-9 text-gray-300" size={18} />
          {/* Show/Hide Confirm Password */}
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-300 hover:text-white"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid}
          className={`mt-4 w-full text-white text-lg font-medium px-5 py-3 rounded-xl shadow-lg transition ${
            isValid
              ? "bg-gradient-to-r from-red-400 to-pink-500 hover:opacity-90"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Submit
        </button>

        {/* Example redirect */}
        <Link href="/ab" className="mt-3 text-sm text-gray-300 hover:text-white">
          Back to Login
        </Link>
      </form>
    </div>
  );
};

export default Page;