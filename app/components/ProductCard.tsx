"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useCart, type Product } from "../context/CartContext"
import { ShoppingBag, Heart } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { state, dispatch } = useCart()

  const isFavorite = state.favorites.some((item) => item.id === product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch({ type: "ADD_TO_CART", payload: product })
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isFavorite) {
      dispatch({ type: "REMOVE_FROM_FAVORITES", payload: product.id })
    } else {
      dispatch({ type: "ADD_TO_FAVORITES", payload: product })
    }
  }

  return (
    <div className="product-card group overflow-hidden">
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleToggleFavorite}
              className={`p-2 backdrop-blur-sm rounded-full shadow-lg transition-colors ${
                isFavorite ? "bg-pink-500 hover:bg-pink-600" : "bg-white/90 hover:bg-white"
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "text-white fill-current" : "text-gray-700"}`} />
            </button>
            <button
              onClick={handleAddToCart}
              className="p-2 bg-yellow-500 hover:bg-yellow-600 rounded-full shadow-lg transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="mb-2">
          <span className="text-sm text-yellow-600 font-medium uppercase tracking-wide">{product.category}</span>
        </div>
        <h3 className="font-playfair text-xl font-semibold mb-2 text-gray-900 group-hover:text-yellow-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-playfair text-2xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
          <button onClick={handleAddToCart} className="btn-primary text-sm py-2 px-4">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
