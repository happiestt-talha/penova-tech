"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { generatePageMetadata, pageMetadata } from "../../lib/metadata"

export const metadata = generatePageMetadata(pageMetadata.portfolio)

/**
 * HeroCarouselSection (updated overlays + colors)
 * - Stronger, animated overlay per slide for text legibility
 * - Video filter (brightness/contrast) to darken footage
 * - Headings/subtitles switched to white with drop shadow
 * - CTA styles updated for contrast on video
 * - Controls/inidcators updated to match new palette
 */
export default function HeroCarouselSection() {
    const shouldReduceMotion = useReducedMotion()
    const [index, setIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isHovering, setIsHovering] = useState(false)
    const autoplayRef = useRef(null)

    // Example slides — replace videoSrc/poster with your assets
    const slides = [
        {
            id: 0,
            title: "Build AI-first Products",
            subtitle: "From prototype to production — tailored AI models + UX that users love.",
            ctas: [
                { label: "Talk to an Expert", href: "#contact", primary: true },
                { label: "See Case Study", href: "#case-study", primary: false },
            ],
            videoSrc: "/videos/service-ai.webm",
            poster: "/images/service-ai-poster.webp",
        },
        {
            id: 1,
            title: "Web & Mobile App Development",
            subtitle: "Custom web and mobile app development tailored to your business needs.",
            ctas: [
                { label: "Get a Quote", href: "#contact", primary: true },
                { label: "Architecture Guide", href: "#guide", primary: false },
            ],
            videoSrc: "/videos/service-app.webm",
            poster: "/images/service-app-poster.webp",
        },
        {
            id: 2,
            title: "Cybersecurity",
            subtitle: "Protect your data and systems from cyber threats.",
            ctas: [
                { label: "Start a Project", href: "#contact", primary: true },
                { label: "Our Work", href: "#portfolio", primary: false },
            ],
            videoSrc: "/videos/service-cybersecurity.webm",
            poster: "/images/service-cybersecurity-poster.webp",
        },
        {
            id: 3,
            title: "Technical Support",
            subtitle: "24/7 technical support for your business.",
            ctas: [
                { label: "Start a Project", href: "#contact", primary: true },
                { label: "Our Work", href: "#portfolio", primary: false },
            ],
            videoSrc: "/videos/service-technical-support.webm",
            poster: "/images/service-technical-support-poster.webp",
        }
    ]

    // Auto-advance duration (ms)
    const AUTO_ADVANCE_MS = 5000

    useEffect(() => {
        // autoplay only if playing, not hovering, and motion isn't reduced
        if (!isPlaying || isHovering || shouldReduceMotion) return
        autoplayRef.current = window.setTimeout(() => {
            setIndex((prev) => (prev + 1) % slides.length)
        }, AUTO_ADVANCE_MS)

        return () => {
            if (autoplayRef.current) window.clearTimeout(autoplayRef.current)
            autoplayRef.current = null
        }
    }, [index, isPlaying, isHovering, shouldReduceMotion, slides.length])

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowRight") next()
            if (e.key === "ArrowLeft") prev()
            if (e.key === " ") setIsPlaying((p) => !p)
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    function next() {
        setIndex((i) => (i + 1) % slides.length)
    }
    function prev() {
        setIndex((i) => (i - 1 + slides.length) % slides.length)
    }

    function goTo(i) {
        setIndex(i % slides.length)
    }

    return (
        <section
            className="relative w-full min-h-screen overflow-hidden bg-[#0b1220]"
            aria-roledescription="carousel"
            aria-label="Services carousel"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Slides (stacked) */}
            <div className="absolute inset-0">
                {slides.map((s, i) => (
                    <Slide
                        key={s.id}
                        data={s}
                        visible={i === index}
                        below={i < index}
                        reduceMotion={shouldReduceMotion}
                    />
                ))}
            </div>

            {/* Overlay content (centered) */}
            <div className="relative z-30 flex items-center justify-center min-h-screen px-6 py-24">
                <div className="max-w-4xl text-center">
                    {/* Headline + Subtitle change with slide */}
                    <motion.div
                        key={slides[index].id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white drop-shadow-2xl">
                            {slides[index].title}
                        </h2>

                        <p className="mt-4 text-lg md:text-xl text-white/85 max-w-2xl mx-auto font-light drop-shadow-lg">
                            {slides[index].subtitle}
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            {slides[index].ctas.map((c, idx) => (
                                <a
                                    key={idx}
                                    href={c.href}
                                    className={`inline-flex items-center justify-center rounded-2xl px-8 py-4 font-semibold text-lg transition-transform duration-200 ${c.primary ? 'bg-[#FCC600] text-[#0F2345] shadow-lg' : 'bg-white/10 border border-white/30 text-white'} `}
                                    style={{ backdropFilter: 'blur(6px)' }}
                                >
                                    {c.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Controls */}
            <div className="absolute z-40 left-6 top-1/2 transform -translate-y-1/2">
                <button
                    aria-label="Previous slide"
                    onClick={prev}
                    className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 focus:outline-none text-white"
                >
                    <ChevronLeft size={22} />
                </button>
            </div>

            <div className="absolute z-40 right-6 top-1/2 transform -translate-y-1/2">
                <button
                    aria-label="Next slide"
                    onClick={next}
                    className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 focus:outline-none text-white"
                >
                    <ChevronRight size={22} />
                </button>
            </div>

            {/* Play / Pause */}
            <div className="absolute z-40 right-6 bottom-6 flex items-center gap-3">
                <button
                    aria-pressed={!isPlaying}
                    onClick={() => setIsPlaying((p) => !p)}
                    className="p-3 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 focus:outline-none flex items-center gap-2 text-white"
                >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    <span className="sr-only">Toggle autoplay</span>
                </button>

                {/* Indicators */}
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-2" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))' }}>
                    {slides.map((s, i) => (
                        <button
                            key={s.id}
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`w-10 h-2 rounded-full ${i === index ? 'bg-[#FCC600]' : 'bg-white/30'}`}
                        />
                    ))}
                </div>
            </div>

            {/* subtle bottom gradient */}
            <div className="absolute left-0 right-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-black/35 to-transparent z-20" />
        </section>
    )
}


function Slide({ data, visible, below, reduceMotion }) {
    // visible: currently active slide
    // below: whether the slide is before current index - used for layering
    const ref = useRef(null)

    useEffect(() => {
        if (!ref.current) return
        if (visible) {
            // try to play; muted allows autoplay in most browsers
            ref.current.play().catch(() => {
                // ignore autoplay errors
            })
        } else {
            try { ref.current.pause() } catch (e) { }
        }
    }, [visible])

    return (
        <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.8 }}
            style={{ zIndex: visible ? 5 : (below ? 3 : 1) }}
            aria-hidden={!visible}
        >
            {/* Video background with poster fallback */}
            <video
                ref={ref}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                loop
                playsInline
                poster={data.poster}
                preload="metadata"
                aria-hidden
                // darken and slightly desaturate video for legibility
                style={{ filter: 'brightness(0.45) contrast(0.95) saturate(0.85)' }}
            >
                <source src={data.videoSrc} type="video/webm" />
                {/* fallback image if video not supported */}
            </video>

            {/* animated overlay for text legibility (uses framer-motion for smoother fades) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: visible ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.6 }}
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to top, rgba(2,6,23,0.75) 0%, rgba(2,6,23,0.55) 20%, rgba(2,6,23,0.35) 45%, rgba(2,6,23,0.15) 75%, rgba(2,6,23,0) 100%)'
                }}
            />

            {/* decorative circuit svg per slide (subtle layer) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
                <defs>
                    <linearGradient id={`s-grad-${data.id}`} x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="#303C6A" stopOpacity="0.04" />
                        <stop offset="100%" stopColor="#FCC600" stopOpacity="0.01" />
                    </linearGradient>
                </defs>
                <g stroke={`url(#s-grad-${data.id})`} strokeWidth="1.2" fill="none" opacity="0.09">
                    <line x1="2%" x2="98%" y1="20%" y2="20%" />
                    <line x1="2%" x2="98%" y1="40%" y2="40%" />
                    <circle cx="12%" cy="20%" r="2" />
                    <circle cx="68%" cy="40%" r="2" />
                </g>
            </svg>
        </motion.div>
    )
}
