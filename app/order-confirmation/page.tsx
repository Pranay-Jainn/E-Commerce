"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Package, Truck, Mail } from "lucide-react";

export default function OrderConfirmation() {
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [estimatedDelivery, setEstimatedDelivery] = useState<string>("");

  useEffect(() => {
    // ✅ Generate only on client (no hydration mismatch)
    setOrderNumber(`LUM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
    setEstimatedDelivery(
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return (
    <div className="min-h-screen bg-luxury-gradient py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>

          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully placed.
          </p>

          <div className="bg-gold-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Order Number</h3>
                <p className="text-gold-600 font-mono text-lg">
                  {orderNumber ?? "Loading..."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Estimated Delivery</h3>
                <p className="text-gray-700">{estimatedDelivery || "Loading..."}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6 text-gold-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Order Processing</h4>
              <p className="text-sm text-gray-600">Your order is being prepared</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="w-6 h-6 text-gold-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Shipping</h4>
              <p className="text-sm text-gray-600">Free express delivery</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-gold-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Updates</h4>
              <p className="text-sm text-gray-600">Email notifications sent</p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4 justify-center">
            <Link href="/" className="btn-primary">
              Continue Shopping
            </Link>
            <Link href="/account/orders" className="btn-secondary">
              Track Your Order
            </Link>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              A confirmation email has been sent to your email address with order details and tracking information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
