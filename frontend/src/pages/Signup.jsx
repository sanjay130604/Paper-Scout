// src/pages/Signup.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import book from "../images/book.png";

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email: userEmail,
          password: userPassword,
          role,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenId: credentialResponse.credential }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center items-center text-white p-10 bg-gradient-to-br from-[#3B82F6] to-[#1E40AF]">
        <img
          src={book}
          alt="Illustration"
          className="w-[300px] h-[300px] object-contain mb-6"
        />
        <h2 className="text-2xl font-bold">Welcome to PaperScout</h2>
        <p className="mt-2 text-center max-w-sm text-gray-200">
          Join PaperScout today and discover groundbreaking papers tailored to
          your interests.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-96">
          <h1 className="text-2xl font-bold text-center text-[#1E40AF] mb-2">
            PaperScout
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Create your account
          </p>

          {/* Signup Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-[#1E40AF] mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#3B82F6] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1E40AF] mb-1">
                Email
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#3B82F6] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1E40AF] mb-1">
                Password
              </label>
              <input
                type="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#3B82F6] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1E40AF] mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#3B82F6] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1E40AF] mb-1">
                Select Your Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#3B82F6] outline-none"
                required
              >
                <option value="">Choose your role</option>
                <option value="student">Student</option>
                <option value="researcher">Researcher</option>
                <option value="professor">Professor</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="w-4 h-4 accent-[#1E40AF]"
                required
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-[#3B82F6] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#3B82F6] hover:underline">
                  Privacy Policy
                </a>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#1E40AF] text-white rounded-md font-semibold hover:bg-[#1E3A8A]"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">Or continue with</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Google Signup */}
          <GoogleLogin
            onSuccess={(credentialResponse) =>
              handleGoogleSignup(credentialResponse)
            }
            onError={() => console.log("Google signup failed")}
          />

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/" className="text-[#3B82F6] font-semibold">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
