import { Star } from "lucide-react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { TrendingBar } from "@/components/trending-bar"

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-[#0a0b0f] text-foreground">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-16">
          <TrendingBar />
          <div className="max-w-7xl mx-auto p-6">
            <div className="mb-6 flex items-center gap-3">
              <Star className="w-6 h-6 text-emerald-500" />
              <h1 className="text-2xl font-bold text-white">Favorites</h1>
            </div>

            <div className="rounded-lg border border-white/10 bg-[#12141a] p-12 text-center">
              <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">No favorites yet</h2>
              <p className="text-muted-foreground">
                Start adding coins to your favorites by clicking the star icon on any coin.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
