"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import ProductCard from "./components/ProductCard"
import ProductFilters, { type FilterState } from "./components/ProductFilters"
import type { Product } from "./context/CartContext"
import { ArrowRight, Star, Shield, Truck, Award } from "lucide-react"
import Link from "next/link"

// Mock product data
const products: Product[] = [
  {
    id: "1",
    name: "Silver Hoop Earrings",
    price: 299,
    image: "/earring3.webp?height=400&width=400&text=Silver+Hoops",
    category: "Earrings",
    material: "Silver",
    description: "Modern sterling silver hoop earrings with a polished finish.",
  },
  {
    id: "2",
    name: "Rose Gold Engagement Ring",
    price: 3299,
    image: "/ring.png?height=400&width=400&text=Rose+Gold+Ring",
    category: "Rings",
    material: "Rose Gold",
    gemstone: "Diamond",
    description: "Exquisite rose gold engagement ring with a 1-carat center diamond.",
  },
  {
    id: "3",
    name: "Pearl Drop Earrings",
    price: 899,
    image: "/earring.webp?height=400&width=400&text=Pearl+Earrings",
    category: "Earrings",
    material: "Silver",
    gemstone: "Pearl",
    description: "Elegant sterling silver earrings with lustrous freshwater pearls.",
  },
  {
    id: "4",
    name: "Tennis Bracelet",
    price: 1899,
    image: "/bangle.webp?height=400&width=400&text=Tennis+Bracelet",
    category: "Bangles",
    material: "Platinum",
    gemstone: "Diamond",
    description: "Classic platinum tennis bracelet with brilliant cut diamonds.",
  },
  {
    id: "5",
    name: "Sapphire Cocktail Ring",
    price: 2799,
    image: "/ring2.png?height=400&width=400&text=Sapphire+Ring",
    category: "Rings",
    material: "Gold",
    gemstone: "Sapphire",
    description: "Bold 18k gold cocktail ring featuring a stunning blue sapphire.",
  },
  {
    id: "6",
    name: "Emerald Pendant Necklace",
    price: 3599,
    image: "/necklace2.webp?height=400&width=400&text=Emerald+Necklace",
    category: "Necklaces",
    material: "Gold",
    gemstone: "Emerald",
    description: "Luxurious 18k gold necklace with a magnificent emerald pendant.",
  },
  {
    id: "7",
    name: "Eternal Diamond Necklace",
    price: 2499,
    image: "/necklace.webp?height=400&width=400&text=Diamond+Necklace",
    category: "Necklaces",
    material: "Gold",
    gemstone: "Diamond",
    description: "A stunning 18k gold necklace featuring a brilliant cut diamond pendant.",
  },
  {
    id: "8",
    name: "Gold Chain Bracelet",
    price: 1299,
    image: "/bangle1.webp?height=400&width=400&text=Gold+Bracelet",
    category: "Bangles",
    material: "Gold",
    description: "Sophisticated 18k gold chain bracelet with intricate link design.",
  },
]

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    material: [],
    priceRange: [0, 10000],
  })

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = filters.category.length === 0 || filters.category.includes(product.category)
      const materialMatch = filters.material.length === 0 || filters.material.includes(product.material)
      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]

      return categoryMatch && materialMatch && priceMatch
    })
  }, [filters])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/banner.jpg?height=800&width=1600&text=Luxury+Jewelry+Collection"
          alt="Luxury Jewelry Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 fade-in">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 float">Gemistry Jewellers</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 slide-up">
            Discover our exquisite collection of handcrafted jewelry pieces
          </p>
          <Link href="#products" className="btn-primary inline-flex items-center space-x-2 text-lg bounce-in">
            <span>Explore Collection</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Premium Quality", desc: "Crafted with the finest materials and gemstones" },
              { icon: Shield, title: "Lifetime Warranty", desc: "Comprehensive warranty on all jewelry pieces" },
              { icon: Truck, title: "Free Shipping", desc: "Complimentary shipping on orders over $500" },
              {
                icon: Star,
                title: "Expert Craftsmanship",
                desc: "Handcrafted by master jewelers with decades of experience",
              },
            ].map((feature, index) => (
              <div key={feature.title} className="text-center bounce-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-playfair text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-in">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Our Collection</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each piece in our collection is carefully curated and crafted to perfection
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4 slide-up">
              <ProductFilters onFilterChange={setFilters} />
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6 fade-in">
                <p className="text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
                <select className="luxury-input w-auto">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <div key={product.id} className="bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12 fade-in">
                  <p className="text-gray-500 text-lg">No products match your current filters.</p>
                  <button
                    onClick={() => setFilters({ category: [], material: [], priceRange: [0, 10000] })}
                    className="mt-4 btn-primary"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
