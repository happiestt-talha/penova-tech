/**
 * PWA Utility Functions
 * Provides helper functions for Progressive Web App functionality
 */

export class PWAManager {
    deferredPrompt = null
    isInstalled = false
  
    constructor() {
      if (typeof window !== "undefined") {
        this.init()
      }
    }
  
    init() {
      // Listen for the beforeinstallprompt event
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault()
        this.deferredPrompt = e
        this.showInstallButton()
      })
  
      // Listen for the appinstalled event
      window.addEventListener("appinstalled", () => {
        this.isInstalled = true
        this.hideInstallButton()
        this.trackInstallation()
      })
  
      // Check if app is already installed
      this.checkIfInstalled()
    }
  
    checkIfInstalled() {
      // Check if running in standalone mode (installed PWA)
      if (window.matchMedia("(display-mode: standalone)").matches) {
        this.isInstalled = true
      }
  
      // Check for iOS Safari standalone mode
      if (window.navigator.standalone === true) {
        this.isInstalled = true
      }
    }
  
    async showInstallPrompt() {
      if (!this.deferredPrompt) {
        return false
      }
  
      try {
        await this.deferredPrompt.prompt()
        const { outcome } = await this.deferredPrompt.userChoice
  
        if (outcome === "accepted") {
          this.trackInstallation()
          return true
        }
  
        return false
      } catch (error) {
        console.error("Error showing install prompt:", error)
        return false
      } finally {
        this.deferredPrompt = null
      }
    }
  
    canInstall() {
      return this.deferredPrompt !== null && !this.isInstalled
    }
  
    getIsInstalled() {
      return this.isInstalled
    }
  
    showInstallButton() {
      // Dispatch custom event to show install button
      window.dispatchEvent(new CustomEvent("pwa-install-available"))
    }
  
    hideInstallButton() {
      // Dispatch custom event to hide install button
      window.dispatchEvent(new CustomEvent("pwa-install-completed"))
    }
  
    trackInstallation() {
      // Track PWA installation for analytics
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "pwa_install", {
          event_category: "PWA",
          event_label: "App Installed",
        })
      }
    }
  
    async checkForUpdates() {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.getRegistration()
          if (registration) {
            await registration.update()
            return true
          }
        } catch (error) {
          console.error("Error checking for updates:", error)
        }
      }
      return false
    }
  
    getInstallationInstructions() {
      const userAgent = navigator.userAgent.toLowerCase()
  
      if (userAgent.includes("chrome") && !userAgent.includes("edg")) {
        return "Click the install button in the address bar or use the menu → Install Pen-Tech Solutions"
      } else if (userAgent.includes("firefox")) {
        return "Click the install icon in the address bar or use the menu → Install this site as an app"
      } else if (userAgent.includes("safari")) {
        return 'Tap the Share button and select "Add to Home Screen"'
      } else if (userAgent.includes("edg")) {
        return "Click the install button in the address bar or use the menu → Apps → Install this site as an app"
      } else {
        return 'Look for an install or "Add to Home Screen" option in your browser menu'
      }
    }
  }
  
  // Singleton instance
  export const pwaManager = new PWAManager()
  
  // Utility functions
  export const isPWAInstalled = () => {
    return pwaManager.getIsInstalled()
  }
  
  export const canInstallPWA = () => {
    return pwaManager.canInstall()
  }
  
  export const installPWA = async () => {
    return await pwaManager.showInstallPrompt()
  }
  
  export const checkPWAUpdates = async () => {
    return await pwaManager.checkForUpdates()
  }
  