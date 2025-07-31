"use client"

import Link from "next/link"
import { Package, Eye, Download, ArrowLeft } from "lucide-react"

export default function OrderHistory() {
  const mockOrders = [
    {
      id: "LUM-2024-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 2499,
      items: [{ name: "Eternal Diamond Necklace", quantity: 1, price: 2499 }],
      shippingAddress: "123 Main St, New York, NY 10001",
      trackingNumber: "1Z999AA1234567890",
    },
    {
      id: "LUM-2024-002",
      date: "2024-01-10",
      status: "Processing",
      total: 1299,
      items: [{ name: "Gold Chain Bracelet", quantity: 1, price: 1299 }],
      shippingAddress: "123 Main St, New York, NY 10001",
      trackingNumber: null,
    },
    {
      id: "LUM-2024-003",
      date: "2024-01-05",
      status: "Shipped",
      total: 899,
      items: [{ name: "Pearl Drop Earrings", quantity: 1, price: 899 }],
      shippingAddress: "123 Main St, New York, NY 10001",
      trackingNumber: "1Z999AA1234567891",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Shipped":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-yellow-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="fade-in">
            <Link
              href="/account"
              className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Account</span>
            </Link>
            <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-2">Order History</h1>
            <p className="text-gray-600">Track and manage your jewelry orders</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {mockOrders.map((order, index) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-lg p-6 slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div>
                  <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-2">Order {order.id}</h3>
                  <p className="text-gray-600">Placed on {order.date}</p>
                </div>
                <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className="font-playfair text-xl font-bold text-gray-900">${order.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Items */}
                  <div className="lg:col-span-2">
                    <h4 className="font-medium text-gray-900 mb-3">Items Ordered</h4>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-gray-700">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-medium">${item.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Shipping Address</h4>
                    <p className="text-gray-600 text-sm mb-3">{order.shippingAddress}</p>
                    {order.trackingNumber && (
                      <p className="text-sm">
                        <span className="text-gray-600">Tracking: </span>
                        <span className="font-mono text-yellow-600">{order.trackingNumber}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-200">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download Invoice</span>
                  </button>
                  {order.trackingNumber && (
                    <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                      <Package className="w-4 h-4" />
                      <span>Track Package</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {mockOrders.length === 0 && (
          <div className="text-center py-12 fade-in">
            <div className="bg-white rounded-xl shadow-lg p-12">
              <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h3 className="font-playfair text-2xl font-semibold text-gray-900 mb-4">No Orders Yet</h3>
              <p className="text-gray-600 mb-8">
                You haven't placed any orders yet. Start shopping to see your order history here.
              </p>
              <Link href="/shop" className="btn-primary">
                Start Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
