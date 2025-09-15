"use client"

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../../components/ui/resizable-navbar"
import { useState } from "react"

export default function NavbarTop() {
  console.clear()
  const navItems = [
    {
      name: "Home",
      link: "#home",
    },
    {
      name: "About",
      link: "#about-us",
    },
    {
      name: "Services",
      link: "#services",
      sublinks: [
        {
          name: "Web Development",
          link: "#web-development",
          description: "Custom websites & web applications",
        },
        {
          name: "Mobile App Development",
          link: "#mobile-app-development",
          description: "iOS & Android app development",
        },
        {
          name: "UI/UX Design",
          link: "#ui-ux-design",
          description: "User experience & interface design",
        },
      ],
    },
    {
      name: "Our team",
      link: "#our-team",
    },
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedService, setExpandedService] = useState(null)

  return (
    <div className="relative w-full" style={{ backgroundColor: "#FEFFEA" }}>
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems className="text-lg" items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton href="#contact" variant="cta">Get a quote</NavbarButton>
          </div>
        </NavBody>
        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <div key={`mobile-item-${idx}`} className="w-full">
                {/* Main Navigation Item */}
                <div className="flex items-center justify-between w-full">
                  <a
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative text-lg hover:opacity-80 transition-opacity duration-200 flex-1 py-2"
                    style={{ color: "#303C6A" }}
                  >
                    <span className="block font-medium">{item.name}</span>
                  </a>

                  {/* Expand/Collapse Button for Services */}
                  {item.sublinks && (
                    <button
                      onClick={() => setExpandedService(expandedService === idx ? null : idx)}
                      className="p-2 rounded-lg transition-all duration-200 ml-2"
                      style={{
                        backgroundColor: expandedService === idx ? "rgba(252, 198, 0, 0.1)" : "transparent",
                      }}
                    >
                      <svg
                        className="w-5 h-5 transition-transform duration-200"
                        style={{
                          transform: expandedService === idx ? "rotate(180deg)" : "rotate(0deg)",
                          color: expandedService === idx ? "#FCC600" : "#303C6A",
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Enhanced Sublinks for Mobile */}
                {item.sublinks && expandedService === idx && (
                  <div
                    className="mt-3 rounded-xl border overflow-hidden"
                    style={{
                      backgroundColor: "#FEFFEA",
                      borderColor: "rgba(48, 60, 106, 0.1)",
                      boxShadow: "0 4px 6px -1px rgba(48, 60, 106, 0.1), 0 2px 4px -1px rgba(48, 60, 106, 0.06)",
                    }}
                  >
                    {/* Mobile Dropdown Header */}
                    <div
                      className="px-4 py-3 border-b"
                      style={{
                        backgroundColor: "rgba(48, 60, 106, 0.02)",
                        borderBottomColor: "rgba(48, 60, 106, 0.1)",
                      }}
                    >
                      <div
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "#303C6A", opacity: 0.7 }}
                      >
                        Our Services
                      </div>
                    </div>

                    {/* Mobile Service Items */}
                    <div className="py-2">
                      {item.sublinks.map((sublink, subIdx) => (
                        <a
                          key={`mobile-sublink-${subIdx}`}
                          href={sublink.link}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center px-4 py-4 transition-all duration-200 active:scale-95"
                          style={{ color: "#303C6A" }}
                          onTouchStart={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(252, 198, 0, 0.1)"
                          }}
                          onTouchEnd={(e) => {
                            setTimeout(() => {
                              e.currentTarget.style.backgroundColor = "transparent"
                            }, 150)
                          }}
                        >
                          {/* Service Icon */}
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0"
                            style={{ backgroundColor: "rgba(48, 60, 106, 0.1)" }}
                          >
                            {subIdx === 0 && (
                              <svg
                                className="w-5 h-5"
                                style={{ color: "#303C6A" }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                />
                              </svg>
                            )}
                            {subIdx === 1 && (
                              <svg
                                className="w-5 h-5"
                                style={{ color: "#303C6A" }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                              </svg>
                            )}
                            {subIdx === 2 && (
                              <svg
                                className="w-5 h-5"
                                style={{ color: "#303C6A" }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                                />
                              </svg>
                            )}
                          </div>

                          {/* Service Content */}
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-base" style={{ color: "#303C6A" }}>
                              {sublink.name}
                            </div>
                            <div className="text-sm mt-1 leading-relaxed" style={{ color: "#303C6A", opacity: 0.7 }}>
                              {sublink.description}
                            </div>
                          </div>

                          {/* Arrow Indicator */}
                          <div className="ml-3 flex-shrink-0">
                            <svg
                              className="w-5 h-5"
                              style={{ color: "#FCC600", opacity: 0.6 }}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </a>
                      ))}
                    </div>

                    {/* Mobile Dropdown Footer */}
                    <div
                      className="px-4 py-3 border-t"
                      style={{
                        backgroundColor: "rgba(48, 60, 106, 0.02)",
                        borderTopColor: "rgba(48, 60, 106, 0.1)",
                      }}
                    >
                      <a
                        href="#services"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-sm font-medium flex items-center justify-center py-2 px-4 rounded-lg transition-all duration-200 active:scale-95"
                        style={{
                          color: "#303C6A",
                          backgroundColor: "rgba(252, 198, 0, 0.1)",
                          border: "1px solid rgba(252, 198, 0, 0.2)",
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(252, 198, 0, 0.2)"
                        }}
                        onTouchEnd={(e) => {
                          setTimeout(() => {
                            e.currentTarget.style.backgroundColor = "rgba(252, 198, 0, 0.1)"
                          }, 150)
                        }}
                      >
                        View all services
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex w-full flex-col gap-4 mt-4">
              <NavbarButton href="#contact" onClick={() => setIsMobileMenuOpen(false)} variant="secondary" className="w-full">
                Get a quote
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  )
}
