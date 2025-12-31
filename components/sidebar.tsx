"use client"

import { Home, TrendingUp, Star, Sparkles, Trophy, Rocket, FileText, Settings, Search, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: TrendingUp, label: "Trending", href: "/trending" },
  { icon: Star, label: "Favorites", href: "/favorites" },
  { icon: Sparkles, label: "Promoted", href: "/promoted" },
  { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
  { icon: Rocket, label: "Pre-Launch", href: "/pre-launch" },
  { icon: FileText, label: "Audits", href: "/audits" },
  { icon: Search, label: "Token Scan", href: "/token-scan" },
  { icon: Plus, label: "Create Token", href: "/create-token" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside 
      className="w-56 border-r border-white/10 bg-[#0a0b0f] fixed left-0 top-[73px] bottom-0 flex flex-col py-4 gap-2 z-40"
      style={{ width: '224px', minWidth: '224px' }}
    >
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn(
            "mx-2 px-3 py-2.5 rounded-lg flex items-center gap-3 transition-all duration-200",
            pathname === item.href
              ? "bg-emerald-500/20 text-emerald-500"
              : "text-white/80 hover:bg-white/5 hover:text-white",
          )}
        >
          <item.icon className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium whitespace-nowrap" style={{ display: 'inline' }}>
            {item.label}
          </span>
        </Link>
      ))}
    </aside>
  )
}
