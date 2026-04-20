import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    // 👉 Cek login admin secara manual
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isAdmin", "true");
      window.location.href = "https://wedding-gilt-theta.vercel.app/";
      return;
    }

    // 🔐 Login user biasa via Supabase
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isAdmin", "false");
      window.location.href = "https://wedding-app-kel4.vercel.app";
    } catch (err) {
      console.error("❌ Login gagal:", err.message);
      setError("Email atau password salah. Coba lagi.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-20 px-4">
      <h2 className="text-2xl font-semibold text-center mb-2">Login to Account</h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        Please enter your email and password to continue
      </p>

      {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email address:</label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="yourname@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Sign In
        </button>

        <p className="text-sm text-center text-gray-600 mt-2">
          Don’t have an account? <Link to="/register" className="text-blue-500 hover:underline">Create Account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
