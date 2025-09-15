export function generatePageMetadata({
    title,
    description,
    keywords = [],
    canonical,
    ogImage = "/og-image.jpg",
}) {
    const baseKeywords = [
        "web development",
        "mobile app development",
        "cloud solutions",
        "cybersecurity",
        "digital transformation",
        "IT consulting",
        "Pen-Tech Solutions",
    ]

    return {
        title,
        description,
        keywords: [...baseKeywords, ...keywords],
        alternates: {
            canonical: canonical || undefined,
        },
        openGraph: {
            title,
            description,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            title,
            description,
            images: [ogImage],
        },
    }
}

// Predefined metadata for common pages
export const pageMetadata = {
    home: {
        title: "Pen-Tech Solutions | Leading IT Solutions & Web Development Agency",
        description:
            "Transform your business with innovative technology solutions. Expert web development, mobile apps, cloud services, and cybersecurity in San Francisco.",
        keywords: ["San Francisco web development", "IT solutions", "technology agency"],
    },
    about: {
        title: "About Us - Our Story & Mission",
        description:
            "Learn about Pen-Tech Solutions' journey, our expert team, and our commitment to delivering innovative technology solutions that drive business growth.",
        keywords: ["about us", "company story", "tech team", "mission"],
    },
    services: {
        title: "Our Services - Comprehensive IT Solutions",
        description:
            "Discover our full range of technology services including web development, mobile apps, cloud solutions, cybersecurity, data analytics, and technical support.",
        keywords: ["IT services", "technology solutions", "web development services"],
    },
    portfolio: {
        title: "Portfolio - Our Work & Case Studies",
        description:
            "Explore our portfolio of successful projects and case studies showcasing innovative web applications, mobile apps, and digital transformation solutions.",
        keywords: ["portfolio", "case studies", "web projects", "mobile apps"],
    },
    stats: {
        title: "Statistics - Our Achievements",
        description:
            "Discover our achievements and success stories in web development, mobile apps, cloud solutions, cybersecurity, and digital transformation.",
        keywords: ["statistics", "achievements", "success stories", "web development", "mobile apps", "cloud solutions", "cybersecurity", "digital transformation"],
    },
    contact: {
        title: "Contact Us - Get In Touch",
        description:
            "Ready to start your next project? Contact Pen-Tech Solutions today for a free consultation. Located in San Francisco, serving clients worldwide.",
        keywords: ["contact", "consultation", "San Francisco", "get quote"],
    },
    team: {
        title: "Team - Meet Our Experts",
        description:
            "Meet our talented team of experts in web development, mobile apps, cloud solutions, cybersecurity, and digital transformation.",
        keywords: ["team", "experts", "web development", "mobile apps", "cloud solutions", "cybersecurity", "digital transformation"],
    }
}
