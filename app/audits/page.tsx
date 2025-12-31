import { FileText } from "lucide-react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { TrendingBar } from "@/components/trending-bar"
import { LatestAuditUpdates } from "@/components/latest-audit-updates"

export default function AuditsPage() {
  return (
    <div className="min-h-screen bg-[#0a0b0f] text-foreground">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-16">
          <TrendingBar />
          <div className="max-w-7xl mx-auto p-6">
            <div className="mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-emerald-500" />
              <h1 className="text-2xl font-bold text-white">Audit Updates</h1>
            </div>

            <div className="space-y-6">
              <LatestAuditUpdates />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
