"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Star, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

const coins = [
  {
    name: "USELESS COIN",
    symbol: "USELESS",
    price: "$0.12187",
    audit: "85.08",
    change: 6.57,
    marketCap: "$121.49M",
    launchDate: "7 months ago",
    votes: 3653,
  },
  {
    name: "TOKERO",
    symbol: "TOKERO",
    price: "$0.00004087",
    audit: "82.92",
    change: -24.94,
    marketCap: "$4.01M",
    launchDate: "7 months ago",
    votes: 1718,
  },
  {
    name: "ACE",
    symbol: "ACE",
    price: "$0.15492",
    audit: "76.13",
    change: 12.34,
    marketCap: "$89.23M",
    launchDate: "5 months ago",
    votes: 2341,
  },
  {
    name: "Wojak",
    symbol: "WOJAK",
    price: "$0.033975",
    audit: "88.45",
    change: 68.5,
    marketCap: "$33.97M",
    launchDate: "23 days ago",
    votes: 982,
  },
]

export function PromotedCoins() {
  const [bookNowOpen, setBookNowOpen] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({
    coinName: "",
    symbol: "",
    website: "",
    telegram: "",
    email: "",
    duration: "7",
    description: "",
  })

  const toggleFavorite = (symbol: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(symbol)) {
      newFavorites.delete(symbol)
    } else {
      newFavorites.add(symbol)
    }
    setFavorites(newFavorites)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Promotion booking submitted for ${formData.coinName}! We'll contact you at ${formData.email}`)
    setBookNowOpen(false)
    setFormData({
      coinName: "",
      symbol: "",
      website: "",
      telegram: "",
      email: "",
      duration: "7",
      description: "",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <h2 className="text-xl font-bold text-white">Promoted Coins</h2>
          </div>
          <p className="text-sm text-gray-300 mt-1">
            Even though promoted, trying to choose quality projects only.
          </p>
        </div>
        <Link href="/promoted">
          <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
            View All →
          </Button>
        </Link>
      </div>

      <div className="border border-amber-500/30 bg-[#1a1510] rounded-xl overflow-hidden">
        <div className="grid grid-cols-[auto,1fr,120px,120px,150px,120px,150px,100px] gap-4 px-6 py-3 border-b border-white/10 text-sm text-white/90 font-semibold">
          <div></div>
          <div>Coin</div>
          <div>Price</div>
          <div>Audit / KYC</div>
          <div>Change 24h</div>
          <div>Market Cap</div>
          <div>Launch date</div>
          <div>Votes</div>
        </div>

        {coins.map((coin, index) => (
          <div
            key={index}
            className="grid grid-cols-[auto,1fr,120px,120px,150px,120px,150px,100px] gap-4 px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-colors items-center"
          >
            <button
              onClick={() => toggleFavorite(coin.symbol)}
              className={cn(
                "transition-colors",
                favorites.has(coin.symbol) ? "text-yellow-500" : "text-gray-300 hover:text-yellow-500",
              )}
            >
              <Star className={cn("w-5 h-5", favorites.has(coin.symbol) && "fill-yellow-500")} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">{coin.name}</span>
                  <Badge className="bg-blue-500/20 text-blue-400 text-xs">✓</Badge>
                  <Badge className="bg-orange-500/20 text-orange-400 text-xs">🔥</Badge>
                </div>
                <span className="text-sm text-gray-300">{coin.symbol}</span>
              </div>
            </div>

            <div className="text-white font-mono">{coin.price}</div>

            <Badge className="bg-emerald-500/20 text-emerald-400 w-fit">{coin.audit} 🔥 AUDIT</Badge>

            <div className={cn("flex items-center gap-1", coin.change > 0 ? "text-emerald-400" : "text-red-400")}>
              {coin.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(coin.change)}%
            </div>

            <div className="text-white">{coin.marketCap}</div>

            <div className="text-gray-300">{coin.launchDate}</div>

            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-white font-semibold">{coin.votes}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button
          onClick={() => setBookNowOpen(true)}
          className="bg-white/5 border border-white/10 text-white hover:bg-white/10"
        >
          Your coin here? <span className="text-emerald-400 ml-1">Book now →</span>
        </Button>
      </div>

      {/* Book Promotion Dialog */}
      <Dialog open={bookNowOpen} onOpenChange={setBookNowOpen}>
        <DialogContent className="bg-[#12141a] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Book a Promotion Spot</DialogTitle>
            <DialogDescription className="text-gray-300">
              Get your coin featured in our promoted section
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="coinName">Coin Name</Label>
                <Input
                  id="coinName"
                  placeholder="e.g. My Coin"
                  value={formData.coinName}
                  onChange={(e) => setFormData({ ...formData, coinName: e.target.value })}
                  className="bg-[#1a1d28] border-white/10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="symbol">Symbol</Label>
                <Input
                  id="symbol"
                  placeholder="e.g. MYC"
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                  className="bg-[#1a1d28] border-white/10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                placeholder="https://..."
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="bg-[#1a1d28] border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telegram">Telegram</Label>
              <Input
                id="telegram"
                placeholder="@yourgroup"
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                className="bg-[#1a1d28] border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="promoEmail">Contact Email</Label>
              <Input
                id="promoEmail"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-[#1a1d28] border-white/10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Promotion Duration</Label>
              <select
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full bg-[#1a1d28] border border-white/10 rounded-md px-3 py-2 text-sm"
              >
                <option value="1">1 Day - $99</option>
                <option value="3">3 Days - $249</option>
                <option value="7">7 Days - $499</option>
                <option value="14">14 Days - $899</option>
                <option value="30">30 Days - $1,499</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="promoDescription">Additional Information</Label>
              <Textarea
                id="promoDescription"
                placeholder="Tell us about your project..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-[#1a1d28] border-white/10 min-h-[80px]"
              />
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
              Submit Booking Request
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
