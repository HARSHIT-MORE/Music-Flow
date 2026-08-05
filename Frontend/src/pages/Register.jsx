import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/auth/register", form);

      console.log("Registration successful:", response.data);

      navigate("/login");
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-5 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#222] bg-[#121212] p-8 shadow-2xl">

        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">
            🎵
          </div>

          <h1 className="text-3xl font-bold text-green-500">
            MusicFlow
          </h1>

          <p className="mt-2 text-gray-400">
            Create your account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter your name"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-[#242424] p-4 text-white outline-none transition focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-[#242424] p-4 text-white outline-none transition focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-[#242424] p-4 text-white outline-none transition focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Account Type
            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-lg bg-[#242424] p-4 text-white outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="user">
                Listener
              </option>

              <option value="artist">
                Artist
              </option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-green-500 py-3 font-bold text-black transition hover:scale-[1.02] hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-green-500 hover:text-green-400"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;