"use client"
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#FEFFEA" }}>
      {/* Background Elements - Similar to Hero */}
      <div className="absolute inset-0">
        {/* Dynamic Gradient Mesh - Client only */}
        {isClient && (
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(48, 60, 106, 0.15) 0%, transparent 50%)`,
            }}
          />
        )}

        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/3 left-1/5 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ backgroundColor: "#303C6A" }}
          animate={{
            scale: [1, 1.3, 1],
            x: mousePosition.x * 0.015,
            y: mousePosition.y * 0.015,
          }}
          transition={{
            scale: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            x: { type: "spring", stiffness: 50, damping: 30 },
            y: { type: "spring", stiffness: 50, damping: 30 },
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/5 w-72 h-72 rounded-full opacity-20 blur-2xl"
          style={{ backgroundColor: "#FCC600" }}
          animate={{
            scale: [1.3, 1, 1.3],
            x: mousePosition.x * -0.01,
            y: mousePosition.y * -0.01,
          }}
          transition={{
            scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            x: { type: "spring", stiffness: 50, damping: 30 },
            y: { type: "spring", stiffness: 50, damping: 30 },
          }}
        />

        {/* Floating Elements - Fixed for hydration */}
        {[
          { size: 4, color: "#FCC600", delay: 0 },
          { size: 6, color: "#303C6A", delay: 1 },
          { size: 3, color: "#303C6A", delay: 2 },
          { size: 5, color: "#FCC600", delay: 0.5 },
          { size: 4, color: "#303C6A", delay: 1.5 },
          { size: 7, color: "#303C6A", delay: 2.5 },
          { size: 3, color: "#FCC600", delay: 3 },
          { size: 5, color: "#303C6A", delay: 3.5 },
          { size: 6, color: "#303C6A", delay: 4 },
          { size: 4, color: "#FCC600", delay: 1.2 },
          { size: 5, color: "#303C6A", delay: 2.8 },
          { size: 3, color: "#303C6A", delay: 0.8 },
        ].map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: particle.color,
              width: particle.size,
              height: particle.size,
              left: `${10 + ((i * 8) % 80)}%`,
              top: `${15 + ((i * 12) % 70)}%`,
            }}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              y: [-25, 25, -12],
              opacity: [0, 0.3, 0.1, 0],
              rotate: [0, 360],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + (i % 3),
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-16 gap-6 h-full w-full p-8">
            {Array.from({ length: 128 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: "#303C6A" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.4, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  delay: i * 0.03,
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {/* Decorative Corner Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 opacity-20"
            style={{ borderColor: "#303C6A" }}
          />
          <div
            className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 opacity-20"
            style={{ borderColor: "#FCC600" }}
          />
          <div
            className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 opacity-20"
            style={{ borderColor: "#FCC600" }}
          />
          <div
            className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 opacity-20"
            style={{ borderColor: "#303C6A" }}
          />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Number with Special Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8"
          >
            <motion.h1
              className="text-8xl md:text-9xl lg:text-[12rem] font-bold leading-none"
              style={{ color: "#303C6A" }}
              animate={{
                textShadow: [
                  "0 0 0px rgba(252, 198, 0, 0)",
                  "0 0 20px rgba(252, 198, 0, 0.3)",
                  "0 0 0px rgba(252, 198, 0, 0)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              404
            </motion.h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#303C6A" }}>
              Oops! Page Not Found
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl lg:text-2xl font-light max-w-2xl mx-auto leading-relaxed"
              style={{ color: "#303C6A" }}
            >
              The page you're looking for seems to have wandered off into the digital void. Don't worry, even the best
              explorers sometimes take a wrong turn.
            </motion.p>
          </motion.div>

          {/* Animated Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="w-24 h-1 mx-auto mb-8 rounded-full"
            style={{ backgroundColor: "#FCC600" }}
          />

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 20px 40px rgba(48, 60, 106, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 overflow-hidden min-w-[180px]"
                style={{ backgroundColor: "#303C6A", color: "#FEFFEA" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{ backgroundColor: "#FCC600" }}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Back to Home
                </span>
              </motion.button>
            </Link>

            <Link href="/#contact">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  backgroundColor: "#FCC600",
                  color: "#303C6A",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-2xl font-bold text-lg border-3 transition-all duration-500 overflow-hidden min-w-[180px]"
                style={{
                  borderColor: "#FCC600",
                  color: "#303C6A",
                  backgroundColor: "transparent",
                  borderWidth: "3px",
                }}
              >
                <div
                  className="absolute inset-0 -translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  style={{ backgroundColor: "#FCC600" }}
                />
                <span className="relative z-10 transition-colors duration-500">Get Help</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-12"
          >
            <p className="text-sm font-medium mb-4" style={{ color: "#303C6A" }}>
              Or try one of these popular pages:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Services", href: "/services" },
                { name: "About Us", href: "/about" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "Contact", href: "/contact" },
              ].map((link, index) => (
                <Link key={link.name} href={link.href}>
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                    whileHover={{
                      color: "#FCC600",
                      scale: 1.05,
                    }}
                    className="text-sm font-medium cursor-pointer transition-colors duration-300 px-3 py-1 rounded-lg border border-transparent hover:border-current"
                    style={{ color: "#303C6A" }}
                  >
                    {link.name}
                  </motion.span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Fun Element - Animated Icon */}
          <motion.div
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-16"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(252, 198, 0, 0.1)", border: "2px solid #FCC600" }}
            >
              <span className="text-2xl">🚀</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: `linear-gradient(to top, rgba(48, 60, 106, 0.05) 0%, transparent 100%)`,
        }}
      />
    </div>
  )
}
