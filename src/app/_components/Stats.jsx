"use client"
import { generatePageMetadata, pageMetadata } from "../../lib/metadata"

import { Building2, Users, Trophy, Zap } from "lucide-react"
import { useEffect, useState } from "react"

export const metadata = generatePageMetadata(pageMetadata.stats)
export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    {
      number: "500+",
      label: "Successfully Running Businesses",
      icon: Building2,
      delay: "delay-0",
    },
    {
      number: "10K+",
      label: "Active Users Worldwide",
      icon: Users,
      delay: "delay-100",
    },
    {
      number: "98%",
      label: "Client Satisfaction Rate",
      icon: Trophy,
      delay: "delay-200",
    },
    {
      number: "24/7",
      label: "Technical Support Available",
      icon: Zap,
      delay: "delay-300",
    },
  ]

  return (
    <section className="relative w-full py-16 bg-gradient-to-br from-tertiary via-tertiary to-secondary/10 overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-repeat opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23303C6A' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-secondary/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse delay-1000" />
      <div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-secondary/15 rounded-full blur-lg animate-bounce delay-500"
        style={{ animationDuration: "3s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mb-6 shadow-lg">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-primary rounded-full" />
            </div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Trusted by Industry Leaders</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-secondary/60 mx-auto rounded-full" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div
                key={index}
                className={`group relative transform transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  } ${stat.delay}`}
              >
                {/* Main Card */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-primary/10 group-hover:border-secondary/30">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/90 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                      <IconComponent className="w-8 h-8 text-secondary" />
                    </div>

                    {/* Floating Ring */}
                    <div className="absolute -inset-2 border-2 border-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
                  </div>

                  {/* Number */}
                  <div className="relative mb-4">
                    <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-br from-primary to-primary/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all duration-500">
                      {stat.number}
                    </span>

                    {/* Animated Underline */}
                    <div className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-secondary to-secondary/60 rounded-full group-hover:w-full transition-all duration-700 delay-200" />
                  </div>

                  {/* Label */}
                  <p className="text-primary/80 text-sm lg:text-base leading-relaxed font-medium group-hover:text-primary transition-colors duration-300">
                    {stat.label}
                  </p>

                  {/* Corner Accent */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-secondary rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300" />

                  {/* Bottom Glow */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Floating Number Background */}
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
              </div>
            )
          })}
        </div>

        {/* Bottom Accent Line */}
        <div className="mt-16 flex justify-center">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent rounded-full opacity-60" />
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-secondary rounded-full animate-ping delay-0" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-primary rounded-full animate-ping delay-1000" />
        <div className="absolute top-1/2 right-1/6 w-0.5 h-0.5 bg-secondary rounded-full animate-ping delay-2000" />
      </div>
    </section>
  )
}
