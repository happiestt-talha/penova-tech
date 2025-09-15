"use client"
import { generatePageMetadata, pageMetadata } from "../../lib/metadata"

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUp,
  Code,
  Smartphone,
  Cloud,
  Shield,
} from "lucide-react"
import Image from "next/image"

export const metadata = generatePageMetadata(pageMetadata.home)
export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const footerLinks = {
    services: [
      { name: "Web Development", href: "#" },
      { name: "Mobile Apps", href: "#" },
      { name: "Cloud Solutions", href: "#" },
      { name: "Cybersecurity", href: "#" },
      { name: "Data Analytics", href: "#" },
      { name: "Technical Support", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Our Team", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Case Studies", href: "#" },
      { name: "Testimonials", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Documentation", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "System Status", href: "#" },
      { name: "Contact Support", href: "#" },
      { name: "Community", href: "#" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ]

  const serviceIcons = [
    { icon: Code, name: "Development" },
    { icon: Smartphone, name: "Mobile" },
    { icon: Cloud, name: "Cloud" },
    { icon: Shield, name: "Security" },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23FCC600' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary via-primary/90 to-secondary/20" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-primary/80 via-transparent to-transparent" />

      {/* Floating Background Elements */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-secondary/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-56 h-56 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-secondary/6 rounded-full blur-2xl animate-pulse delay-500" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl flex items-center justify-center shadow-lg">
                    <Image src="/logo.svg" alt="Logo" width={50} height={50} />
                  </div>
                  <h3 className="text-2xl font-bold text-tertiary">Penova Tech Solutions</h3>
                </div>

                {/* Service Icons */}
                <div className="flex gap-3 mb-6">
                  {serviceIcons.map(({ icon: Icon, name }, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 bg-secondary/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-secondary/30 transition-colors duration-300 group border border-secondary/10"
                      title={name}
                    >
                      <Icon className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  ))}
                </div>

                {/* Updated Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-tertiary/80">
                    <MapPin className="w-5 h-5 text-secondary flex-shrink-0" />
                    <div className="text-sm">
                      <div className="font-medium">Dubai, U.A.E.</div>
                      <div className="leading-relaxed">Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-tertiary/80">
                    <MapPin className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">Johar Town, Lahore, Pakistan</span>
                  </div>

                  <div className="flex items-center gap-3 text-tertiary/80">
                    <Phone className="w-4 h-4 text-secondary" />
                    <a href="tel:+923218815888" className="text-sm hover:text-secondary transition-colors duration-200">Pakistan: +92 321 8815888</a>
                  </div>

                  <div className="flex items-center gap-3 text-tertiary/80">
                    <Phone className="w-4 h-4 text-secondary" />
                    <a href="tel:+971581474250" className="text-sm hover:text-secondary transition-colors duration-200">UAE: +971 58 147 4250</a>
                  </div>

                  <div className="flex items-center gap-3 text-tertiary/80">
                    <Mail className="w-4 h-4 text-secondary" />
                    <a href="mailto:info@penovatech.com" className="text-sm hover:text-secondary transition-colors duration-200">info@penovatech.com</a>
                  </div>

                  <div className="flex items-center gap-3 text-tertiary/80">
                    <Smartphone className="w-4 h-4 text-secondary" />
                    <a href="https://wa.me/923218815888" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-secondary transition-colors duration-200">WhatsApp: +92 321 8815888</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Links - Now 3 columns instead of 4 */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Services */}
                <div>
                  <h4 className="text-lg font-bold text-tertiary mb-6 relative">
                    Services
                    <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-secondary to-secondary/60 rounded-full" />
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.services.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          className="text-tertiary/70 hover:text-secondary transition-colors duration-300 text-sm flex items-center gap-2 group"
                        >
                          <div className="w-1 h-1 bg-secondary/50 rounded-full group-hover:bg-secondary transition-colors duration-300" />
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h4 className="text-lg font-bold text-tertiary mb-6 relative">
                    Company
                    <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-secondary to-secondary/60 rounded-full" />
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          className="text-tertiary/70 hover:text-secondary transition-colors duration-300 text-sm flex items-center gap-2 group"
                        >
                          <div className="w-1 h-1 bg-secondary/50 rounded-full group-hover:bg-secondary transition-colors duration-300" />
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Support */}
                <div>
                  <h4 className="text-lg font-bold text-tertiary mb-6 relative">
                    Support
                    <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-secondary to-secondary/60 rounded-full" />
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.support.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          className="text-tertiary/70 hover:text-secondary transition-colors duration-300 text-sm flex items-center gap-2 group"
                        >
                          <div className="w-1 h-1 bg-secondary/50 rounded-full group-hover:bg-secondary transition-colors duration-300" />
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-tertiary/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-tertiary/70 text-sm">
              © {new Date().getFullYear()} Penova Tech Solutions. All rights reserved. Built with passion and innovation.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }, index) => (
                <a
                  key={index}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 bg-tertiary/10 hover:bg-secondary backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group border border-tertiary/20 hover:border-secondary"
                >
                  <Icon className="w-5 h-5 text-tertiary/70 group-hover:text-primary transition-colors duration-300" />
                </a>
              ))}
            </div>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-gradient-to-br from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group shadow-lg hover:shadow-xl"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 text-primary group-hover:translate-y-[-2px] transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
