import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

const projects = [
  { name: "pump4dads", symbol: "Coindads", type: "Fairlaunch project", icon: "👨", softcap: "2K", hardcap: "-" },
  { name: "YoloPepe", symbol: "YLP", type: "Fairlaunch project", icon: "🐸", softcap: "15K", hardcap: "-" },
  { name: "INFINIT", symbol: "INFINIT", type: "Fairlaunch project", icon: "∞", softcap: "TBA", hardcap: "-" },
  { name: "Evergain", symbol: "EVEG", type: "Ends in: 5 days", icon: "💰", softcap: "250", hardcap: "10K" },
]

export function PreLaunch() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Pre-Launch</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
            All projects
          </Button>
          <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
            Pinksale
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-[#1a1d28] border border-white/10 rounded-xl p-4 hover:border-emerald-500/30 transition-colors"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-2xl">
                {project.icon}
              </div>

              <div className="flex-1">
                <h3 className="text-white font-semibold">{project.name}</h3>
                <p className="text-sm text-gray-300">{project.symbol}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-gray-300 flex items-center gap-2">
                {project.type.includes("Ends") ? <Clock className="w-3 h-3" /> : null}
                {project.type}
              </div>

              <div className="flex items-center justify-between text-sm pt-2 border-t border-white/10">
                <div>
                  <div className="text-gray-300">SOFTCAP</div>
                  <div className="text-white font-semibold">{project.softcap}</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-300">HARDCAP</div>
                  <div className="text-white font-semibold">{project.hardcap}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button variant="link" className="text-emerald-400 hover:text-emerald-300 w-full">
        View More →
      </Button>
    </div>
  )
}
