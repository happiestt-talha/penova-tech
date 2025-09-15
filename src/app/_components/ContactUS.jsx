"use client"
import { generatePageMetadata, pageMetadata } from "../../lib/metadata"

import React from "react"
import { MapPin, Mail, Phone, Send, User, MessageSquare } from "lucide-react"
import { useState } from "react"

export const metadata = generatePageMetadata(pageMetadata.contact)

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("idle")
  const [serverMessage, setServerMessage] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setServerMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitStatus("success")
        setServerMessage(data?.message || "Thanks — your message has been sent!")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
        setServerMessage(data?.error || "Oops — something went wrong. Please try again.")
        console.error("Contact API error:", data)
      }
    } catch (err) {
      console.error("Network error:", err)
      setSubmitStatus("error")
      setServerMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Address",
      content: "Johar Town, Lahore, Pakistan",
      gradient: "from-primary to-primary/80",
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "info@pen-tech-solution.com",
      gradient: "from-secondary to-secondary/80",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+92-321-8815888",
      gradient: "from-primary to-secondary",
    },
  ]

  return (
    <section id="contact" className="relative w-full py-20 bg-gradient-to-br from-tertiary/80 via-tertiary/60 to-secondary/30 overflow-hidden">
      {/* ... keep your existing UI (header, cards, map) unchanged ... */}
      <div className="container mx-auto px-4 relative z-10">
        {/* (header and contact cards here — same as your original) */}

        {/* Google Maps and Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Google Maps (unchanged) */}
          <div className="relative">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-4 shadow-xl border border-white/60">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden">
                <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3403.0122542699564!2d74.26208157560949!3d31.468849074237568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDI4JzA3LjkiTiA3NMKwMTUnNTIuOCJF!5e0!3m2!1sen!2s!4v1753347111894!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/60">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-primary mb-3">Send us a Message</h3>
                <p className="text-primary/70">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/50" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white/80 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/50" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white/80 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/80 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/80 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full px-8 py-4 bg-primary hover:bg-primary/90 disabled:bg-primary/50 rounded-2xl font-bold text-tertiary transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-tertiary/30 border-t-tertiary rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                </button>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="p-4 bg-green-100/90 backdrop-blur-sm border border-green-300/60 rounded-xl">
                    <p className="text-green-800 text-sm">{serverMessage || "Thank you! Your message has been sent successfully."}</p>
                    <p className="text-green-700 mt-2 text-sm">We'll read your message and respond with care — talk soon ❤️</p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-100/90 backdrop-blur-sm border border-red-300/60 rounded-xl">
                    <p className="text-red-800 text-sm">{serverMessage || "Sorry, there was an error sending your message. Please try again."}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
