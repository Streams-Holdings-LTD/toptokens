"use client"

import { Star, TrendingUp, TrendingDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useState } from "react"

const filters = ["TODAY BEST", "AUDIT", "KYC", "PRESALE", "FAIRLAUNCH"]
const chains = ["ALL CHAINS", "🔥 HOT"]

const coins = [
  {
    rank: 1,
    name: "Mobtel",
    symbol: "MOB",
    price: "$0.00079256",
    audit: null,
    change: 0.34,
    marketCap: "$78.57K",
    launchDate: "6 months ago",
    votes: 238,
    chain: "BSC",
  },
  {
    rank: 2,
    name: "SALTY KING",
    symbol: "SALTY",
    price: "$0.00157111",
    audit: "84.5",
    change: -33.95,
    marketCap: "$12.51K",
    launchDate: "2 months ago",
    votes: 81,
    chain: "ETH",
  },
  {
    rank: 3,
    name: "LATRUMP",
    symbol: "LATRUMP",
    price: "$0.00000893",
    audit: null,
    change: 8.12,
    marketCap: "$8.93K",
    launchDate: "3 months ago",
    votes: 156,
    chain: "SOL",
  },
]

export function TodayBest() {
  const [activeFilter, setActiveFilter] = useState("TODAY BEST")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (symbol: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(symbol)) {
      newFavorites.delete(symbol)
    } else {
      newFavorites.add(symbol)
    }
    setFavorites(newFavorites)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Today's Best Coins</h2>
        <Button variant="link" className="text-emerald-400 hover:text-emerald-300 gap-1">
          View All
          <ChevronUp className="w-4 h-4 rotate-90" />
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={filter === activeFilter ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(filter)}
            className={
              filter === activeFilter
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-[#1a1d28] border-white/10 text-white hover:bg-white/5"
            }
          >
            {filter}
          </Button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          {chains.map((chain, i) => (
            <Button
              key={i}
              variant="outline"
              size="sm"
              className="bg-[#1a1d28] border-white/10 text-white hover:bg-white/5"
            >
              {chain}
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-[#12141a] border border-white/5 rounded-xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-[50px,auto,1fr,110px,110px,140px,110px,140px,100px] gap-4 px-6 py-3 bg-[#0f1015] border-b border-white/5 text-xs font-semibold text-white/90 uppercase">
          <div>#</div>
          <div></div>
          <div>Coin</div>
          <div>Price</div>
          <div>Audit</div>
          <div>24h Change</div>
          <div>Market Cap</div>
          <div>Launch</div>
          <div className="text-center">Votes</div>
        </div>

        {coins.map((coin) => (
          <div
            key={coin.rank}
            className="grid grid-cols-[50px,auto,1fr,110px,110px,140px,110px,140px,100px] gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/5 transition-all items-center last:border-b-0 group"
          >
            <div className="text-gray-300 font-semibold">{coin.rank}</div>

            <button
              onClick={() => toggleFavorite(coin.symbol)}
              className={cn(
                "transition-colors",
                favorites.has(coin.symbol) ? "text-yellow-400" : "text-gray-300 hover:text-yellow-400",
              )}
            >
              <Star className={cn("w-5 h-5", favorites.has(coin.symbol) && "fill-yellow-400")} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">{coin.name}</span>
                  <Badge className="bg-blue-500/20 text-blue-400 text-[10px] px-1.5 py-0">{coin.chain}</Badge>
                </div>
                <span className="text-sm text-gray-300">{coin.symbol}</span>
              </div>
            </div>

            <div className="text-white font-mono text-sm">{coin.price}</div>

            <div>
              {coin.audit ? (
                <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                  {coin.audit} <span className="ml-1">🔥</span>
                </Badge>
              ) : (
                <span className="text-gray-300 text-sm">-</span>
              )}
            </div>

            <div
              className={cn(
                "flex items-center gap-1.5 font-medium",
                coin.change > 0 ? "text-emerald-400" : "text-red-400",
              )}
            >
              {coin.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {coin.change > 0 ? "+" : ""}
              {coin.change}%
            </div>

            <div className="text-white font-medium">{coin.marketCap}</div>

            <div className="text-gray-300 text-sm">{coin.launchDate}</div>

            <div className="flex flex-col items-center gap-1">
              <Button
                size="sm"
                className="w-full bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30 h-8"
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                Vote
              </Button>
              <span className="text-white font-semibold text-sm">{coin.votes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
