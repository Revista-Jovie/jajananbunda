import React, { useState } from 'react';

const Forgot = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email });
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-center mb-2">Forgot Password</h2>
      <p className="text-sm text-gray-600 text-center mb-6">
      Enter your email to receive password reset instructions
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <label className="block text-sm font-medium text-gray-700">Email address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="yourname@example.com"
              required
            />
        </div>

        <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Send Reset Link
          </button>

          <p className="text-sm text-center text-gray-600">
            <a href="/login" className="text-blue-500 hover:underline">Back to Login</a>
          </p>
      </form>
    </div>
  );
};

export default Forgot;
