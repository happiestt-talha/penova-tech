"use client"

import { cn } from "../../lib/utils"
import { IoMenu } from "react-icons/io5"
import { RxCross2 } from "react-icons/rx"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
import React, { useRef, useState } from "react"

export const Navbar = ({ children, className }) => {
    const ref = useRef(null)
    const { scrollY } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })

    const [visible, setVisible] = useState(false)

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 100) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    })

    return (
        <motion.div ref={ref} className={cn("sticky inset-x-0 top-20 z-40 w-full", className)}>
            {React.Children.map(children, (child) =>
                React.isValidElement(child) ? React.cloneElement(child, { visible }) : child,
            )}
        </motion.div>
    )
}

export const NavBody = ({ children, className, visible }) => {
    return (
        <motion.div
            animate={{
                backdropFilter: visible ? "blur(10px)" : "none",
                boxShadow: visible
                    ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
                    : "none",
                width: visible ? "40%" : "100%",
                y: visible ? 20 : 0,
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 50,
            }}
            style={{
                minWidth: "800px",
                backgroundColor: visible ? "rgba(254, 255, 234, 0.9)" : "transparent",
            }}
            className={cn(
                "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex",
                className,
            )}
        >
            {children}
        </motion.div>
    )
}

export const NavItems = ({ items, className }) => {
    const [hovered, setHovered] = useState(null)
    const [dropdownHovered, setDropdownHovered] = useState(null)

    return (
        <motion.div
            onMouseLeave={() => {
                setHovered(null)
                setDropdownHovered(null)
            }}
            className={cn(
                "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium transition duration-200 lg:flex lg:space-x-2",
                className,
            )}
        >
            {items.map((item, idx) => (
                <div
                    key={`nav-item-${idx}`}
                    className="relative"
                    onMouseEnter={() => {
                        setHovered(idx)
                        if (item.sublinks) {
                            setDropdownHovered(idx)
                        }
                    }}
                    onMouseLeave={() => {
                        if (!item.sublinks) {
                            setHovered(null)
                        }
                    }}
                >
                    <a
                        className="relative px-4 py-2 hover:opacity-80 transition-all duration-200 block rounded-lg"
                        style={{ color: "#303C6A" }}
                        href={item.link}
                    >
                        {hovered === idx && (
                            <motion.div
                                layoutId="hovered"
                                className="absolute inset-0 h-full w-full rounded-lg"
                                style={{
                                    background: "linear-gradient(135deg, rgba(252, 198, 0, 0.15) 0%, rgba(252, 198, 0, 0.25) 100%)",
                                    border: "1px solid rgba(252, 198, 0, 0.3)",
                                }}
                            />
                        )}
                        <span className="relative z-20 flex items-center gap-2">
                            {item.name}
                            {item.sublinks && (
                                <svg
                                    className="w-3 h-3 transition-transform duration-200"
                                    style={{
                                        transform: dropdownHovered === idx ? "rotate(180deg)" : "rotate(0deg)",
                                        color: dropdownHovered === idx ? "#FCC600" : "#303C6A",
                                    }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            )}
                        </span>
                    </a>

                    {/* Dropdown Menu */}
                    {item.sublinks && dropdownHovered === idx && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-0 mt-3 py-3 rounded-xl shadow-2xl border z-50 min-w-[240px] overflow-hidden"
                            style={{
                                backgroundColor: "#FEFFEA",
                                borderColor: "rgba(48, 60, 106, 0.1)",
                                borderWidth: "1px",
                                boxShadow:
                                    "0 20px 25px -5px rgba(48, 60, 106, 0.1), 0 10px 10px -5px rgba(48, 60, 106, 0.04), 0 0 0 1px rgba(48, 60, 106, 0.05)",
                            }}
                            onMouseEnter={() => setDropdownHovered(idx)}
                            onMouseLeave={() => {
                                setDropdownHovered(null)
                                setHovered(null)
                            }}
                        >
                            {/* Dropdown Header */}
                            <div
                                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b"
                                style={{
                                    color: "#303C6A",
                                    opacity: 0.7,
                                    borderBottomColor: "rgba(48, 60, 106, 0.1)",
                                }}
                            >
                                Our Services
                            </div>

                            {/* Sublinks */}
                            <div className="py-1">
                                {item.sublinks.map((sublink, subIdx) => (
                                    <a
                                        key={`sublink-${subIdx}`}
                                        href={sublink.link}
                                        className="group flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 relative"
                                        style={{ color: "#303C6A" }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = "rgba(252, 198, 0, 0.1)"
                                            e.currentTarget.style.borderLeftColor = "#FCC600"
                                            e.currentTarget.style.borderLeftWidth = "3px"
                                            e.currentTarget.style.paddingLeft = "13px"
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = "transparent"
                                            e.currentTarget.style.borderLeftColor = "transparent"
                                            e.currentTarget.style.borderLeftWidth = "0px"
                                            e.currentTarget.style.paddingLeft = "16px"
                                        }}
                                    >
                                        {/* Service Icon */}
                                        <div
                                            className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-200"
                                            style={{ backgroundColor: "rgba(48, 60, 106, 0.1)" }}
                                        >
                                            {subIdx === 0 && (
                                                <svg
                                                    className="w-4 h-4"
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
                                                    className="w-4 h-4"
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
                                                    className="w-4 h-4"
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

                                        {/* Service Name and Description */}
                                        <div className="flex-1">
                                            <div className="font-medium" style={{ color: "#303C6A" }}>
                                                {sublink.name}
                                            </div>
                                            <div
                                                className="text-xs mt-0.5 transition-opacity duration-200"
                                                style={{ color: "#303C6A", opacity: 0.6 }}
                                            >
                                                {subIdx === 0 && "Custom websites & web applications"}
                                                {subIdx === 1 && "iOS & Android app development"}
                                                {subIdx === 2 && "User experience & interface design"}
                                            </div>
                                        </div>

                                        {/* Arrow Icon */}
                                        <svg
                                            className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1"
                                            style={{ color: "#FCC600" }}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                ))}
                            </div>

                            {/* Dropdown Footer */}
                            <div
                                className="px-4 py-3 border-t"
                                style={{
                                    backgroundColor: "rgba(48, 60, 106, 0.02)",
                                    borderTopColor: "rgba(48, 60, 106, 0.1)",
                                }}
                            >
                                <a
                                    href="#services"
                                    className="text-xs font-medium hover:opacity-80 transition-opacity duration-200 flex items-center"
                                    style={{ color: "#FCC600" }}
                                >
                                    View all services
                                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    )}
                </div>
            ))}
        </motion.div>
    )
}

export const MobileNav = ({ children, className, visible }) => {
    return (
        <motion.div
            animate={{
                backdropFilter: visible ? "blur(10px)" : "none",
                boxShadow: visible
                    ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
                    : "none",
                width: visible ? "90%" : "100%",
                paddingRight: visible ? "12px" : "0px",
                paddingLeft: visible ? "12px" : "0px",
                borderRadius: visible ? "4px" : "2rem",
                y: visible ? 20 : 0,
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 50,
            }}
            style={{
                backgroundColor: visible ? "rgba(254, 255, 234, 0.9)" : "transparent",
            }}
            className={cn(
                "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
                className,
            )}
        >
            {children}
        </motion.div>
    )
}

export const MobileNavHeader = ({ children, className }) => {
    return <div className={cn("flex w-full flex-row items-center justify-between", className)}>{children}</div>
}

export const MobileNavMenu = ({ children, className, isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                        "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-3 rounded-lg px-4 py-6 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] max-h-[80vh] overflow-y-auto",
                        className,
                    )}
                    style={{ backgroundColor: "#FEFFEA" }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export const MobileNavToggle = ({ isOpen, onClick }) => {
    return isOpen ? (
        <RxCross2
            className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
            style={{ color: "#303C6A" }}
            onClick={onClick}
        />
    ) : (
        <IoMenu
            className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
            style={{ color: "#303C6A" }}
            onClick={onClick}
        />
    )
}

export const NavbarLogo = () => {
    return (
        <a
            href="#"
            className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal hover:opacity-80 transition-opacity duration-200"
        >
            <Image src="/logo.svg" alt="logo" width={30} height={30} />
            <span className="font-medium text-lg" style={{ color: "#303C6A" }}>
                penova tech
            </span>
        </a>
    )
}

export const NavbarButton = ({ href, as: Tag = "a", children, className, variant = "primary", ...props }) => {
    const baseStyles =
        "px-4 py-2 rounded-md text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center"

    const variantStyles = {
        primary: {
            backgroundColor: "#FEFFEA",
            color: "#303C6A",
            boxShadow:
                "0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset",
        },
        secondary: {
            backgroundColor: "transparent",
            color: "#303C6A",
            border: `2px solid #303C6A`,
        },
        dark: {
            backgroundColor: "#303C6A",
            color: "#FEFFEA",
            boxShadow:
                "0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset",
        },
        gradient: {
            background: "linear-gradient(to bottom, #FCC600, #e6b300)",
            color: "#303C6A",
            boxShadow: "0px_2px_0px_0px_rgba(255,255,255,0.3)_inset",
        },
        cta: {
            backgroundColor: "#FCC600",
            color: "#303C6A",
        },
    }

    const currentVariant = variantStyles[variant]

    return (
        <Tag href={href || undefined} className={cn(baseStyles, className)} style={currentVariant} {...props}>
            {children}
        </Tag>
    )
}
