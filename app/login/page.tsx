"use client"

import React, { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

function LoginContent() {
  const searchParams = useSearchParams()
  const [isLogin, setIsLogin] = useState(true) // Default: login

  // ✅ When page loads, check if ?mode=signup is in URL
  useEffect(() => {
    if (searchParams.get("mode") === "signup") {
      setIsLogin(false)
    }
  }, [searchParams])

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-luxury-gradient py-16">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* ✅ Tabs */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 font-semibold ${
                isLogin ? "text-yellow-600 border-b-2 border-yellow-600" : "text-gray-500"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 font-semibold ${
                !isLogin ? "text-yellow-600 border-b-2 border-yellow-600" : "text-gray-500"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* ✅ Form */}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="luxury-input mb-3"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="luxury-input mb-3"
                  onChange={handleInputChange}
                />
              </>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="luxury-input mb-3"
              onChange={handleInputChange}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="luxury-input mb-3"
              onChange={handleInputChange}
            />

            {!isLogin && (
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="luxury-input mb-3"
                onChange={handleInputChange}
              />
            )}

            <button type="submit" className="btn-primary w-full">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function Login() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading login form...</div>}>
      <LoginContent />
    </Suspense>
  )
}
