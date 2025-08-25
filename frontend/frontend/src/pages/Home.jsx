import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-[400px] text-center">
        <h1 className="text-2xl font-bold text-blue-700">🏠 Welcome to PaperScout</h1>
        <p className="mt-4 text-gray-600">You are logged in ✅</p>
        <button
          onClick={logout}
          className="mt-6 w-full py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
