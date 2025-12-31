"use client"

import { useState, useEffect } from "react"
import { Settings, Bell, Moon, Sun, Globe, Shield } from "lucide-react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { TrendingBar } from "@/components/trending-bar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [priceAlerts, setPriceAlerts] = useState(false)
  const [twoFactor, setTwoFactor] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-foreground">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-16">
          <TrendingBar />
          <div className="max-w-7xl mx-auto p-6">
            <div className="mb-6 flex items-center gap-3">
              <Settings className="w-6 h-6 text-emerald-500" />
              <h1 className="text-2xl font-bold text-white">Settings</h1>
            </div>

            <div className="space-y-6 max-w-2xl">
              {/* Notifications */}
              <div className="rounded-lg border border-white/10 bg-[#12141a] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-lg font-semibold text-white">Notifications</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications" className="text-white font-medium">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">Receive updates about new launches</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="price-alerts" className="text-white font-medium">
                        Price Alerts
                      </Label>
                      <p className="text-sm text-muted-foreground">Get notified when prices change significantly</p>
                    </div>
                    <Switch id="price-alerts" checked={priceAlerts} onCheckedChange={setPriceAlerts} />
                  </div>
                </div>
              </div>

              {/* Appearance */}
              <div className="rounded-lg border border-white/10 bg-[#12141a] p-6">
                <div className="flex items-center gap-2 mb-4">
                  {darkMode ? (
                    <Moon className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Sun className="w-5 h-5 text-emerald-500" />
                  )}
                  <h2 className="text-lg font-semibold text-white">Appearance</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dark-mode" className="text-white font-medium">
                        Dark Mode
                      </Label>
                      <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                    </div>
                    <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="rounded-lg border border-white/10 bg-[#12141a] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-lg font-semibold text-white">Security</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor" className="text-white font-medium">
                        Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Switch id="two-factor" checked={twoFactor} onCheckedChange={setTwoFactor} />
                  </div>
                </div>
              </div>

              {/* Language */}
              <div className="rounded-lg border border-white/10 bg-[#12141a] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-lg font-semibold text-white">Language & Region</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Language</p>
                      <p className="text-sm text-muted-foreground">Select your preferred language</p>
                    </div>
                    <select className="bg-[#1a1d28] border border-white/10 rounded-lg px-3 py-2 text-white text-sm">
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
