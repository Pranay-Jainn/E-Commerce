"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useCart } from "../context/CartContext"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CreditCard, Lock, Truck } from "lucide-react"

export default function Checkout() {
  const { state, dispatch } = useCart()
  const router = useRouter()

  // ✅ Track if order has been placed
  const [orderPlaced, setOrderPlaced] = useState(false)

  // ✅ Redirect to cart if cart is empty AND no order has been placed
  useEffect(() => {
    if (state.items.length === 0 && !orderPlaced) {
      router.push("/cart")
    }
  }, [state.items.length, orderPlaced, router])

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // ✅ Mark order as placed BEFORE clearing cart
    setOrderPlaced(true)

    // ✅ Navigate FIRST, then clear cart AFTER navigation
    router.push("/order-confirmation")

    // Delay clearing cart slightly to avoid redirect conflict
    setTimeout(() => {
      dispatch({ type: "CLEAR_CART" })
    }, 500)
  }

  // ✅ Don’t render checkout form if cart is empty & order not placed
  if (state.items.length === 0 && !orderPlaced) {
    return null
  }

  const subtotal = state.total
  const tax = Math.round(subtotal * 0.08)
  const total = subtotal + tax

  return (
    <div className="min-h-screen bg-luxury-gradient py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="font-playfair text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="luxury-input"
                    required
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="font-playfair text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="luxury-input"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="luxury-input"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="luxury-input md:col-span-2"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="luxury-input"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="luxury-input"
                    required
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="luxury-input"
                    required
                  />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="luxury-input"
                    required
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="font-playfair text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 border border-gold-200 rounded-lg">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-gold-600 border-gray-300 focus:ring-gold-500"
                    />
                    <CreditCard className="w-6 h-6 text-gold-600" />
                    <span className="font-medium">Credit Card</span>
                  </div>

                  {formData.paymentMethod === "card" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card number"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="luxury-input md:col-span-2"
                        required
                      />
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="luxury-input"
                        required
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="luxury-input"
                        required
                      />
                      <input
                        type="text"
                        name="nameOnCard"
                        placeholder="Name on card"
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                        className="luxury-input md:col-span-2"
                        required
                      />
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full text-lg py-4 flex items-center justify-center space-x-2"
              >
                <Lock className="w-5 h-5" />
                <span>Complete Order - ${total.toLocaleString()}</span>
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="font-playfair text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="w-15 h-15 object-cover rounded-lg"
                      />
                      <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between">
                    <span className="font-playfair text-lg font-semibold">Total</span>
                    <span className="font-playfair text-lg font-bold text-gray-900">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security & Shipping Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Lock className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-medium text-gray-900">Secure Payment</div>
                    <div className="text-sm text-gray-600">
                      Your payment information is encrypted and secure
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="w-6 h-6 text-gold-600" />
                  <div>
                    <div className="font-medium text-gray-900">Free Shipping</div>
                    <div className="text-sm text-gray-600">
                      Complimentary shipping on all orders over $500
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
