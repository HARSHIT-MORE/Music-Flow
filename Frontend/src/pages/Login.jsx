import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const response = await api.post(
        "/auth/login",
        form
      );

      login(response.data.user);

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-5">
      <div className="w-full max-w-md rounded-2xl border border-[#222] bg-[#121212] p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-500">
            🎵 MusicFlow
          </h1>

          <p className="mt-2 text-gray-400">
            Welcome back
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full rounded-lg bg-[#242424] p-4 outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            className="w-full rounded-lg bg-[#242424] p-4 outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full rounded-full bg-green-500 py-3 font-bold text-black transition hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-green-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;