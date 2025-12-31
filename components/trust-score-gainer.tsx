import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

const gainers = [
  { name: "Nario", score: 81.11, change: 11.4, icon: "🎮" },
  { name: "stonks", score: 83.86, change: 9.38, icon: "📈" },
  { name: "Justcoin", score: 96.16, change: 9.25, icon: "⚖️" },
]

export function TrustScoreGainer() {
  return (
    <div className="bg-[#1a1d28] border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4">Trust Score Gainer</h3>

      <div className="space-y-3">
        {gainers.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-xl">
                {item.icon}
              </div>
              <div>
                <div className="text-white font-medium">{item.name}</div>
                <Badge className="bg-emerald-500/20 text-emerald-400 text-xs mt-1">{item.score}</Badge>
              </div>
            </div>

            <div className="text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />+{item.change}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
