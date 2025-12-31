"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

const audits = [
  { name: "REX Token", symbol: "REX", price: "$1.0290", status: "PENDING", findings: null, icon: "⚔️" },
  { name: "APG Token", symbol: "APG", price: "$1.417", status: "PENDING", findings: null, icon: "🎯" },
  { name: "Kohenoor", symbol: "KOHN", price: "FAIRLAUNCH", status: "PASSED", findings: 2, icon: "💎" },
]

export function LatestAuditUpdates() {
  const [requestAuditOpen, setRequestAuditOpen] = useState(false)
  const [formData, setFormData] = useState({
    tokenName: "",
    tokenSymbol: "",
    contractAddress: "",
    chain: "ethereum",
    email: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Audit request submitted for ${formData.tokenName} (${formData.tokenSymbol})`)
    setRequestAuditOpen(false)
    setFormData({
      tokenName: "",
      tokenSymbol: "",
      contractAddress: "",
      chain: "ethereum",
      email: "",
      description: "",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Latest Audit Updates</h2>
        <Link href="/audits">
          <Button variant="link" className="text-emerald-400 hover:text-emerald-300">
            View More →
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {audits.map((audit, index) => (
          <div
            key={index}
            className="bg-[#1a1d28] border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform" />

            <div className="relative">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-2xl">
                  {audit.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-white font-semibold">{audit.name}</h3>
                  <p className="text-sm text-muted-foreground">{audit.symbol}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">{audit.price}</div>

                <Badge
                  className={cn(
                    audit.status === "PENDING"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-emerald-500/20 text-emerald-400",
                  )}
                >
                  {audit.status}
                </Badge>

                {audit.findings !== null && (
                  <div className="text-sm text-muted-foreground mt-2">{audit.findings} Findings</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={() => setRequestAuditOpen(true)}
        className="w-full bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30"
      >
        ⚡ Request audit
      </Button>

      {/* Request Audit Dialog */}
      <Dialog open={requestAuditOpen} onOpenChange={setRequestAuditOpen}>
        <DialogContent className="bg-[#12141a] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Request an Audit</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Submit your token for a comprehensive security audit
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tokenName">Token Name</Label>
                <Input
                  id="tokenName"
                  placeholder="e.g. My Token"
                  value={formData.tokenName}
                  onChange={(e) => setFormData({ ...formData, tokenName: e.target.value })}
                  className="bg-[#1a1d28] border-white/10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tokenSymbol">Symbol</Label>
                <Input
                  id="tokenSymbol"
                  placeholder="e.g. MTK"
                  value={formData.tokenSymbol}
                  onChange={(e) => setFormData({ ...formData, tokenSymbol: e.target.value })}
                  className="bg-[#1a1d28] border-white/10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contractAddress">Contract Address</Label>
              <Input
                id="contractAddress"
                placeholder="0x..."
                value={formData.contractAddress}
                onChange={(e) => setFormData({ ...formData, contractAddress: e.target.value })}
                className="bg-[#1a1d28] border-white/10 font-mono text-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chain">Blockchain</Label>
              <select
                id="chain"
                value={formData.chain}
                onChange={(e) => setFormData({ ...formData, chain: e.target.value })}
                className="w-full bg-[#1a1d28] border border-white/10 rounded-md px-3 py-2 text-sm"
              >
                <option value="ethereum">Ethereum (ETH)</option>
                <option value="bsc">Binance Smart Chain (BSC)</option>
                <option value="polygon">Polygon (MATIC)</option>
                <option value="solana">Solana (SOL)</option>
                <option value="base">Base</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-[#1a1d28] border-white/10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Additional Information</Label>
              <Textarea
                id="description"
                placeholder="Tell us more about your project..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-[#1a1d28] border-white/10 min-h-[80px]"
              />
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
              Submit Audit Request
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
