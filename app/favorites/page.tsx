"use client"

import { useCart } from "../context/CartContext"
import ProductCard from "../components/ProductCard"
import { Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function Favorites() {
  const { state, dispatch } = useCart()

  const clearAllFavorites = () => {
    state.favorites.forEach((product) => {
      dispatch({ type: "REMOVE_FROM_FAVORITES", payload: product.id })
    })
  }

  if (state.favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-12 fade-in">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Your Favorites is Empty</h1>
            <p className="text-gray-600 mb-8">
              Start adding jewelry pieces you love to your favorites for easy access later
            </p>
            <Link href="/shop" className="btn-primary">
              Discover Jewelry
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-yellow-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between fade-in">
            <div>
              <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-2">
                My Favorites ({state.favorites.length})
              </h1>
              <p className="text-gray-600">Your saved jewelry pieces</p>
            </div>
            <button
              onClick={clearAllFavorites}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {state.favorites.map((product, index) => (
            <div key={product.id} className="bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center fade-in">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="font-playfair text-2xl font-semibold text-gray-900 mb-4">Ready to Purchase?</h3>
            <p className="text-gray-600 mb-6">
              Add your favorite items to cart and proceed to checkout for a seamless shopping experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="btn-secondary">
                Continue Shopping
              </Link>
              <Link href="/cart" className="btn-primary flex items-center justify-center space-x-2">
                <ShoppingBag className="w-5 h-5" />
                <span>View Cart ({state.itemCount})</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
