"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  Shield,
  Eye,
  Users,
  BarChart3,
  Zap,
  Link2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ExternalLink,
  Copy,
  Loader2,
  RefreshCw,
} from "lucide-react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { TrendingBar } from "@/components/trending-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const supportedChains = [
  { id: "ethereum", name: "Ethereum", symbol: "ETH", color: "from-blue-500 to-purple-500", placeholder: "0x..." },
  { id: "bsc", name: "BNB Smart Chain", symbol: "BSC", color: "from-yellow-500 to-orange-500", placeholder: "0x..." },
  { id: "polygon", name: "Polygon", symbol: "MATIC", color: "from-purple-500 to-pink-500", placeholder: "0x..." },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    color: "from-teal-400 to-emerald-500",
    placeholder: "Token address...",
  },
  { id: "base", name: "Base", symbol: "BASE", color: "from-blue-400 to-blue-600", placeholder: "0x..." },
  { id: "arbitrum", name: "Arbitrum", symbol: "ARB", color: "from-blue-600 to-cyan-500", placeholder: "0x..." },
  { id: "avalanche", name: "Avalanche", symbol: "AVAX", color: "from-red-500 to-red-600", placeholder: "0x..." },
  { id: "fantom", name: "Fantom", symbol: "FTM", color: "from-blue-400 to-blue-500", placeholder: "0x..." },
  { id: "cronos", name: "Cronos", symbol: "CRO", color: "from-blue-800 to-blue-900", placeholder: "0x..." },
  { id: "optimism", name: "Optimism", symbol: "OP", color: "from-red-500 to-pink-500", placeholder: "0x..." },
]

const trendingScans = [
  {
    name: "BTCSTABLES COIN",
    address: "0x8x61...d24444",
    chain: "ethereum",
    issues: 0,
    warnings: 1,
    info: 19,
    score: 95.0,
  },
  { name: "AIAIO", address: "0x8qvv...AkcyN1", chain: "bsc", issues: 0, warnings: 2, info: 6, score: 78.1 },
  { name: "Narto", address: "4KTN...Ugpump", chain: "solana", issues: 1, warnings: 0, info: 7, score: 75.0 },
  { name: "BaseDog", address: "0xf3a2...8b9c", chain: "base", issues: 0, warnings: 1, info: 5, score: 88.5 },
  { name: "ArbiPepe", address: "0xa1b2...c3d4", chain: "arbitrum", issues: 0, warnings: 2, info: 8, score: 82.0 },
  { name: "PolyDoge", address: "0x9e8d...7f6a", chain: "polygon", issues: 1, warnings: 1, info: 4, score: 71.2 },
]

const features = [
  {
    icon: Eye,
    title: "Trust Score Analysis",
    description: "Comprehensive trust score based on security features, holder distribution, and contract analysis",
  },
  {
    icon: Shield,
    title: "Security Assessment",
    description: "Detect honeypots, ownership risks, mintable tokens, and other security concerns",
  },
  {
    icon: Users,
    title: "Holder Analysis",
    description: "View top holders, concentration risks, and lock status of major positions",
  },
  {
    icon: BarChart3,
    title: "DEX Listings",
    description: "See all DEX listings, liquidity information, and trading pairs",
  },
  { icon: Zap, title: "Real-time Data", description: "Get up-to-date market data, prices, and trading volume" },
  {
    icon: Link2,
    title: "Multi-Chain Support",
    description: "Scan tokens across 10+ blockchains including ETH, BSC, SOL, and more",
  },
]

type ScanResult = {
  name: string
  symbol: string
  address: string
  chain: string
  chainId: string
  tokenStandard: string
  trustScore: number
  securityIssues: { type: "error" | "warning" | "info"; message: string }[]
  holders: { address: string; percentage: number; label?: string }[]
  liquidity: string
  marketCap: string
  price: string
  totalSupply: string
  circulatingSupply: string
  contractAge: string
  transactions24h: number
  uniqueHolders: number
  buyTax: string
  sellTax: string
  isVerified: boolean
  isRenounced: boolean
  liquidityLocked: boolean
  explorerUrl: string
}

export default function TokenScanPage() {
  const [address, setAddress] = useState("")
  const [chain, setChain] = useState("ethereum")
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [scanHistory, setScanHistory] = useState<{ address: string; chain: string; score: number; name: string }[]>([])

  const selectedChain = supportedChains.find((c) => c.id === chain)

  const handleScan = async () => {
    if (!address) return

    setIsScanning(true)
    setError(null)
    setScanResult(null)

    try {
      const response = await fetch("/api/token-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: address.trim(), chain }),
      })

      // Check if response is JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Server returned ${response.status} ${response.statusText}. Please try again.`)
      }

      // Check if response body is empty
      const responseText = await response.text()
      if (!responseText.trim()) {
        throw new Error(`Server returned empty response (${response.status}). Please try again.`)
      }

      const data = JSON.parse(responseText)

      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`)
      }

      setScanResult(data)

      // Add to scan history
      setScanHistory((prev) => {
        const newHistory = [{ address: address.trim(), chain, score: data.trustScore, name: data.name }, ...prev]
        return newHistory.slice(0, 5) // Keep last 5 scans
      })
    } catch (err) {
      console.error("Scan error:", err)
      setError(err instanceof Error ? err.message : "An error occurred while scanning")
    } finally {
      setIsScanning(false)
    }
  }

  const handleTrendingScan = (scan: (typeof trendingScans)[0]) => {
    setAddress(scan.address)
    setChain(scan.chain)
  }

  const copyAddress = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && address && !isScanning) {
      handleScan()
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-foreground">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-56">
          <TrendingBar />
          <div className="max-w-7xl mx-auto p-6">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                <span className="text-emerald-500">Top Tokens</span> Token Scanner
              </h1>
              <p className="text-gray-300 mb-4">
                Advanced multi-chain token analyzer for comprehensive security assessment
              </p>
              {/* Chain Icons */}
              <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
                {supportedChains.slice(0, 6).map((c) => (
                  <div
                    key={c.id}
                    className={cn(
                      "w-8 h-8 rounded-full bg-gradient-to-br cursor-pointer transition-all hover:scale-110",
                      c.color,
                      chain === c.id && "ring-2 ring-white ring-offset-2 ring-offset-[#0a0b0f]",
                    )}
                    onClick={() => setChain(c.id)}
                    title={c.name}
                  />
                ))}
                <span className="text-gray-300 text-sm">+{supportedChains.length - 6} more</span>
              </div>
            </div>

            {/* Search Section */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-2 bg-[#12141a] border border-white/10 rounded-xl p-3">
                <div className="flex-1 flex items-center gap-2 px-3">
                  <Search className="w-5 h-5 text-gray-300 flex-shrink-0" />
                  <Input
                    placeholder={selectedChain?.placeholder || "Enter token address..."}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-gray-300"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={chain}
                    onChange={(e) => setChain(e.target.value)}
                    className="bg-[#1a1d28] border border-white/10 rounded-lg px-3 py-2 text-sm text-white min-w-[140px]"
                  >
                    {supportedChains.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.symbol})
                      </option>
                    ))}
                  </select>
                  <Button
                    onClick={handleScan}
                    disabled={isScanning || !address}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6"
                  >
                    {isScanning ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      "Scan Token"
                    )}
                  </Button>
                </div>
              </div>
              {error && (
                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400">
                  <XCircle className="w-5 h-5" />
                  {error}
                </div>
              )}
            </div>

            {/* Scan Results */}
            {scanResult && (
              <div className="max-w-4xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-[#12141a] border border-white/10 rounded-xl p-6 space-y-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-xl",
                          supportedChains.find((c) => c.id === scanResult.chainId)?.color ||
                            "from-gray-500 to-gray-600",
                        )}
                      >
                        {scanResult.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-bold text-white">{scanResult.name}</h2>
                          {scanResult.isVerified && <Badge className="bg-blue-500/20 text-blue-400">Verified</Badge>}
                          {scanResult.isRenounced && (
                            <Badge className="bg-emerald-500/20 text-emerald-400">Renounced</Badge>
                          )}
                        </div>
                        <p className="text-gray-300">
                          {scanResult.symbol} • {scanResult.chain} • {scanResult.tokenStandard}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-gray-300 font-mono">{scanResult.address}</p>
                          <button
                            onClick={copyAddress}
                            className="text-gray-300 hover:text-white transition-colors"
                          >
                            {copied ? (
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          <a
                            href={scanResult.explorerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={cn(
                          "text-5xl font-bold",
                          scanResult.trustScore >= 80
                            ? "text-emerald-400"
                            : scanResult.trustScore >= 60
                              ? "text-amber-400"
                              : scanResult.trustScore >= 40
                                ? "text-orange-400"
                                : "text-red-400",
                        )}
                      >
                        {scanResult.trustScore.toFixed(1)}
                      </div>
                      <p className="text-sm text-gray-300">Trust Score</p>
                      <div className="mt-2 h-2 w-32 bg-[#1a1d28] rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-1000",
                            scanResult.trustScore >= 80
                              ? "bg-emerald-500"
                              : scanResult.trustScore >= 60
                                ? "bg-amber-500"
                                : scanResult.trustScore >= 40
                                  ? "bg-orange-500"
                                  : "bg-red-500",
                          )}
                          style={{ width: `${scanResult.trustScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-[#1a1d28] rounded-lg p-4">
                      <p className="text-gray-400 text-xs mb-1 font-medium">Price</p>
                      <p className="text-lg font-bold text-white">{scanResult.price}</p>
                    </div>
                    <div className="bg-[#1a1d28] rounded-lg p-4">
                      <p className="text-gray-400 text-xs mb-1 font-medium">Market Cap</p>
                      <p className="text-lg font-bold text-white">{scanResult.marketCap}</p>
                    </div>
                    <div className="bg-[#1a1d28] rounded-lg p-4">
                      <p className="text-gray-400 text-xs mb-1 font-medium">Liquidity</p>
                      <p className="text-lg font-bold text-white">{scanResult.liquidity}</p>
                      {scanResult.liquidityLocked && (
                        <Badge className="bg-emerald-500/20 text-emerald-400 text-xs mt-1">Locked</Badge>
                      )}
                    </div>
                    <div className="bg-[#1a1d28] rounded-lg p-4">
                      <p className="text-gray-400 text-xs mb-1 font-medium">Holders</p>
                      <p className="text-lg font-bold text-white">{scanResult.uniqueHolders.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <div className="bg-[#1a1d28] rounded-lg p-3">
                      <p className="text-gray-400 text-xs font-medium mb-1">Buy Tax</p>
                      <p
                        className={cn(
                          "font-semibold",
                          scanResult.buyTax === "0%" ? "text-emerald-400" : "text-amber-400",
                        )}
                      >
                        {scanResult.buyTax}
                      </p>
                    </div>
                    <div className="bg-[#1a1d28] rounded-lg p-3">
                      <p className="text-gray-400 text-xs font-medium mb-1">Sell Tax</p>
                      <p
                        className={cn(
                          "font-semibold",
                          scanResult.sellTax === "0%" ? "text-emerald-400" : "text-amber-400",
                        )}
                      >
                        {scanResult.sellTax}
                      </p>
                    </div>
                    <div className="bg-[#1a1d28] rounded-lg p-3">
                      <p className="text-gray-400 text-xs font-medium mb-1">Contract Age</p>
                      <p className="text-white font-semibold">{scanResult.contractAge}</p>
                    </div>
                    <div className="bg-[#1a1d28] rounded-lg p-3">
                      <p className="text-gray-400 text-xs font-medium mb-1">24h Txns</p>
                      <p className="text-white font-semibold">{scanResult.transactions24h.toLocaleString()}</p>
                    </div>
                    <div className="bg-[#1a1d28] rounded-lg p-3">
                      <p className="text-gray-400 text-xs font-medium mb-1">Total Supply</p>
                      <p className="text-white font-semibold text-xs">{scanResult.totalSupply}</p>
                    </div>
                  </div>

                  {/* Security Analysis */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-emerald-500" />
                      Security Analysis
                    </h3>
                    <div className="grid gap-2">
                      {scanResult.securityIssues.map((issue, i) => (
                        <div
                          key={i}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg",
                            issue.type === "error"
                              ? "bg-red-500/10 border border-red-500/20"
                              : issue.type === "warning"
                                ? "bg-amber-500/10 border border-amber-500/20"
                                : "bg-emerald-500/10 border border-emerald-500/20",
                          )}
                        >
                          {issue.type === "error" ? (
                            <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                          ) : issue.type === "warning" ? (
                            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                          )}
                          <span
                            className={cn(
                              "text-sm",
                              issue.type === "error"
                                ? "text-red-400"
                                : issue.type === "warning"
                                  ? "text-amber-400"
                                  : "text-emerald-400",
                            )}
                          >
                            {issue.message}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Holders */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-emerald-500" />
                      Top Holders
                    </h3>
                    <div className="space-y-2">
                      {scanResult.holders.map((holder, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-[#1a1d28] rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-300 w-6">#{i + 1}</span>
                            <span className="font-mono text-sm text-white">{holder.address}</span>
                            {holder.label && (
                              <Badge
                                className={cn(
                                  "text-xs",
                                  holder.label.includes("Locked")
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : holder.label.includes("Pool")
                                      ? "bg-blue-500/20 text-blue-400"
                                      : "bg-purple-500/20 text-purple-400",
                                )}
                              >
                                {holder.label}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-2 bg-[#0a0b0f] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: `${holder.percentage * 2}%` }}
                              />
                            </div>
                            <span className="text-white font-semibold w-16 text-right">{holder.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setAddress("")
                        setScanResult(null)
                      }}
                      className="border-emerald-400/60 bg-emerald-500/15 text-white hover:bg-emerald-500/25 hover:border-emerald-300/80"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      New Scan
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="border-cyan-300/60 bg-cyan-500/15 text-white hover:bg-cyan-500/25 hover:border-cyan-200/80"
                    >
                      <a href={scanResult.explorerUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View on Explorer
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Scan History */}
            {scanHistory.length > 0 && !scanResult && (
              <div className="max-w-3xl mx-auto mb-8">
                <h3 className="text-lg font-semibold text-white mb-3">Recent Scans</h3>
                <div className="flex gap-2 flex-wrap">
                  {scanHistory.map((scan, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setAddress(scan.address)
                        setChain(scan.chain)
                      }}
                      className="bg-[#12141a] border border-white/10 rounded-lg px-3 py-2 text-sm hover:border-emerald-500/30 transition-colors flex items-center gap-2"
                    >
                      <span className="text-white">{scan.name}</span>
                      <span
                        className={cn(
                          "font-semibold",
                          scan.score >= 80 ? "text-emerald-400" : scan.score >= 60 ? "text-amber-400" : "text-red-400",
                        )}
                      >
                        {scan.score.toFixed(0)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Scans */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-semibold text-white">
                  Trending Scans <span className="text-gray-300">(24h)</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trendingScans.map((scan, i) => {
                  const scanChain = supportedChains.find((c) => c.id === scan.chain)
                  return (
                    <div
                      key={i}
                      onClick={() => handleTrendingScan(scan)}
                      className="bg-[#12141a] border border-white/10 rounded-xl p-4 hover:border-emerald-500/30 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-lg bg-gradient-to-br",
                            scanChain?.color || "from-gray-500 to-gray-600",
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-semibold truncate">{scan.name}</span>
                            <Badge className="bg-blue-500/20 text-blue-400 text-xs flex-shrink-0">✓</Badge>
                          </div>
                          <p className="text-xs text-gray-300 font-mono">{scan.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {scan.issues > 0 && (
                            <Badge className="bg-red-500/20 text-red-400 text-xs">{scan.issues} errors</Badge>
                          )}
                          {scan.warnings > 0 && (
                            <Badge className="bg-amber-500/20 text-amber-400 text-xs">{scan.warnings} warnings</Badge>
                          )}
                          <Badge className="bg-blue-500/20 text-blue-400 text-xs">{scan.info} info</Badge>
                        </div>
                        <span
                          className={cn(
                            "font-bold",
                            scan.score >= 80
                              ? "text-emerald-400"
                              : scan.score >= 60
                                ? "text-amber-400"
                                : "text-red-400",
                          )}
                        >
                          {scan.score}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-300 group-hover:text-emerald-400 transition-colors">
                        Click to scan on {scanChain?.name}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-amber-400 text-sm">
                  <strong>Important Disclaimer:</strong> Token scanning results are for informational purposes only and
                  should not be considered as financial advice. While we strive to provide accurate security
                  assessments, no tool can guarantee 100% accuracy. Always DYOR (Do Your Own Research)!
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white text-center mb-2">Key Features</h3>
              <p className="text-gray-300 text-center mb-8">
                Comprehensive scanning capabilities designed to give you complete visibility into any token
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className="bg-[#12141a] border border-white/10 rounded-xl p-6 hover:border-emerald-500/30 transition-colors"
                  >
                    <div className="w-12 h-12 bg-[#1a1d28] rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Blockchains */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white text-center mb-2">Supported Blockchains</h3>
              <p className="text-muted-foreground text-center mb-8">
                Scan tokens across {supportedChains.length} popular blockchains with comprehensive multi-chain support
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {supportedChains.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setChain(c.id)}
                    className={cn(
                      "bg-[#12141a] border rounded-xl p-4 flex items-center gap-3 transition-all hover:scale-105",
                      chain === c.id ? "border-emerald-500" : "border-white/10 hover:border-emerald-500/30",
                    )}
                  >
                    <div className={cn("w-10 h-10 rounded-lg bg-gradient-to-br flex-shrink-0", c.color)} />
                    <div className="text-left min-w-0">
                      <h4 className="text-white font-semibold text-sm truncate">{c.name}</h4>
                      <p className="text-xs text-muted-foreground">{c.symbol}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
