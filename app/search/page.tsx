"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "../components/ProductCard"
import ProductFilters, { type FilterState } from "../components/ProductFilters"
import type { Product } from "../context/CartContext"
import { Search, SlidersHorizontal, Grid, List } from "lucide-react"

// All products for search
const allProducts: Product[] = [
  {
    id: "1",
    name: "Eternal Diamond Necklace",
    price: 2499,
    image: "/placeholder.svg?height=400&width=400&text=Diamond+Necklace",
    category: "Necklaces",
    material: "Gold",
    gemstone: "Diamond",
    description: "A stunning 18k gold necklace featuring a brilliant cut diamond pendant.",
  },
  {
    id: "2",
    name: "Rose Gold Engagement Ring",
    price: 3299,
    image: "/placeholder.svg?height=400&width=400&text=Rose+Gold+Ring",
    category: "Rings",
    material: "Rose Gold",
    gemstone: "Diamond",
    description: "Exquisite rose gold engagement ring with a 1-carat center diamond.",
  },
  {
    id: "3",
    name: "Pearl Drop Earrings",
    price: 899,
    image: "/placeholder.svg?height=400&width=400&text=Pearl+Earrings",
    category: "Earrings",
    material: "Silver",
    gemstone: "Pearl",
    description: "Elegant sterling silver earrings with lustrous freshwater pearls.",
  },
  {
    id: "4",
    name: "Tennis Bracelet",
    price: 1899,
    image: "/placeholder.svg?height=400&width=400&text=Tennis+Bracelet",
    category: "Bracelets",
    material: "Platinum",
    gemstone: "Diamond",
    description: "Classic platinum tennis bracelet with brilliant cut diamonds.",
  },
  {
    id: "5",
    name: "Sapphire Cocktail Ring",
    price: 2799,
    image: "/placeholder.svg?height=400&width=400&text=Sapphire+Ring",
    category: "Rings",
    material: "Gold",
    gemstone: "Sapphire",
    description: "Bold 18k gold cocktail ring featuring a stunning blue sapphire.",
  },
  {
    id: "6",
    name: "Emerald Pendant Necklace",
    price: 3599,
    image: "/placeholder.svg?height=400&width=400&text=Emerald+Necklace",
    category: "Necklaces",
    material: "Gold",
    gemstone: "Emerald",
    description: "Luxurious 18k gold necklace with a magnificent emerald pendant.",
  },
  {
    id: "7",
    name: "Silver Hoop Earrings",
    price: 299,
    image: "/placeholder.svg?height=400&width=400&text=Silver+Hoops",
    category: "Earrings",
    material: "Silver",
    description: "Modern sterling silver hoop earrings with a polished finish.",
  },
  {
    id: "8",
    name: "Gold Chain Bracelet",
    price: 1299,
    image: "/placeholder.svg?height=400&width=400&text=Gold+Bracelet",
    category: "Bracelets",
    material: "Gold",
    description: "Sophisticated 18k gold chain bracelet with intricate link design.",
  },
  {
    id: "9",
    name: "Ruby Stud Earrings",
    price: 1599,
    image: "/placeholder.svg?height=400&width=400&text=Ruby+Studs",
    category: "Earrings",
    material: "Gold",
    gemstone: "Ruby",
    description: "Brilliant ruby stud earrings set in 18k gold.",
  },
  {
    id: "10",
    name: "Platinum Wedding Band",
    price: 2199,
    image: "/placeholder.svg?height=400&width=400&text=Wedding+Band",
    category: "Rings",
    material: "Platinum",
    description: "Classic platinum wedding band with a timeless design.",
  },
  {
    id: "11",
    name: "Diamond Tennis Necklace",
    price: 4599,
    image: "/placeholder.svg?height=400&width=400&text=Diamond+Tennis",
    category: "Necklaces",
    material: "Gold",
    gemstone: "Diamond",
    description: "Stunning diamond tennis necklace with perfectly matched stones.",
  },
  {
    id: "12",
    name: "Vintage Pearl Bracelet",
    price: 799,
    image: "/placeholder.svg?height=400&width=400&text=Pearl+Bracelet",
    category: "Bracelets",
    material: "Silver",
    gemstone: "Pearl",
    description: "Vintage-inspired pearl bracelet with sterling silver clasp.",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    material: [],
    priceRange: [0, 10000],
  })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("relevance")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    setSearchQuery(initialQuery)
  }, [initialQuery])

  const searchResults = useMemo(() => {
    let results = allProducts

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.material.toLowerCase().includes(query) ||
          (product.gemstone && product.gemstone.toLowerCase().includes(query)),
      )
    }

    // Apply filters
    results = results.filter((product) => {
      const categoryMatch = filters.category.length === 0 || filters.category.includes(product.category)
      const materialMatch = filters.material.length === 0 || filters.material.includes(product.material)
      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      return categoryMatch && materialMatch && priceMatch
    })

    // Sort results
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        results.sort((a, b) => b.price - a.price)
        break
      case "name":
        results.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Keep relevance order (original order for now)
        break
    }

    return results
  }, [searchQuery, filters, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-yellow-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="fade-in">
            <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Search Jewelry"}
            </h1>
            <p className="text-gray-600">
              {searchQuery
                ? `Found ${searchResults.length} result${searchResults.length !== 1 ? "s" : ""}`
                : "Search our collection of fine jewelry"}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8 fade-in">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search for jewelry, materials, gemstones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-yellow-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="slide-up">
              <ProductFilters onFilterChange={setFilters} />
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {/* Controls */}
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6 fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-yellow-300 rounded-lg hover:bg-yellow-50 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Filters</span>
                  </button>
                  <p className="text-gray-600">
                    {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="luxury-input w-auto">
                    <option value="relevance">Sort by: Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>

                  <div className="flex border border-yellow-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 transition-colors ${
                        viewMode === "grid" ? "bg-yellow-500 text-white" : "bg-white text-gray-600 hover:bg-yellow-50"
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 transition-colors ${
                        viewMode === "list" ? "bg-yellow-500 text-white" : "bg-white text-gray-600 hover:bg-yellow-50"
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            {searchResults.length > 0 ? (
              <div
                className={`grid gap-8 ${
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {searchResults.map((product, index) => (
                  <div key={product.id} className="bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 fade-in">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-playfair text-2xl font-semibold text-gray-900 mb-4">No results found</h3>
                <p className="text-gray-500 text-lg mb-8">
                  {searchQuery
                    ? `We couldn't find any jewelry matching "${searchQuery}". Try different keywords or adjust your filters.`
                    : "Enter a search term to find jewelry pieces."}
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      setFilters({ category: [], material: [], priceRange: [0, 10000] })
                    }}
                    className="btn-primary"
                  >
                    Clear Search & Filters
                  </button>
                  <div className="text-sm text-gray-600">
                    <p className="mb-2">Popular searches:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {["diamond", "gold", "rings", "necklaces", "earrings"].map((term) => (
                        <button
                          key={term}
                          onClick={() => setSearchQuery(term)}
                          className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
