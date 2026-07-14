import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800">
            GVCC Learning Portal
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            Welcome back! Login to continue learning.
          </p>
        </div>

        <div className="space-y-6">

          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="w-full h-14 px-5 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              className="w-full h-14 px-5 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-xl bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

        <p className="mt-8 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;