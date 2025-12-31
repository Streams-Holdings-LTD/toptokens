import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { TrendingBar } from "@/components/trending-bar"
import { HeroCard } from "@/components/hero-card"
import { PromotedCoins } from "@/components/promoted-coins"
import { LatestAuditUpdates } from "@/components/latest-audit-updates"
import { TopTrustScore } from "@/components/top-trust-score"
import { TrustScoreGainer } from "@/components/trust-score-gainer"
import { Giveaways } from "@/components/giveaways"
import { PreLaunch } from "@/components/pre-launch"
import { TodayBest } from "@/components/today-best"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0d0e12] text-foreground">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-56">
          <TrendingBar />
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
            <HeroCard />
            <PromotedCoins />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-6">
                <LatestAuditUpdates />
                <PreLaunch />
                <TodayBest />
              </div>

              <div className="space-y-6">
                <TopTrustScore />
                <TrustScoreGainer />
                <Giveaways />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
