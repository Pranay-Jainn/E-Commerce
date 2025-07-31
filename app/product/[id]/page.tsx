"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useCart, type Product } from "../../context/CartContext"
import { ArrowLeft, Heart, Share2, Star, Shield, Truck, RotateCcw } from "lucide-react"

// Mock product data (in a real app, this would come from an API)
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
      "Exquisite rose gold engagement ring with a 1-carat center diamond. Crafted from 18k rose gold, this ring features a classic solitaire setting that showcases the diamond's natural beauty. The warm rose gold complements all skin tones and adds a romantic touch to this symbol of eternal love.",
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
      "A stunning 18k gold necklace featuring a brilliant cut diamond pendant. This exquisite piece combines timeless elegance with modern sophistication, making it perfect for both special occasions and everyday luxury. The diamond is carefully selected for its exceptional clarity and brilliance, set in a classic four-prong setting that maximizes light reflection.",
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

  // ✅ Add to cart normally (for "Add to Cart" button)
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_TO_CART", payload: product })
    }
  }

  // ✅ Buy Now button → add product & go to checkout
  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_TO_CART", payload: product })
    }
    router.push("/checkout")
  }

  // Mock additional images
  const productImages = [
    product.image,
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ]

  return (
    <div className="min-h-screen bg-luxury-gradient py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gold-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Shop</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
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

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gold-600 font-medium uppercase tracking-wide">{product.category}</span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gold-600 transition-colors">
                    <Heart className="w-6 h-6" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gold-600 transition-colors">
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <span className="text-gray-600">(24 reviews)</span>
              </div>
              <div className="font-playfair text-4xl font-bold text-gray-900 mb-6">
                ${product.price.toLocaleString()}
              </div>
            </div>

            {/* Product Specifications */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-playfair text-lg font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Material:</span>
                  <span className="ml-2 font-medium">{product.material}</span>
                </div>
                {product.gemstone && (
                  <div>
                    <span className="text-gray-600">Gemstone:</span>
                    <span className="ml-2 font-medium">{product.gemstone}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-600">Category:</span>
                  <span className="ml-2 font-medium">{product.category}</span>
                </div>
                <div>
                  <span className="text-gray-600">SKU:</span>
                  <span className="ml-2 font-medium">LUM-{product.id.padStart(4, "0")}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-playfair text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <label className="font-medium text-gray-900">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Add to Cart Button */}
                <button onClick={handleAddToCart} className="btn-primary flex-1 text-lg py-4">
                  Add to Cart - ${(product.price * quantity).toLocaleString()}
                </button>

                {/* ✅ Buy Now Button */}
                <button onClick={handleBuyNow} className="btn-secondary px-8 py-4">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow">
                <Shield className="w-6 h-6 text-gold-600" />
                <div>
                  <div className="font-medium text-sm">Lifetime Warranty</div>
                  <div className="text-xs text-gray-600">Full coverage</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow">
                <Truck className="w-6 h-6 text-gold-600" />
                <div>
                  <div className="font-medium text-sm">Free Shipping</div>
                  <div className="text-xs text-gray-600">Orders over $500</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow">
                <RotateCcw className="w-6 h-6 text-gold-600" />
                <div>
                  <div className="font-medium text-sm">30-Day Returns</div>
                  <div className="text-xs text-gray-600">No questions asked</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
