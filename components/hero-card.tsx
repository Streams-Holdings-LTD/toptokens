import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star } from "lucide-react"
import Link from "next/link"

export function HeroCard() {
  return (
    <div className="relative bg-gradient-to-br from-[#1a1d28] via-[#141620] to-[#1a1d28] border border-emerald-500/20 rounded-2xl p-8 overflow-hidden shadow-2xl shadow-emerald-500/10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-full blur-3xl" />

      <div className="relative flex items-start justify-between">
        <div className="flex items-start gap-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/30">
              <span className="text-3xl font-bold text-white">T</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-[#141620]">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-white">TOKERO</h2>
              <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">FEATURED</Badge>
            </div>
            <p className="text-gray-300 text-sm max-w-2xl mb-4">
              TOKERO is a next-generation DeFi protocol launching in 2024. Built on advanced blockchain technology with
              community-driven tokenomics and sustainable reward mechanisms.
            </p>

            <div className="flex items-center gap-3">
              <Link href="https://twitter.com" target="_blank">
                <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Button>
              </Link>
              <Link href="https://telegram.org" target="_blank">
                <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                  </svg>
                </Button>
              </Link>
              <Link href="https://example.com" target="_blank">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10"
                >
                  Website
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-right space-y-4">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 justify-end mb-1">
              <Star className="w-5 h-5 text-emerald-400 fill-emerald-400" />
              <span className="text-sm text-muted-foreground">Total Votes</span>
            </div>
            <div className="text-3xl font-bold text-emerald-400">1,718</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-muted-foreground">Market Cap:</span>
              <span className="text-white font-semibold">$4.01M</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-muted-foreground">Holders:</span>
              <span className="text-white font-semibold">2,431</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-muted-foreground">24h Volume:</span>
              <span className="text-white font-semibold">$892K</span>
            </div>
          </div>

          <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1">
            82.92 🔥 AUDIT
          </Badge>
        </div>
      </div>
    </div>
  )
}