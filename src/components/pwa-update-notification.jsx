"use client"

import { useState, useEffect } from "react"
import { RefreshCw, X } from "lucide-react"

export default function PWAUpdateNotification() {
    const [showUpdate, setShowUpdate] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.addEventListener("controllerchange", () => {
                setShowUpdate(true)
            })

            // Check for updates periodically
            const checkForUpdates = async () => {
                try {
                    const registration = await navigator.serviceWorker.getRegistration()
                    if (registration) {
                        registration.addEventListener("updatefound", () => {
                            const newWorker = registration.installing
                            if (newWorker) {
                                newWorker.addEventListener("statechange", () => {
                                    if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                                        setShowUpdate(true)
                                    }
                                })
                            }
                        })
                    }
                } catch (error) {
                    console.error("Error checking for updates:", error)
                }
            }

            checkForUpdates()

            // Check for updates every 30 minutes
            const interval = setInterval(checkForUpdates, 30 * 60 * 1000)

            return () => clearInterval(interval)
        }
    }, [])

    const handleUpdate = async () => {
        setIsUpdating(true)

        try {
            const registration = await navigator.serviceWorker.getRegistration()
            if (registration && registration.waiting) {
                registration.waiting.postMessage({ type: "SKIP_WAITING" })
                window.location.reload()
            }
        } catch (error) {
            console.error("Error updating app:", error)
            setIsUpdating(false)
        }
    }

    const handleDismiss = () => {
        setShowUpdate(false)
    }

    if (!showUpdate) {
        return null
    }

    return (
        <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
            <div className="bg-[#FCC600]/95 backdrop-blur-sm border border-[#303C6A]/20 rounded-2xl shadow-xl p-4">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#303C6A] rounded-xl flex items-center justify-center flex-shrink-0">
                        <RefreshCw className="w-5 h-5 text-[#FCC600]" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#303C6A] text-sm mb-1">Update Available</h3>
                        <p className="text-[#303C6A]/80 text-xs leading-relaxed mb-3">
                            A new version of Pen-Tech Solutions is available with improvements and bug fixes.
                        </p>

                        <div className="flex gap-2">
                            <button
                                onClick={handleUpdate}
                                disabled={isUpdating}
                                className="flex items-center gap-2 px-3 py-2 bg-[#303C6A] hover:bg-[#303C6A]/90 text-white text-xs font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
                            >
                                <RefreshCw className={`w-3 h-3 ${isUpdating ? "animate-spin" : ""}`} />
                                {isUpdating ? "Updating..." : "Update Now"}
                            </button>

                            <button
                                onClick={handleDismiss}
                                className="px-3 py-2 text-[#303C6A]/70 hover:text-[#303C6A] text-xs font-medium rounded-lg transition-colors duration-200"
                            >
                                Later
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleDismiss}
                        className="w-6 h-6 flex items-center justify-center text-[#303C6A]/50 hover:text-[#303C6A] transition-colors duration-200 flex-shrink-0"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
