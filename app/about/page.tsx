import Image from "next/image"
import { Award, Users, Heart, Sparkles, Shield, Clock } from "lucide-react"

export default function About() {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description:
        "We maintain the highest standards in craftsmanship and materials, ensuring every piece meets our exacting quality requirements.",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "Our love for jewelry design drives us to create pieces that capture emotions and celebrate life's most precious moments.",
    },
    {
      icon: Users,
      title: "Heritage",
      description:
        "Three generations of master jewelers have passed down their expertise, combining traditional techniques with modern innovation.",
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description:
        "We continuously explore new designs and techniques while respecting the timeless traditions of fine jewelry making.",
    },
  ]

  // ✅ Updated milestones for Gemistry Jewellery (Jaipur)
const milestones = [
  { year: "1985", event: "Gemistry Jewellery was founded in Jaipur, Rajasthan" },
  { year: "1992", event: "Opened our first boutique in Johari Bazaar, Jaipur" },
  { year: "2005", event: "Expanded our collection to include modern fusion jewellery" },
  { year: "2012", event: "Collaborated with local artisans to revive traditional Kundan & Meenakari work" },
  { year: "2018", event: "Started ethically sourced gemstone and sustainable jewellery initiatives" },
  { year: "2024", event: "Launched Gemistry Jewellery online to share Jaipur’s heritage with the world" },
]


  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/banner.jpg?height=800&width=1600&text=Jewelry+Workshop"
          alt="Gemistry Jewellery Workshop"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 fade-in">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl text-gray-200">
            A legacy of Jaipur’s heritage and timeless craftsmanship
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="slide-up">
              <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-6">The Gemistry Legacy</h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Welcome to <strong>Gemistry Jewellery</strong>, where timeless elegance meets modern artistry. Born in the heart of <strong>Jaipur, Rajasthan</strong> – the vibrant city known as the <em>Pink City of India</em> and the jewellery capital of the world – Gemistry is more than just a brand. It is a celebration of India’s centuries-old craftsmanship blended with contemporary designs for today’s generation.
                </p>
                <p>
                  From the bustling lanes of Johari Bazaar to the royal legacy of Rajputana jewels, our inspiration comes from the rich heritage of Rajasthan. Every piece we create is a tribute to the artisans whose skill has been passed down for generations, reimagined for the modern wearer.
                </p>
                <p>
                  At Gemistry Jewellery, we believe jewellery is not just an accessory – it’s a story you wear. Our mission is to bring a piece of Jaipur’s magic into every jewellery box, making luxury accessible, meaningful, and timeless.
                </p>
              </div>
            </div>
            <div className="bounce-in">
              <Image
                src="/logo.jpg?height=600&width=600&text=Gemistry+Jewellery"
                alt="Gemistry Jewellery Founder"
                width={600}
                height={600}
                className="rounded-xl shadow-2xl float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-in">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision we make and every piece we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bounce-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-3 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-in">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Milestones that have shaped our legacy over four decades
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} slide-up`}
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className="font-playfair text-2xl font-bold text-yellow-600 mb-2">{milestone.year}</div>
                      <p className="text-gray-700 text-lg">{milestone.event}</p>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full border-4 border-white shadow-lg pulse-glow"></div>
                  </div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 fade-in">
                <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-6">Our Commitment</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Shield className="w-8 h-8 text-yellow-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Ethical Sourcing</h3>
                      <p className="text-gray-600">
                        We ensure all our materials are ethically sourced and conflict-free, supporting responsible
                        mining practices worldwide.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Clock className="w-8 h-8 text-yellow-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Lifetime Craftsmanship</h3>
                      <p className="text-gray-600">
                        Every piece comes with our lifetime warranty, reflecting our confidence in the quality and
                        durability of our work.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Heart className="w-8 h-8 text-yellow-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Personal Touch</h3>
                      <p className="text-gray-600">
                        We offer personalization and custom design services to create unique pieces that tell your
                        individual story.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-96 lg:h-auto bounce-in">
                <Image
                  src="/craftsman.jpg?height=600&width=600&text=Craftsman+at+Work"
                  alt="Master craftsman at work"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
