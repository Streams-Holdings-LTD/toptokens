import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

const scores = [
  { name: "AntiBullyCoin", score: 95.36, icon: "🛡️" },
  { name: "Arkivex", score: 94.33, icon: "📦" },
  { name: "FARTLESS COIN", score: 93.85, icon: "💨" },
]

export function TopTrustScore() {
  return (
    <div className="bg-[#1a1d28] border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4">Top Trust Score</h3>

      <div className="space-y-3">
        {scores.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-xl">
                {item.icon}
              </div>
              <span className="text-white font-medium">{item.name}</span>
            </div>

            <Badge className="bg-emerald-500/20 text-emerald-400 gap-1">
              <TrendingUp className="w-3 h-3" />
              {item.score}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
