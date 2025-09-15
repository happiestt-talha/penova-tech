"use client"
import { ChevronLeft, ChevronRight, Linkedin, Twitter, Mail, Users } from "lucide-react"
import { useEffect, useState, useCallback } from "react"

export default function TeamSection() {
    const [isVisible, setIsVisible] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const teamMembers = [
        {
            id: 1,
            name: "Kashif Liaqat",
            role: "Chief Executive Officer",
            image: "/staff/kashif-liaqat.webp",
            bio: "Visionary leader with 15+ years in tech innovation",
            social: {
                linkedin: "#",
                twitter: "#",
                email: "sarah@company.com",
            },
        },
        {
            id: 2,
            name: "Amna Shehzadi",
            role: "UI/UX & Graphic designer",
            image: "/staff/amna-shehzadi.webp",
            bio: "Creative director crafting beautiful user experiences",
            social: {
                linkedin: "#",
                twitter: "#",
                email: "david@company.com",
            },
        },
        {
            id: 3,
            name: "M Talha",
            role: "Full-stack Developr",
            image: "/staff/m-talha.webp",
            bio: "Full-stack architect passionate about scalable solutions",
            social: {
                linkedin: "https://www.linkedin.com/in/mt4lha/",
                twitter: "https://twitter.com/MTalha215",
                email: "mtalhamazoor1930@gmail.com",
            },
        },
        {
            id: 4,
            name: "Danial Kashif",
            role: "Web Developer",
            image: "/staff/danial-kashif.webp",
            bio: "Full-stack architect passionate about scalable solutions",
            social: {
                linkedin: "#",
                twitter: "#",
                email: "michael@company.com",
            },
        },
        {
            id: 5,
            name: "Sarfaraz Baig",
            role: "Digital Marketing and SEO expert",
            image: "/staff/sarfaraz-baig.webp",
            bio: "Marketing expert ensuring seamless project delivery",
            social: {
                linkedin: "#",
                twitter: "#",
                email: "lisa@company.com",
            },
        },
        {
            id: 6,
            name: "M Naeem",
            role: "Senior Web. developer",
            image: "/staff/m-naeem.webp",
            bio: "Senior Web developer with 15+ years of experience",
            social: {
                linkedin: "#",
                twitter: "#",
                email: "alex@company.com",
            },
        },
        {
            id: 7,
            name: "M Shehryar",
            role: "Senior App. develope",
            image: "/staff/m-shehryar.webp",
            bio: "Code enthusiast, passionate about building innovative apps",
            social: {
                linkedin: "#",
                twitter: "#",
                email: "alex@company.com",
            },
        },
    ]

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length)
    }, [teamMembers.length])

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length)
    }, [teamMembers.length])

    const goToSlide = useCallback((index) => {
        setCurrentIndex(index)
    }, [])

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(() => {
            nextSlide()
        }, 3000)

        return () => clearInterval(interval)
    }, [nextSlide, isAutoPlaying])

    // Get visible slides for responsive display
    const getVisibleSlides = () => {
        const slides = []
        const totalSlides = teamMembers.length

        // Show 3 slides on desktop, 2 on tablet, 1 on mobile
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % totalSlides
            slides.push(teamMembers[index])
        }
        return slides
    }

    const visibleSlides = getVisibleSlides()

    return (
        <section id="ourteam" className="relative w-full py-20 bg-gradient-to-br from-tertiary via-white to-tertiary overflow-hidden">
            {/* Background Elements */}
            {/* <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23303C6A' fillOpacity='0.1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                }}
            /> */}

            {/* Floating Background Elements */}
            <div className="absolute top-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute bottom-20 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div
                    className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                >
                    <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3 mb-6">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-primary font-medium">Our Team</span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight">
                        Meet the Brilliant Minds
                        <span className="bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent">
                            {" "}
                            Behind Our Success
                        </span>
                    </h2>

                    <p className="text-primary/80 text-lg max-w-3xl mx-auto leading-relaxed">
                        Our diverse team of experts brings together years of experience, creativity, and passion to deliver
                        exceptional results for every project
                    </p>

                    <div className="w-24 h-1 bg-gradient-to-r from-secondary to-secondary/60 mx-auto rounded-full mt-6" />
                </div>

                {/* Carousel Container */}
                <div
                    className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    {/* Main Carousel */}
                    <div className="relative overflow-hidden rounded-3xl">
                        <div className="flex transition-transform duration-700 ease-in-out">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                                {visibleSlides.map((member, index) => (
                                    <div
                                        key={`${currentIndex}-${index}`}
                                        className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-primary/10 hover:border-secondary/30"
                                    >
                                        {/* Background Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Profile Image */}
                                        <div className="relative mb-6">
                                            <div className="relative w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500">
                                                <img
                                                    src={member.image || "/placeholder.svg"}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                                            </div>

                                            {/* Floating Ring */}
                                            <div className="absolute inset-0 border-2 border-secondary/0 group-hover:border-secondary/30 rounded-2xl transition-all duration-500 animate-pulse opacity-0 group-hover:opacity-100" />
                                        </div>

                                        {/* Member Info */}
                                        <div className="text-center space-y-3 relative">
                                            <h3 className="text-xl font-bold text-primary group-hover:text-primary transition-colors duration-300">
                                                {member.name}
                                            </h3>

                                            <p className="text-secondary font-medium text-sm uppercase tracking-wide">{member.role}</p>

                                            <p className="text-primary/70 text-sm leading-relaxed">{member.bio}</p>

                                            {/* Social Links */}
                                            <div className="flex justify-center gap-3 pt-4">
                                                <a
                                                    href={member.social.linkedin}
                                                    className="w-10 h-10 bg-primary/10 hover:bg-primary rounded-xl flex items-center justify-center transition-all duration-300 group/social hover:scale-110"
                                                    target="_blank"
                                                >
                                                    <Linkedin className="w-4 h-4 text-primary group-hover/social:text-white transition-colors duration-300" />
                                                </a>
                                                <a
                                                    href={member.social.twitter}
                                                    className="w-10 h-10 bg-primary/10 hover:bg-secondary rounded-xl flex items-center justify-center transition-all duration-300 group/social hover:scale-110"
                                                    target="_blank"
                                                >
                                                    <Twitter className="w-4 h-4 text-primary group-hover/social:text-white transition-colors duration-300" />
                                                </a>
                                                <a
                                                    href={`mailto:${member.social.email}`}
                                                    className="w-10 h-10 bg-primary/10 hover:bg-secondary rounded-xl flex items-center justify-center transition-all duration-300 group/social hover:scale-110"
                                                    target="_blank"
                                                >
                                                    <Mail className="w-4 h-4 text-primary group-hover/social:text-white transition-colors duration-300" />
                                                </a>
                                            </div>

                                            {/* Animated Underline */}
                                            <div className="w-0 h-0.5 bg-gradient-to-r from-secondary to-secondary/60 rounded-full group-hover:w-full transition-all duration-700 delay-200 mx-auto" />
                                        </div>

                                        {/* Corner Accent */}
                                        <div className="absolute top-4 right-4 w-2 h-2 bg-secondary/60 rounded-full group-hover:bg-secondary group-hover:scale-150 transition-all duration-300" />

                                        {/* Bottom Glow */}
                                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group border border-primary/10 hover:border-secondary/30"
                    >
                        <ChevronLeft className="w-6 h-6 text-primary group-hover:text-secondary transition-colors duration-300" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group border border-primary/10 hover:border-secondary/30"
                    >
                        <ChevronRight className="w-6 h-6 text-primary group-hover:text-secondary transition-colors duration-300" />
                    </button>
                </div>

                {/* Carousel Indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {teamMembers.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-secondary scale-125" : "bg-primary/30 hover:bg-primary/50"
                                }`}
                        />
                    ))}
                </div>

                {/* Bottom Decorative Line */}
                <div className="mt-16 flex justify-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-0.5 bg-primary/30 rounded-full" />
                        <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                        <div className="w-16 h-0.5 bg-primary/30 rounded-full" />
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse delay-500" />
                        <div className="w-8 h-0.5 bg-primary/30 rounded-full" />
                    </div>
                </div>
            </div>
        </section>
    )
}
