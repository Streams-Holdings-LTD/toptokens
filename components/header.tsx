"use client"

import type React from "react"

import { Search, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"

export function Header() {
  const [isAddCoinOpen, setIsAddCoinOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddCoin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Coin submission initiated")
    setIsAddCoinOpen(false)
  }

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Sign in initiated")
    setIsSignInOpen(false)
  }

  return (
    <header className="border-b border-white/5 bg-[#0d0e12] px-6 py-3 sticky top-0 z-50" suppressHydrationWarning>
      <div className="flex items-center justify-between max-w-[1920px] mx-auto">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Top Tokens
            </span>
          </div>

          <div className="relative w-[500px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search project by name or address..."
              className="pl-11 h-11 bg-[#1a1b23] border-white/10 text-white placeholder:text-muted-foreground rounded-xl focus:border-emerald-500/50 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-2" suppressHydrationWarning>
          {mounted && (
            <>
          <Dialog open={isAddCoinOpen} onOpenChange={setIsAddCoinOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-emerald-600/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-600/20 hover:border-emerald-500/40 h-10"
              >
                <Plus className="w-4 h-4" />
                Submit Coin
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0f1014] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Submit a New Coin</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Add your cryptocurrency project to Top Tokens
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddCoin} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="coin-name">Coin Name *</Label>
                    <Input
                      id="coin-name"
                      placeholder="e.g., Bitcoin"
                      className="bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="token-symbol">Token Symbol *</Label>
                    <Input
                      id="token-symbol"
                      placeholder="e.g., BTC"
                      className="bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="blockchain">Blockchain *</Label>
                    <select
                      id="blockchain"
                      className="w-full h-10 bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 [&>option]:bg-[#1a1b23] [&>option]:text-white"
                      required
                    >
                      <option value="">Select blockchain</option>
                      <option value="ethereum">Ethereum</option>
                      <option value="bsc">BNB Smart Chain</option>
                      <option value="polygon">Polygon</option>
                      <option value="solana">Solana</option>
                      <option value="base">Base</option>
                      <option value="arbitrum">Arbitrum</option>
                      <option value="avalanche">Avalanche</option>
                      <option value="optimism">Optimism</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="launch-date">Launch Date</Label>
                    <Input
                      id="launch-date"
                      type="date"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contract-address">Contract Address *</Label>
                  <Input
                    id="contract-address"
                    placeholder="0x..."
                    className="bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of your project"
                    className="bg-white/5 border-white/10 text-white min-h-24"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo-url">Logo URL</Label>
                  <Input
                    id="logo-url"
                    type="url"
                    placeholder="https://example.com/logo.png"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website *</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://"
                    className="bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telegram">Telegram</Label>
                    <Input
                      id="telegram"
                      type="url"
                      placeholder="https://t.me/..."
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter/X</Label>
                    <Input
                      id="twitter"
                      type="url"
                      placeholder="https://x.com/..."
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whitepaper">Whitepaper Link</Label>
                  <Input
                    id="whitepaper"
                    type="url"
                    placeholder="https://..."
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Submit Coin
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              mounted,
            }) => {
              const ready = mounted
              const connected = ready && account && chain

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <Button
                          onClick={openConnectModal}
                          variant="outline"
                          size="sm"
                          className="gap-2 bg-[#1a1b23] border-white/10 text-white hover:bg-white/10 h-10"
                        >
                          Connect Wallet
                        </Button>
                      )
                    }

                    if (chain.unsupported) {
                      return (
                        <Button
                          onClick={openChainModal}
                          variant="outline"
                          size="sm"
                          className="gap-2 bg-red-600/20 border-red-500/40 text-red-300 hover:bg-red-600/30 h-10"
                        >
                          Wrong network
                        </Button>
                      )
                    }

                    return (
                      <div className="flex gap-2">
                        <Button
                          onClick={openChainModal}
                          variant="outline"
                          size="sm"
                          className="gap-2 bg-[#1a1b23] border-white/10 text-white hover:bg-white/10 h-10"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 16,
                                height: 16,
                                borderRadius: 999,
                                overflow: 'hidden',
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  style={{ width: 16, height: 16 }}
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </Button>

                        <Button
                          onClick={openAccountModal}
                          variant="outline"
                          size="sm"
                          className="gap-2 bg-emerald-600/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 h-10"
                        >
                          {account.displayName}
                        </Button>
                      </div>
                    )
                  })()}
                </div>
              )
            }}
          </ConnectButton.Custom>

          <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 text-white hover:bg-white/5 h-10">
                <User className="w-4 h-4" />
                Login
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0f1014] border-white/10 text-white">
              <DialogHeader>
                <DialogTitle>Sign In to Top Tokens</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Access your account to track favorites and manage submissions
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Sign In
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <button type="button" className="text-emerald-500 hover:underline">
                    Sign Up
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isGetStartedOpen} onOpenChange={setIsGetStartedOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 h-10 px-6 shadow-lg shadow-emerald-500/20"
              >
                Get Started
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0f1014] border-white/10 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl">Welcome to Top Tokens</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Discover the next generation of cryptocurrency projects
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Connect Your Wallet</h3>
                      <p className="text-sm text-muted-foreground">
                        Connect your crypto wallet to track your portfolio and participate in launches
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Explore Projects</h3>
                      <p className="text-sm text-muted-foreground">
                        Browse trending coins, pre-launch projects, and audit updates to find promising opportunities
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Track & Invest</h3>
                      <p className="text-sm text-muted-foreground">
                        Save favorites, check trust scores, and make informed investment decisions
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => {
                      setIsGetStartedOpen(false)
                    }}
                  >
                    Explore Projects
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
                    onClick={() => {
                      setIsGetStartedOpen(false)
                      setIsSignInOpen(true)
                    }}
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
