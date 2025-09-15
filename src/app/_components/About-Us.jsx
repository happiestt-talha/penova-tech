"use client"
import { generatePageMetadata,pageMetadata } from "../../lib/metadata"

import { Target, Heart, Lightbulb, Users } from "lucide-react"
import { useEffect, useState } from "react"

export const metadata = generatePageMetadata(pageMetadata.about)
export default function AboutUs() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const values = [
        {
            icon: Target,
            title: "Innovation",
            description: "Pushing boundaries with cutting-edge technology solutions",
        },
        {
            icon: Heart,
            title: "Integrity",
            description: "Building trust through transparent and ethical practices",
        },
        {
            icon: Lightbulb,
            title: "Excellence",
            description: "Delivering exceptional quality in everything we do",
        },
        {
            icon: Users,
            title: "Collaboration",
            description: "Working together to achieve extraordinary results",
        },
    ]

    return (
        <section id="about-us" className="relative w-full py-20 bg-gradient-to-br from-tertiary via-white to-tertiary overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute bottom-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse" />

            {/* Floating Particles */}
            <div
                className="absolute top-1/3 left-1/5 w-2 h-2 bg-secondary/30 rounded-full animate-bounce delay-0"
                style={{ animationDuration: "4s" }}
            />
            <div
                className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce delay-1000"
                style={{ animationDuration: "3s" }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side - Images */}
                    <div
                        className={`relative transform transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
                    >
                        {/* Main Image Container */}
                        <div className="relative">
                            {/* Primary Image */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                                <img
                                    src="/images/team-a.webp"
                                    alt="Our team collaborating in a modern workspace"
                                    className="w-full h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />

                                {/* Overlay Badge */}
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                                    <span className="text-primary font-semibold text-sm">Since 2015</span>
                                </div>
                            </div>

                            {/* Secondary Stacked Image */}
                            <div className="absolute -bottom-8 -right-8 w-48 h-32 lg:w-64 lg:h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-white group hover:shadow-2xl transition-all duration-500">
                                <img
                                    src="/images/team-b.webp"   
                                    alt="Innovative technology solutions"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent" />

                                {/* Floating Icon */}
                                <div className="absolute top-3 right-3 w-8 h-8 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                                    <Lightbulb className="w-4 h-4 text-primary" />
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl rotate-12 shadow-lg" />
                            <div className="absolute top-1/2 -left-6 w-6 h-6 bg-primary/20 rounded-full blur-sm" />
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div
                        className={`space-y-8 transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
                    >
                        {/* Header */}
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-2">
                                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                                <span className="text-primary font-medium text-sm">About Our Company</span>
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-bold text-primary leading-tight">
                                Transforming Ideas Into
                                <span className="bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent">
                                    {" "}
                                    Digital Reality
                                </span>
                            </h2>

                            <div className="w-20 h-1 bg-gradient-to-r from-secondary to-secondary/60 rounded-full" />
                        </div>

                        {/* Description */}
                        <div className="space-y-6">
                            <p className="text-primary/80 text-lg leading-relaxed">
                                Founded with a vision to bridge the gap between innovative technology and practical business solutions,
                                we've been at the forefront of digital transformation for over four years. Our passionate team of
                                experts combines creativity with technical excellence to deliver solutions that drive real results.
                            </p>

                            <p className="text-primary/70 leading-relaxed">
                                We believe that every business deserves access to cutting-edge technology that not only meets their
                                current needs but also prepares them for the future. Our commitment to excellence and innovation has
                                helped hundreds of businesses achieve their digital goals.
                            </p>
                        </div>

                        {/* Mission Statement */}
                        <div className="bg-gradient-to-br from-white to-secondary/5 rounded-2xl p-6 border border-primary/10 shadow-lg">
                            <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                                <Target className="w-5 h-5 text-secondary" />
                                Our Mission
                            </h3>
                            <p className="text-primary/80 leading-relaxed">
                                To empower businesses with innovative technology solutions that drive growth, enhance efficiency, and
                                create meaningful connections between brands and their customers.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div
                    className={`mt-20 transform transition-all duration-1000 delay-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-primary mb-4">Our Core Values</h3>
                        <p className="text-primary/70 max-w-2xl mx-auto">
                            The principles that guide everything we do and shape our company culture
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => {
                            const IconComponent = value.icon
                            return (
                                <div
                                    key={index}
                                    className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-primary/10 hover:border-secondary/30"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/90 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <IconComponent className="w-6 h-6 text-secondary" />
                                    </div>

                                    <h4 className="text-lg font-bold text-primary mb-2">{value.title}</h4>
                                    <p className="text-primary/70 text-sm leading-relaxed">{value.description}</p>

                                    {/* Hover Accent */}
                                    <div className="w-0 h-0.5 bg-secondary rounded-full group-hover:w-full transition-all duration-500 mt-4" />
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Bottom Decorative Line */}
                <div className="mt-16 flex justify-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-0.5 bg-secondary/60 rounded-full" />
                        <div className="w-2 h-2 bg-secondary rounded-full" />
                        <div className="w-16 h-0.5 bg-secondary/60 rounded-full" />
                        <div className="w-2 h-2 bg-primary/60 rounded-full" />
                        <div className="w-8 h-0.5 bg-primary/60 rounded-full" />
                    </div>
                </div>
            </div>
        </section>
    )
}
