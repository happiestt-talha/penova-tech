"use client"
import { motion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"


export default function LoadingPage({
    progress = 0,
    message = "Loading your experience...",
    showProgress = true,
}) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isClient, setIsClient] = useState(false)
    const [animatedProgress, setAnimatedProgress] = useState(0)

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

    // Animate progress smoothly
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedProgress(progress)
        }, 100)
        return () => clearTimeout(timer)
    }, [progress])

    return (
        <div
            className="relative min-h-screen overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: "#FEFFEA" }}
        >
            {/* Background Elements */}
            <div className="absolute inset-0">
                {/* Dynamic Gradient Mesh - Client only */}
                {isClient && (
                    <motion.div
                        className="absolute inset-0 opacity-25"
                        style={{
                            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(48, 60, 106, 0.12) 0%, transparent 50%)`,
                        }}
                    />
                )}

                {/* Animated Gradient Orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl"
                    style={{ backgroundColor: "#303C6A" }}
                    animate={{
                        scale: [1, 1.4, 1],
                        x: mousePosition.x * 0.01,
                        y: mousePosition.y * 0.01,
                    }}
                    transition={{
                        scale: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                        x: { type: "spring", stiffness: 30, damping: 40 },
                        y: { type: "spring", stiffness: 30, damping: 40 },
                    }}
                />

                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20 blur-2xl"
                    style={{ backgroundColor: "#FCC600" }}
                    animate={{
                        scale: [1.4, 1, 1.4],
                        x: mousePosition.x * -0.008,
                        y: mousePosition.y * -0.008,
                    }}
                    transition={{
                        scale: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                        x: { type: "spring", stiffness: 30, damping: 40 },
                        y: { type: "spring", stiffness: 30, damping: 40 },
                    }}
                />

                {/* Floating Loading Particles */}
                {[
                    { size: 6, color: "#FCC600", delay: 0, duration: 3 },
                    { size: 4, color: "#303C6A", delay: 0.5, duration: 4 },
                    { size: 8, color: "#303C6A", delay: 1, duration: 3.5 },
                    { size: 5, color: "#FCC600", delay: 1.5, duration: 4.5 },
                    { size: 3, color: "#303C6A", delay: 2, duration: 3 },
                    { size: 7, color: "#FCC600", delay: 2.5, duration: 4 },
                ].map((particle, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            backgroundColor: particle.color,
                            width: particle.size,
                            height: particle.size,
                            left: `${15 + ((i * 15) % 70)}%`,
                            top: `${20 + ((i * 18) % 60)}%`,
                        }}
                        animate={{
                            y: [-30, 30, -15],
                            opacity: [0.2, 0.6, 0.3, 0.2],
                            scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: particle.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {/* Animated Grid Lines */}
                <div className="absolute inset-0 pointer-events-none opacity-8">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div
                            key={`h-${i}`}
                            className="absolute h-px w-full"
                            style={{
                                backgroundColor: "#303C6A",
                                top: `${12.5 * (i + 1)}%`,
                            }}
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{
                                scaleX: [0, 1, 0],
                                opacity: [0, 0.3, 0],
                            }}
                            transition={{
                                duration: 4,
                                delay: i * 0.2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 2,
                            }}
                        />
                    ))}
                    {Array.from({ length: 6 }).map((_, i) => (
                        <motion.div
                            key={`v-${i}`}
                            className="absolute w-px h-full"
                            style={{
                                backgroundColor: "#FCC600",
                                left: `${16.66 * (i + 1)}%`,
                            }}
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{
                                scaleY: [0, 1, 0],
                                opacity: [0, 0.2, 0],
                            }}
                            transition={{
                                duration: 3,
                                delay: i * 0.3,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 3,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Decorative Corner Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 opacity-30"
                    style={{ borderColor: "#303C6A" }}
                    animate={{ rotate: [0, 90, 0] }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div
                    className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 opacity-30"
                    style={{ borderColor: "#FCC600" }}
                    animate={{ rotate: [0, -90, 0] }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
                />
                <motion.div
                    className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 opacity-30"
                    style={{ borderColor: "#FCC600" }}
                    animate={{ rotate: [0, -90, 0] }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 4 }}
                />
                <motion.div
                    className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 opacity-30"
                    style={{ borderColor: "#303C6A" }}
                    animate={{ rotate: [0, 90, 0] }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 6 }}
                />
            </div>

            {/* Main Loading Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4">
                {/* Central Loading Spinner */}
                <motion.div
                    className="relative mb-12"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Outer Ring */}
                    <motion.div
                        className="w-32 h-32 rounded-full border-4 border-transparent"
                        style={{
                            borderTopColor: "#303C6A",
                            borderRightColor: "#303C6A",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />

                    {/* Inner Ring */}
                    <motion.div
                        className="absolute inset-4 w-24 h-24 rounded-full border-4 border-transparent"
                        style={{
                            borderBottomColor: "#FCC600",
                            borderLeftColor: "#FCC600",
                        }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />

                    {/* Center Dot */}
                    <motion.div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: "#FCC600" }}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>

                    {/* Orbiting Dots */}
                    {Array.from({ length: 6 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: i % 2 === 0 ? "#303C6A" : "#FCC600",
                                left: "50%",
                                top: "50%",
                                transformOrigin: "0 0",
                            }}
                            animate={{
                                rotate: 360,
                                x: Math.cos((i * Math.PI * 2) / 6) * 50 - 6,
                                y: Math.sin((i * Math.PI * 2) / 6) * 50 - 6,
                            }}
                            transition={{
                                rotate: {
                                    duration: 3,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "linear",
                                    delay: i * 0.1,
                                },
                            }}
                        />
                    ))}
                </motion.div>

                {/* Loading Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center mb-8"
                >
                    <motion.h2
                        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
                        style={{ color: "#303C6A" }}
                        animate={{
                            opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    >
                        {message.split(" ").map((word, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.5 + index * 0.1,
                                }}
                                className="inline-block mr-2"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.h2>

                    {/* Loading Dots */}
                    <div className="flex justify-center space-x-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: "#FCC600" }}
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Progress Bar */}
                <AnimatePresence>
                    {showProgress && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="w-full max-w-md"
                        >
                            {/* Progress Label */}
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium" style={{ color: "#303C6A" }}>
                                    Progress
                                </span>
                                <span className="text-sm font-bold" style={{ color: "#FCC600" }}>
                                    {Math.round(animatedProgress)}%
                                </span>
                            </div>

                            {/* Progress Bar Container */}
                            <div
                                className="w-full h-2 rounded-full overflow-hidden"
                                style={{ backgroundColor: "rgba(48, 60, 106, 0.1)" }}
                            >
                                <motion.div
                                    className="h-full rounded-full relative overflow-hidden"
                                    style={{ backgroundColor: "#303C6A" }}
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${animatedProgress}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                >
                                    {/* Progress Bar Shine Effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                        }}
                                    />
                                </motion.div>
                            </div>

                            {/* Progress Milestones */}
                            <div className="flex justify-between mt-2 text-xs" style={{ color: "#303C6A" }}>
                                <span className={animatedProgress >= 25 ? "font-semibold" : "opacity-50"}>Initializing</span>
                                <span className={animatedProgress >= 50 ? "font-semibold" : "opacity-50"}>Loading</span>
                                <span className={animatedProgress >= 75 ? "font-semibold" : "opacity-50"}>Processing</span>
                                <span className={animatedProgress >= 100 ? "font-semibold" : "opacity-50"}>Complete</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Additional Loading Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-8 text-center"
                >
                    <p className="text-sm font-light max-w-md mx-auto leading-relaxed" style={{ color: "#303C6A" }}>
                        We're preparing something amazing for you. This won't take long.
                    </p>
                </motion.div>
            </div>

            {/* Bottom Gradient */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32"
                style={{
                    background: `linear-gradient(to top, rgba(48, 60, 106, 0.03) 0%, transparent 100%)`,
                }}
            />
        </div>
    )
}
