"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general",
      })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Flagship Store",
      details: ["123 KishanPole", "Jaipur, 302001", "India"],
      color: "text-yellow-600",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 12345-12345", "International: +91 12345-12345"],
      color: "text-yellow-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["support@gemistryjewelry.com", "custom@gemistryjewelry.com"],
      color: "text-yellow-600",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 10:00 AM - 8:00 PM", "Saturday: 10:00 AM - 6:00 PM", "Sunday: 12:00 PM - 5:00 PM"],
      color: "text-yellow-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-yellow-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center fade-in">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            {contactInfo.map((info, index) => (
              <div
                key={info.title}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full bg-yellow-100 ${info.color}`}>
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Social Media */}
            <div className="bg-white rounded-xl p-6 shadow-lg bounce-in">
              <h3 className="font-playfair text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 hover:bg-yellow-200 transition-colors transform hover:scale-110"
                >
                  <span className="text-sm font-bold">f</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 hover:bg-yellow-200 transition-colors transform hover:scale-110"
                >
                  <span className="text-sm font-bold">ig</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 hover:bg-yellow-200 transition-colors transform hover:scale-110"
                >
                  <span className="text-sm font-bold">tw</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 fade-in">
              <div className="flex items-center space-x-3 mb-6">
                <MessageCircle className="w-8 h-8 text-yellow-600" />
                <h2 className="font-playfair text-2xl font-bold text-gray-900">Send us a Message</h2>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12 bounce-in">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-playfair text-2xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="luxury-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="luxury-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="luxury-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type</label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="luxury-input"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="custom">Custom Design</option>
                        <option value="repair">Repair Service</option>
                        <option value="appointment">Store Appointment</option>
                        <option value="wholesale">Wholesale</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="luxury-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="luxury-input resize-none"
                      placeholder="Tell us about your inquiry..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn-primary w-full flex items-center justify-center space-x-2 ${
                      isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 fade-in">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-yellow-600 mx-auto mb-4 float" />
                <h3 className="font-playfair text-2xl font-semibold text-gray-900 mb-2">Visit Our Flagship Store</h3>
                <p className="text-gray-600">123 KishanPole, Jaipur, Rajasthan, 302001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
