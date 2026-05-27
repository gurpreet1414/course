"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-20">
      <Navbar />

      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-primary/5 p-8 text-center border-b border-gray-100">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-sm text-gray-600">
              {isLogin 
                ? 'Enter your credentials to access your account' 
                : 'Sign up to manage your qualifications and bookings'}
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl p-3 focus:ring-primary focus:border-primary"
                    placeholder="John Doe"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    required 
                    className="w-full pl-10 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl p-3 focus:ring-primary focus:border-primary"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">Password</label>
                  {isLogin && (
                    <a href="#" className="text-sm font-medium text-primary hover:underline">
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="password" 
                    required 
                    className="w-full pl-10 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl p-3 focus:ring-primary focus:border-primary"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full flex justify-center items-center gap-2 py-3.5 bg-primary hover:bg-secondary text-white font-bold rounded-xl shadow-md transition-all hover:scale-[1.02]"
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-bold text-primary hover:underline focus:outline-none"
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
