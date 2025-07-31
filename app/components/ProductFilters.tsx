"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FilterProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  category: string[]
  material: string[]
  priceRange: [number, number]
}

export default function ProductFilters({ onFilterChange }: FilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    material: [],
    priceRange: [0, 10000],
  })

  const [openSections, setOpenSections] = useState({
    category: true,
    material: true,
    price: true,
  })

  const categories = ["Necklaces", "Rings", "Earrings", "Bangles"]
  const materials = ["Gold", "Silver", "Rose Gold", "Platinum"]

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter((c) => c !== category)
      : [...filters.category, category]

    const newFilters = { ...filters, category: newCategories }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleMaterialChange = (material: string) => {
    const newMaterials = filters.material.includes(material)
      ? filters.material.filter((m) => m !== material)
      : [...filters.material, material]

    const newFilters = { ...filters, material: newMaterials }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <h3 className="font-playfair text-xl font-semibold mb-6 text-gray-900">Filters</h3>

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Category
          <ChevronDown className={`w-5 h-5 transition-transform ${openSections.category ? "rotate-180" : ""}`} />
        </button>
        {openSections.category && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.category.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                />
                <span className="text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Materials */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("material")}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Material
          <ChevronDown className={`w-5 h-5 transition-transform ${openSections.material ? "rotate-180" : ""}`} />
        </button>
        {openSections.material && (
          <div className="space-y-2">
            {materials.map((material) => (
              <label key={material} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.material.includes(material)}
                  onChange={() => handleMaterialChange(material)}
                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                />
                <span className="text-gray-700">{material}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Price Range
          <ChevronDown className={`w-5 h-5 transition-transform ${openSections.price ? "rotate-180" : ""}`} />
        </button>
        {openSections.price && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange[0]}
                onChange={(e) => {
                  const newFilters = {
                    ...filters,
                    priceRange: [Number.parseInt(e.target.value) || 0, filters.priceRange[1]] as [number, number],
                  }
                  setFilters(newFilters)
                  onFilterChange(newFilters)
                }}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange[1]}
                onChange={(e) => {
                  const newFilters = {
                    ...filters,
                    priceRange: [filters.priceRange[0], Number.parseInt(e.target.value) || 10000] as [number, number],
                  }
                  setFilters(newFilters)
                  onFilterChange(newFilters)
                }}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => {
          const resetFilters = { category: [], material: [], priceRange: [0, 10000] as [number, number] }
          setFilters(resetFilters)
          onFilterChange(resetFilters)
        }}
        className="w-full py-2 px-4 border border-yellow-400 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  )
}
