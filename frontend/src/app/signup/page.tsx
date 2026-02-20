'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { registerUser } from '../../lib/api';
import { setToken } from '../../lib/auth';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setError('');
      const data = await registerUser(email, password);
      setToken(data.token);
      router.push('/dashboard');
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Registration failed'
      );
    }
  };

  return (
  <main className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-gray-200 via-blue-400 to-indigo-700">

    {/* Decorative circles */}
    <div className="absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-pink-300/40 blur-2xl"></div>
    <div className="absolute -top-20 right-0 h-80 w-80 rounded-full bg-orange-200/40 blur-2xl"></div>

    <div className="flex w-full flex-col lg:flex-row">

      {/* LEFT SIDE TEXT */}
      <div className="
        flex 
        w-full 
        flex-col 
        justify-center 
        px-6 
        py-10 
        text-center 
        text-white 
        lg:w-1/2 
        lg:px-20 
        lg:text-left
      ">
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
          Join 1000+ Businesses
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-yellow-300 sm:text-3xl lg:text-4xl">
          Powering Growth with Lemonpay!
        </h2>
      </div>

      {/* RIGHT SIDE SIGNUP */}
      <div className="flex w-full items-center justify-center px-4 pb-10 lg:w-1/2 lg:px-0 lg:pb-0">
        <form
          onSubmit={handleSubmit}
          className="
            w-full 
            max-w-md 
            space-y-5 
            rounded-xl 
            bg-white/20 
            p-6 
            sm:p-8 
            lg:p-10 
            backdrop-blur-md
          "
        >
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">
            Welcome Sign Up System
          </h1>

          <p className="text-sm text-white/80">
            Your gateway to seamless transactions and easy payments.
          </p>

          <div>
            <label className="mb-1 block text-sm text-white">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-white/30 px-3 py-2 text-white placeholder-white/70 outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-white">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md bg-white/30 px-3 py-2 text-white placeholder-white/70 outline-none"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-white">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md bg-white/30 px-3 py-2 text-white placeholder-white/70 outline-none"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-300">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-white py-2 font-medium text-indigo-700 hover:bg-gray-200"
          >
            Sign Up
          </button>

          <p className="text-right text-sm text-white">
            Already have an account?{' '}
            <Link href="/login" className="font-medium underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>

    </div>
  </main>
);
}