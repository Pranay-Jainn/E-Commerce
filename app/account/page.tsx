"use client"

import { useEffect, useState } from "react"
import { useCart } from "../context/CartContext"
import { Package, Heart, Settings, CreditCard, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function Account() {
  const { state } = useCart()

  // ✅ State for logged-in user (from signup/login)
  const [user, setUser] = useState<{ firstName: string; lastName: string; email: string; avatar?: string } | null>(null)

  // ✅ Load user details from localStorage when page mounts
  useEffect(() => {
    const savedUser = localStorage.getItem("fakeUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const mockOrders = [
    { id: "ORD-001", date: "2024-01-15", status: "Delivered", total: 2499, items: 1 },
    { id: "ORD-002", date: "2024-01-10", status: "Processing", total: 1299, items: 2 },
    { id: "ORD-003", date: "2024-01-05", status: "Shipped", total: 899, items: 1 },
  ]

  const accountStats = [
    {
      icon: Package,
      label: "Total Orders",
      value: mockOrders.length,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: Heart,
      label: "Favorites",
      value: state.favorites.length,
      color: "text-pink-600",
      bg: "bg-pink-100",
    },
    {
      icon: CreditCard,
      label: "Total Spent",
      value: `$${mockOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}`,
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-yellow-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="fade-in">
            <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-2">My Account</h1>
            <p className="text-gray-600">Manage your profile, orders, and preferences</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6 slide-up">
                <div className="text-center">
                  <img
                    src={user.avatar || "/placeholder-user.jpg?height=80&width=80&text=User"}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-yellow-200"
                  />
                  <h2 className="font-playfair text-xl font-semibold text-gray-900 mb-1">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-gray-600 mb-4">{user.email}</p>
                  <button
                    className="btn-primary w-full"
                    onClick={() => {
                      localStorage.removeItem("fakeUser")
                      window.location.reload()
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                {accountStats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-xl shadow-lg p-4 flex items-center space-x-4 bounce-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className={`p-3 rounded-full ${stat.bg}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-gray-600 text-sm">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6 fade-in">
                <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/account/orders"
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-200 transform hover:scale-105"
                  >
                    <Package className="w-6 h-6 text-yellow-600" />
                    <div>
                      <p className="font-medium text-gray-900">Order History</p>
                      <p className="text-sm text-gray-600">View past purchases</p>
                    </div>
                  </Link>
                  <Link
                    href="/favorites"
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-200 transform hover:scale-105"
                  >
                    <Heart className="w-6 h-6 text-pink-600" />
                    <div>
                      <p className="font-medium text-gray-900">Favorites</p>
                      <p className="text-sm text-gray-600">{state.favorites.length} saved items</p>
                    </div>
                  </Link>
                  <Link
                    href="/account/addresses"
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-200 transform hover:scale-105"
                  >
                    <MapPin className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Addresses</p>
                      <p className="text-sm text-gray-600">Manage shipping addresses</p>
                    </div>
                  </Link>
                  <Link
                    href="/account/settings"
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-200 transform hover:scale-105"
                  >
                    <Settings className="w-6 h-6 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Settings</p>
                      <p className="text-sm text-gray-600">Account preferences</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-lg p-6 slide-up">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-playfair text-xl font-semibold text-gray-900">Recent Orders</h3>
                  <Link href="/account/orders" className="text-yellow-600 hover:text-yellow-700 font-medium">
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {mockOrders.slice(0, 3).map((order, index) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-yellow-300 transition-colors bounce-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div>
                        <p className="font-medium text-gray-900">Order {order.id}</p>
                        <p className="text-sm text-gray-600">
                          {order.items} item{order.items > 1 ? "s" : ""} • {order.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${order.total.toLocaleString()}</p>
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-lg p-6 fade-in">
                <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">+91 12345-12345</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">123 KishanPole, Jaipur, Rajasthan, 302001</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">You are not logged in</h2>
            <p className="text-gray-600 mb-6">Please log in or sign up to access your account.</p>
            <Link href="/login" className="btn-primary">
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
