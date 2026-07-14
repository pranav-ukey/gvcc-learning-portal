import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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

      await api.post("/auth/register", formData);

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 flex justify-center items-center p-6">

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10"
      >

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Create Account
          </h1>

          <p className="text-gray-500 mt-3">
            Join GVCC Learning Portal
          </p>
        </div>

        <div className="space-y-5">

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              required
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </div>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;