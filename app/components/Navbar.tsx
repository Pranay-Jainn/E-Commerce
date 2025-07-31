"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "../context/CartContext"
import { ShoppingBag, Search, User, Heart, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const { state, dispatch } = useCart()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      dispatch({ type: "SET_SEARCH_QUERY", payload: searchQuery })
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleLogin = () => {
  // Instead of mock login, navigate to login page
  setShowUserMenu(false);
  router.push("/login?mode=signin");
};


  const handleLogout = () => {
    dispatch({ type: "SET_USER", payload: null })
    setShowUserMenu(false)
  }

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-yellow-200/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {/* <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center"> */}
              <img 
                src="/GemistryLogo.png" 
                alt="Gemistry Logo" 
                className="w-[188px] h-[8opx] rounded-full"
              />
              {/* <span className="font-playfair text-2xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent">
                Gemistry
              </span> */}
            {/* </div> */}
            {/* <span className="font-playfair text-2xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent">
              Gemistry
            </span> */}
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for jewelry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-yellow-300 rounded-full focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
              />
            </form>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 text-gray-700 hover:text-yellow-600 transition-colors"
              >
                <User className="w-6 h-6" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 fade-in">
                  {state.user ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <img
                            src={state.user.avatar || "/placeholder.svg?height=40&width=40&text=User"}
                            alt={state.user.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{state.user.name}</p>
                            <p className="text-sm text-gray-500">{state.user.email}</p>
                          </div>
                        </div>
                      </div>
                      <Link
                        href="/account"
                        className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Account
                      </Link>
                      <Link
                        href="/account/orders"
                        className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Order History
                      </Link>
                      <Link
                        href="/favorites"
                        className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Favorites ({state.favorites.length})
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleLogin}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                      >
                        Sign In
                      </button>
                      <Link
                        href="/login"
                        className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Favorites */}
            <Link href="/favorites" className="relative p-2 text-gray-700 hover:text-yellow-600 transition-colors">
              <Heart className="w-6 h-6" />
              {state.favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {state.favorites.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-yellow-600 transition-colors">
              <ShoppingBag className="w-6 h-6" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {state.itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-yellow-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 fade-in">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for jewelry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-yellow-300 rounded-full focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
            </form>

            {/* Mobile Navigation */}
            <div className="space-y-2">
              <Link
                href="/"
                className="block py-2 text-gray-700 hover:text-yellow-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="block py-2 text-gray-700 hover:text-yellow-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="block py-2 text-gray-700 hover:text-yellow-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-gray-700 hover:text-yellow-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
