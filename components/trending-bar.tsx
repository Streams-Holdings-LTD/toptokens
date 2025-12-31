import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Flame } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const trendingCoins = [
  { rank: 1, name: "FARTGOAT", symbol: "FART", change: 171.65, isUp: true },
  { rank: 2, name: "ORCIB", symbol: "ORC", change: -0.77, isUp: false },
  { rank: 3, name: "NBA TROLLBOY", symbol: "NBA", change: 4.26, isUp: true },
  { rank: 4, name: "PEPE 2.0", symbol: "PEPE2", change: 24.8, isUp: true },
]

export function TrendingBar() {
  return (
    <div className="border-b border-white/5 bg-[#0f1015] px-6 py-3 flex items-center gap-6 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-2 text-sm font-semibold text-white whitespace-nowrap">
        <div className="flex items-center gap-1.5 bg-emerald-600/20 text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/30">
          <Flame className="w-4 h-4" />
          Trending Now
        </div>
      </div>

      {trendingCoins.map((coin) => (
        <div key={coin.rank} className="flex items-center gap-3 text-sm whitespace-nowrap">
          <span className="text-gray-300 font-medium">#{coin.rank}</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full" />
            <span className="text-white font-semibold">{coin.symbol}</span>
          </div>
          <Badge
            variant="secondary"
            className={cn(
              "gap-1 font-medium",
              coin.isUp ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400",
            )}
          >
            {coin.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {coin.isUp ? "+" : ""}
            {coin.change}%
          </Badge>
        </div>
      ))}

      <div className="ml-auto">
        <Badge className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 font-medium px-4 py-1.5">
          🎉 PROMO: Use code TOPTOKEN20 for 20% off!
        </Badge>
      </div>
    </div>
  )
}
