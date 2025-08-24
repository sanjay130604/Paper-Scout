import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import book from "../images/book.png";

export default function Login() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, password: userPassword }),
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

  const handleGoogleLogin = async (credentialResponse) => {
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
        <h2 className="text-2xl font-bold">Welcome Back to PaperScout</h2>
        <p className="mt-2 text-center max-w-sm text-gray-200">
          Continue your research journey and discover groundbreaking papers
          tailored to your interests.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-96">
          <h1 className="text-2xl font-bold text-center text-[#1E40AF] mb-2">
            PaperScout
          </h1>
          <p className="text-center text-gray-500 mb-6">Log in to your account</p>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#3B82F6] outline-none"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 accent-[#1E40AF]" />
                <span>Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-[#3B82F6] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#1E40AF] text-white rounded-md font-semibold hover:bg-[#1E3A8A]"
            >
              Log In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">Or continue with</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Google Login */}
          <GoogleLogin
            onSuccess={(credentialResponse) =>
              handleGoogleLogin(credentialResponse)
            }
            onError={() => console.log("Google login failed")}
          />

          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#3B82F6] font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
