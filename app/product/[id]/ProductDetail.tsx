"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useCart, type Product } from "../../context/CartContext"
import { ArrowLeft, Heart, Share2, Star, Shield, Truck, RotateCcw } from "lucide-react"

// ✅ Full product array moved here
const products: Product[] = [
  {
    id: "1",
    name: "Silver Hoop Earrings",
    price: 299,
    image: "/earring3.webp?height=600&width=600",
    category: "Earrings",
    material: "Silver",
    description: "Modern sterling silver hoop earrings with a polished finish.",
  },
  {
    id: "2",
    name: "Rose Gold Engagement Ring",
    price: 3299,
    image: "/ring.png?height=600&width=600",
    category: "Rings",
    material: "Rose Gold",
    gemstone: "Diamond",
    description:
      "Exquisite rose gold engagement ring with a 1-carat center diamond. Crafted from 18k rose gold, this ring features a classic solitaire setting.",
  },
  {
    id: "3",
    name: "Pearl Drop Earrings",
    price: 899,
    image: "/earring.webp?height=600&width=600",
    category: "Earrings",
    material: "Silver",
    gemstone: "Pearl",
    description: "Elegant sterling silver earrings with lustrous freshwater pearls.",
  },
  {
    id: "4",
    name: "Tennis Bracelet",
    price: 1899,
    image: "/bangle.webp?height=600&width=600",
    category: "Bangles",
    material: "Platinum",
    gemstone: "Diamond",
    description: "Classic platinum tennis bracelet with brilliant cut diamonds.",
  },
  {
    id: "5",
    name: "Sapphire Cocktail Ring",
    price: 2799,
    image: "/ring2.png?height=600&width=600",
    category: "Rings",
    material: "Gold",
    gemstone: "Sapphire",
    description: "Bold 18k gold cocktail ring featuring a stunning blue sapphire.",
  },
  {
    id: "6",
    name: "Emerald Pendant Necklace",
    price: 3599,
    image: "/necklace2.webp?height=600&width=600",
    category: "Necklaces",
    material: "Gold",
    gemstone: "Emerald",
    description: "Luxurious 18k gold necklace with a magnificent emerald pendant.",
  },
  {
    id: "7",
    name: "Eternal Diamond Necklace",
    price: 2499,
    image: "/necklace.webp?height=600&width=600",
    category: "Necklaces",
    material: "Gold",
    gemstone: "Diamond",
    description:
      "A stunning 18k gold necklace featuring a brilliant cut diamond pendant. This exquisite piece combines timeless elegance with modern sophistication.",
  },
  {
    id: "8",
    name: "Gold Chain Bracelet",
    price: 1299,
    image: "/bangle1.webp?height=600&width=600",
    category: "Bangles",
    material: "Gold",
    description: "Sophisticated 18k gold chain bracelet with intricate link design.",
  },
]

export default function ProductDetail() {
  const params = useParams()
  const router = useRouter()
  const { dispatch } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/" className="btn-primary">
            Return to Shop
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_TO_CART", payload: product })
    }
  }

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_TO_CART", payload: product })
    }
    router.push("/checkout")
  }

  const productImages = [
    product.image,
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ]

  return (
    <div className="min-h-screen bg-luxury-gradient py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🔙 Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gold-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Shop</span>
        </button>

        {/* 🛍 Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl bg-white shadow-lg">
              <Image
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index
                      ? "border-gold-500"
                      : "border-gray-200 hover:border-gold-300"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Product details (same as before) */}
          {/* ✅ KEEP ALL YOUR PRODUCT DETAIL CONTENT HERE (unchanged) */}
        </div>
      </div>
    </div>
  )
}
