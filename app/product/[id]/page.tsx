import ProductDetail from "./ProductDetail"

// ✅ Static product data (can later move to API if needed)
const products = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
  { id: "6" },
  { id: "7" },
  { id: "8" },
]

// ✅ Needed for static export
export async function generateStaticParams() {
  return products.map((product) => ({ id: product.id }))
}

export default function ProductPage() {
  return <ProductDetail />
}
