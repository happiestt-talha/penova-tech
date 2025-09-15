"use client"
import { generatePageMetadata, pageMetadata } from "../../lib/metadata"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"

export const metadata = generatePageMetadata(pageMetadata.services)

export default function ServiceCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    const carouselItems = [
        { id: 1, title: "Web Development", description: "Responsive, accessible web apps and marketing sites.", ctaText: "Start Project", backgroundImage: "/images/web-dev.webp" },
        { id: 2, title: "Mobile Apps", description: "Native & cross-platform mobile experiences.", ctaText: "Build App", backgroundImage: "/images/app-development.webp" },
        { id: 3, title: "Cloud Engineering", description: "Scalable cloud architecture & migrations.", ctaText: "Go Cloud", backgroundImage: "/images/cloud.webp" },
        { id: 4, title: "Digital Transformation", description: "Modernise products and processes end-to-end.", ctaText: "Transform", backgroundImage: "/images/digital.webp" },
        { id: 5, title: "Cybersecurity", description: "Security reviews, monitoring and incident response.", ctaText: "Secure Now", backgroundImage: "/images/cybersecurity.webp" },
        { id: 6, title: "Data & Analytics", description: "Deliver insights using pipelines and BI.", ctaText: "Get Insights", backgroundImage: "/images/data-analytics.webp" },
        { id: 7, title: "Support & Ops", description: "24/7 support, SRE and managed services.", ctaText: "Get Support", backgroundImage: "/images/technical-support.webp" },
    ]

    // navigation helpers
    const nextSlide = useCallback(() => setCurrentIndex((i) => (i + 1) % carouselItems.length), [carouselItems.length])
    const prevSlide = useCallback(() => setCurrentIndex((i) => (i - 1 + carouselItems.length) % carouselItems.length), [carouselItems.length])
    const goToSlide = useCallback((index) => setCurrentIndex(index), [])

    // autoplay
    useEffect(() => {
        if (!isAutoPlaying) return
        const id = setInterval(nextSlide, 5000)
        return () => clearInterval(id)
    }, [isAutoPlaying, nextSlide])

    // keyboard navigation
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowRight") nextSlide()
            if (e.key === "ArrowLeft") prevSlide()
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [nextSlide, prevSlide])

    const current = carouselItems[currentIndex]

    return (
        <section id="services" className="w-full bg-transparent py-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Wrapper: stacked on small, side-by-side on md+ */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">

                    {/* LEFT: Services list - sticky on lg */}
                    <aside className="w-full md:w-5/12 lg:w-4/12">
                        <div className="sticky top-20">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-primary">Our services</h2>
                            <p className="text-sm md:text-base text-primary/80 mb-6">
                                We design and build web & mobile apps, cloud infrastructure, data platforms, and provide managed support to scale your business.
                            </p>

                            <div className="mt-4">
                                <button className="inline-flex items-center gap-3 px-5 py-2 rounded-lg bg-secondary text-primary font-semibold shadow-sm">
                                    <Link href="#contact" className="inline-flex items-center gap-3 px-5 py-2 rounded-lg bg-secondary text-primary font-semibold shadow-sm">Contact us</Link>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* RIGHT: Carousel card */}
                    <div className="w-full md:w-7/12 lg:w-8/12 flex">
                        <div className="relative w-full bg-gradient-to-b from-black/5 to-transparent rounded-2xl shadow-2xl overflow-hidden">
                            {/* Card content with fixed aspect on small screens and larger height on md+ */}
                            <div
                                className="w-full h-72 md:h-[66vh] lg:h-[70vh] relative"
                                onMouseEnter={() => setIsAutoPlaying(false)}
                                onMouseLeave={() => setIsAutoPlaying(true)}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ duration: 0.6 }}
                                        className="absolute inset-0"
                                    >
                                        {/* image */}
                                        <Image src={current.backgroundImage || "/placeholder.svg"} alt={current.title} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />

                                        {/* dark overlay for readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                        {/* caption */}
                                        <div className="absolute left-6 bottom-6 right-6 md:left-12 md:bottom-12">
                                            <div className="backdrop-blur-sm bg-black/30 rounded-xl p-5 max-w-3xl">
                                                <h3 className="text-xl md:text-3xl font-bold text-white leading-tight">{current.title}</h3>
                                                <p className="text-sm md:text-base text-white/90 mt-2 max-w-2xl">{current.description}</p>

                                                <div className="mt-4 flex items-center gap-3">
                                                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-primary font-semibold">
                                                        <Link href="#contact" className="inline-flex items-center gap-3 px-5 py-2 rounded-lg bg-secondary text-primary font-semibold shadow-sm">{current.ctaText}</Link>
                                                    </button>

                                                    <div className="hidden md:flex items-center gap-3 text-white/70">
                                                        <span className="text-sm">{String(currentIndex + 1).padStart(2, "0")} / {String(carouselItems.length).padStart(2, "0")}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* carousel nav - arrows */}
                                <button
                                    onClick={prevSlide}
                                    aria-label="Previous slide"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-lg bg-black/30 backdrop-blur-sm flex items-center justify-center z-20 hover:scale-105 transition-transform"
                                >
                                    <ChevronLeft className="w-5 h-5 text-white" />
                                </button>

                                <button
                                    onClick={nextSlide}
                                    aria-label="Next slide"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-lg bg-black/30 backdrop-blur-sm flex items-center justify-center z-20 hover:scale-105 transition-transform"
                                >
                                    <ChevronRight className="w-5 h-5 text-white" />
                                </button>

                                {/* bottom dots */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                    {carouselItems.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => goToSlide(idx)}
                                            aria-label={`Go to slide ${idx + 1}`}
                                            className={`w-8 h-2 rounded-full transition-all ${idx === currentIndex ? "bg-secondary scale-110" : "bg-white/30 hover:bg-white/50"}`}
                                        />
                                    ))}
                                </div>

                                {/* side quick-thumbs (small preview on right for md+) */}
                                <div className="hidden md:flex flex-col gap-3 absolute right-4 top-1/2 -translate-y-1/2 z-20">
                                    {carouselItems.slice(0, 5).map((it, i) => (
                                        <button key={it.id} onClick={() => goToSlide(i)} className={`w-12 h-12 rounded-lg overflow-hidden border ${i === currentIndex ? "ring-2 ring-secondary" : "border-white/10"}`}>
                                            <Image src={it.backgroundImage} alt={it.title} width={48} height={48} className="object-cover" />
                                        </button>
                                    ))}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
