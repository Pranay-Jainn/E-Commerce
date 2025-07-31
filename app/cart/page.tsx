"use client"

import { useCart } from "../context/CartContext"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

export default function Cart() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id })
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-luxury-gradient py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-12">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Discover our exquisite collection of handcrafted jewelry pieces</p>
            <Link href="/" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-luxury-gradient py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({state.itemCount} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={120}
                      height={120}
                      className="w-30 h-30 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="font-playfair text-xl font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gold-600 font-medium">{item.category}</p>
                      <p className="text-gray-600 text-sm">{item.material}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-700 font-medium">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 border-x border-gray-300 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-playfair text-xl font-bold text-gray-900">
                          ${(item.price * item.quantity).toLocaleString()}
                        </div>
                        <div className="text-gray-600 text-sm">${item.price.toLocaleString()} each</div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="font-playfair text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${state.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${Math.round(state.total * 0.08).toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="font-playfair text-lg font-semibold">Total</span>
                    <span className="font-playfair text-lg font-bold text-gray-900">
                      ${Math.round(state.total * 1.08).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/checkout" className="btn-primary w-full text-center block">
                  Proceed to Checkout
                </Link>
                <Link href="/" className="btn-secondary w-full text-center block">
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-6 p-4 bg-gold-50 rounded-lg">
                <p className="text-sm text-gold-800">
                  <strong>Free shipping</strong> on orders over $500. Your order qualifies!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
