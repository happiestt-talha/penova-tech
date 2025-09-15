import React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: {
    default: "Pen-Tech Solutions | Leading IT Solutions & Web Development Agency",
    template: "%s | Pen-Tech Solutions",
  },
  description:
    "Transform your business with Pen-Tech Solutions' innovative technology services. We specialize in web development, mobile apps, cloud solutions, cybersecurity, and digital transformation.",
  keywords: [
    "web development",
    "mobile app development",
    "cloud solutions",
    "cybersecurity",
    "digital transformation",
    "IT consulting",
    "software development",
    "tech solutions",
    "technology agency",
  ],
  authors: [{ name: "Pen-Tech Solutions" }],
  creator: "Pen-Tech Solutions",
  publisher: "Pen-Tech Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://penovatechsolution.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en",
    url: "https://penovatechsolution.com",
    title: "Pen-Tech Solutions | Leading IT Solutions & Web Development Agency",
    description:
      "Transform your business with innovative technology solutions. Expert web development, mobile apps, cloud services, and cybersecurity.",
    siteName: "Pen-Tech Solutions",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pen-Tech Solutions - Technology Innovation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pen-Tech Solutions | Leading IT Solutions & Web Development Agency",
    description:
      "Transform your business with innovative technology solutions. Expert web development, mobile apps, cloud services, and cybersecurity.",
    images: ["/twitter-image.jpg"],
    creator: "@penovatechsolutions",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#303C6A" />
        <meta name="msapplication-TileColor" content="#303C6A" />

        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Additional SEO meta tags */}
        <meta name="geo.region" content="PK-PAK" />
        <meta name="geo.placename" content="Lahore" />
        <meta name="geo.position" content="31.468849074237568;74.26208157560949" />
        <meta name="ICBM" content="31.468849074237568, 74.26208157560949" />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Pen-Tech Solutions",
              description:
                "Leading IT solutions and web development agency specializing in innovative technology services.",
              url: "https://penovatechsolution.com",
              logo: "https://penovatechsolution.com/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+92-321-8815888",
                contactType: "customer service",
                email: "info@penovatechsolution.com",
                availableLanguage: "English",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Johar Town, Lahore, Pakistan",
                addressLocality: "Lahore",
                addressRegion: "Punjab",
                postalCode: "54000",
                addressCountry: "PK",
              },
              sameAs: [
                "https://www.facebook.com/penovatechsolutions",
                "https://www.twitter.com/penovatechsolutions",
                "https://www.linkedin.com/company/penovatechsolutions",
                "https://www.instagram.com/penovatechsolutions",
              ],
              foundingDate: "2020",
              numberOfEmployees: "25-50",
              industry: "Information Technology",
              services: [
                "Web Development",
                "Mobile App Development",
                "Cloud Solutions",
                "Cybersecurity",
                "Data Analytics",
                "Technical Support",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FEFFEA] text-[#303C6A] overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#FCC600] text-[#303C6A] px-4 py-2 rounded-lg font-medium z-50 transition-all duration-300"
        >
          Skip to main content
        </a>

        {/* Navigation */}

        {/* Main Content */}
        <main id="main-content" className="min-h-screen">
          {children}
        </main>

        {/* Global Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Smooth scrolling polyfill for older browsers
              if (!('scrollBehavior' in document.documentElement.style)) {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
                document.head.appendChild(script);
              }
              
              // Performance monitoring
              if ('performance' in window && 'measure' in window.performance) {
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                      console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
                    }
                  }, 0);
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
