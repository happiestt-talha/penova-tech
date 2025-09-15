"use client"

import { useState, useEffect } from "react"
import { Download, X, Smartphone } from "lucide-react"
import { pwaManager } from "../lib/pwa-utils"

export default function PWAInstallButton() {
    const [showInstallPrompt, setShowInstallPrompt] = useState(false)
    const [isInstalling, setIsInstalling] = useState(false)
    const [installInstructions, setInstallInstructions] = useState("")

    useEffect(() => {
        const handleInstallAvailable = () => {
            setShowInstallPrompt(true)
        }

        const handleInstallCompleted = () => {
            setShowInstallPrompt(false)
        }

        // Load installation instructions
        pwaManager.getInstallationInstructions().then(setInstallInstructions)

        window.addEventListener("pwa-install-available", handleInstallAvailable)
        window.addEventListener("pwa-install-completed", handleInstallCompleted)

        return () => {
            window.removeEventListener("pwa-install-available", handleInstallAvailable)
            window.removeEventListener("pwa-install-completed", handleInstallCompleted)
        }
    }, [])

    const handleInstall = async () => {
        setIsInstalling(true)
        try {
            const success = await pwaManager.showInstallPrompt()
            if (success) {
                setShowInstallPrompt(false)
            }
        } catch (error) {
            console.error("Installation failed:", error)
        } finally {
            setIsInstalling(false)
        }
    }

    const handleDismiss = () => {
        setShowInstallPrompt(false)
        // Remember user dismissed the prompt
        localStorage.setItem("pwa-install-dismissed", Date.now().toString())
    }

    // Don't show if user recently dismissed
    useEffect(() => {
        const dismissed = localStorage.getItem("pwa-install-dismissed")
        if (dismissed) {
            const dismissedTime = Number.parseInt(dismissed)
            const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24)
            if (daysSinceDismissed < 7) {
                setShowInstallPrompt(false)
            }
        }
    }, [])

    if (!showInstallPrompt) {
        return null
    }

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
            <div className="bg-white/95 backdrop-blur-sm border border-[#303C6A]/20 rounded-2xl shadow-xl p-4">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#303C6A] to-[#303C6A]/80 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Smartphone className="w-5 h-5 text-[#FCC600]" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#303C6A] text-sm mb-1">Install Pen-Tech Solutions</h3>
                        <p className="text-[#303C6A]/70 text-xs leading-relaxed mb-3">
                            Get quick access to our services and work offline. Install our app for the best experience.
                        </p>

                        <div className="flex gap-2">
                            <button
                                onClick={handleInstall}
                                disabled={isInstalling}
                                className="flex items-center gap-2 px-3 py-2 bg-[#303C6A] hover:bg-[#303C6A]/90 text-white text-xs font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
                            >
                                <Download className="w-3 h-3" />
                                {isInstalling ? "Installing..." : "Install"}
                            </button>

                            <button
                                onClick={handleDismiss}
                                className="px-3 py-2 text-[#303C6A]/70 hover:text-[#303C6A] text-xs font-medium rounded-lg transition-colors duration-200"
                            >
                                Not now
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

                {installInstructions && (
                    <div className="mt-3 pt-3 border-t border-[#303C6A]/10">
                        <p className="text-[#303C6A]/60 text-xs">
                            <strong>Manual install:</strong> {installInstructions}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
