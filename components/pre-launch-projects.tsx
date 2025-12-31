import { Clock, Users, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const preLaunchProjects = [
  {
    name: "MoonRocket",
    symbol: "MOON",
    description: "Community-driven meme token with deflationary mechanics",
    launchDate: "2025-01-15",
    followers: 12400,
    hype: 95,
    category: "Meme",
  },
  {
    name: "DefiMax Protocol",
    symbol: "DMAX",
    description: "Next-gen yield farming protocol with AI optimization",
    launchDate: "2025-01-18",
    followers: 8900,
    hype: 88,
    category: "DeFi",
  },
  {
    name: "NFTVerse",
    symbol: "NFTV",
    description: "Metaverse platform for trading and showcasing NFTs",
    launchDate: "2025-01-20",
    followers: 15600,
    hype: 92,
    category: "NFT",
  },
  {
    name: "GreenChain",
    symbol: "GRN",
    description: "Eco-friendly blockchain for carbon credit trading",
    launchDate: "2025-01-22",
    followers: 6700,
    hype: 78,
    category: "Utility",
  },
]

export function PreLaunchProjects() {
  return (
    <div className="rounded-lg border border-white/10 bg-[#12141a] p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Pre-Launch Projects</h2>
        <span className="text-sm text-gray-300">{preLaunchProjects.length} upcoming</span>
      </div>

      <div className="space-y-4">
        {preLaunchProjects.map((project, index) => (
          <div
            key={index}
            className="rounded-lg bg-[#1a1c24] p-4 border border-white/5 hover:border-emerald-500/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-semibold">{project.name}</h3>
                  <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                    {project.symbol}
                  </Badge>
                  <Badge className="text-xs bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30">
                    {project.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-300">{project.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-4 h-4" />
                <span>
                  Launch: {new Date(project.launchDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Users className="w-4 h-4" />
                <span>{project.followers.toLocaleString()} followers</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-500 font-semibold">{project.hype}% hype</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
