import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-4xl font-bold font-nunitosans text-center mb-6">
          {/* Logo */}
          <div className="flex justify-center items-center">
            <img
              src="/img/logo lavanya.png"
              alt="Lavanya Logo"
              className="h-35 w-auto"
            />
          </div>
        </div>

        <Outlet />

        <p className="text-center text-sm text-gray-500 mt-6">
          © 2025 Lavanya Stories Admin Dashboard. All rights reserved.
        </p>
      </div>
    </div>
  );
}
