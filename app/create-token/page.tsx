"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { TrendingBar } from "@/components/trending-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Zap, Coins, Baby, AlertCircle, CheckCircle2 } from "lucide-react"

export default function CreateTokenPage() {
  const [selectedChain, setSelectedChain] = useState("ethereum")
  const [tokenType, setTokenType] = useState("standard")
  const [antiBot, setAntiBot] = useState(false)
  const [creating, setCreating] = useState(false)
  const [created, setCreated] = useState(false)

  // Form state
  const [tokenName, setTokenName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [decimals, setDecimals] = useState("18")
  const [totalSupply, setTotalSupply] = useState("")
  const [taxFee, setTaxFee] = useState("0")
  const [liquidityFee, setLiquidityFee] = useState("0")
  const [charityAddress, setCharityAddress] = useState("")
  const [charityPercent, setCharityPercent] = useState("0")
  const [rewardToken, setRewardToken] = useState("")

  const handleCreateToken = async () => {
    setCreating(true)
    // Simulate token creation
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setCreating(false)
    setCreated(true)
  }

  const chains = [
    { id: "ethereum", name: "Ethereum", fee: "0.1 ETH" },
    { id: "bsc", name: "BNB Chain", fee: "0.5 BNB" },
    { id: "polygon", name: "Polygon", fee: "50 MATIC" },
    { id: "base", name: "Base", fee: "0.05 ETH" },
    { id: "arbitrum", name: "Arbitrum", fee: "0.05 ETH" },
  ]

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white">
      <Header />
      <Sidebar />
      <TrendingBar />

      <main className="ml-16 mt-[73px] pt-12 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Create Your Token</h1>
            <p className="text-muted-foreground text-lg">
              Deploy your own cryptocurrency token in minutes without coding
            </p>
          </div>

          <div className="grid gap-6 mb-6">
            {/* Chain Selection */}
            <Card className="bg-[#13141a] border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-500" />
                  Select Blockchain
                </CardTitle>
                <CardDescription>Choose the network to deploy your token on</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {chains.map((chain) => (
                    <button
                      key={chain.id}
                      onClick={() => setSelectedChain(chain.id)}
                      className={`p-4 rounded-lg border transition-all ${
                        selectedChain === chain.id
                          ? "border-emerald-500 bg-emerald-500/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="font-semibold mb-1">{chain.name}</div>
                      <div className="text-xs text-muted-foreground">{chain.fee}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Token Type Selection */}
            <Card className="bg-[#13141a] border-white/10">
              <CardHeader>
                <CardTitle>Token Type</CardTitle>
                <CardDescription>Select the type of token you want to create</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={tokenType} onValueChange={setTokenType} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-black/40">
                    <TabsTrigger value="standard" className="data-[state=active]:bg-emerald-500/20">
                      <Coins className="w-4 h-4 mr-2" />
                      Standard
                    </TabsTrigger>
                    <TabsTrigger value="liquidity" className="data-[state=active]:bg-emerald-500/20">
                      <Zap className="w-4 h-4 mr-2" />
                      Liquidity Gen
                    </TabsTrigger>
                    <TabsTrigger value="baby" className="data-[state=active]:bg-emerald-500/20">
                      <Baby className="w-4 h-4 mr-2" />
                      Baby Token
                    </TabsTrigger>
                  </TabsList>

                  {/* Standard Token */}
                  <TabsContent value="standard" className="space-y-4 mt-6">
                    <Alert className="bg-blue-500/10 border-blue-500/20">
                      <Info className="h-4 w-4 text-blue-500" />
                      <AlertDescription className="text-blue-200">
                        Simple ERC20 token with basic features. Perfect for utility tokens and governance tokens.
                      </AlertDescription>
                    </Alert>

                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="tokenName">Token Name *</Label>
                          <Input
                            id="tokenName"
                            placeholder="My Token"
                            value={tokenName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenName(e.target.value)}
                            className="bg-black/40 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="symbol">Token Symbol *</Label>
                          <Input
                            id="symbol"
                            placeholder="MTK"
                            value={symbol}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSymbol(e.target.value)}
                            className="bg-black/40 border-white/10"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="decimals">Decimals *</Label>
                          <Input
                            id="decimals"
                            type="number"
                            placeholder="18"
                            value={decimals}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDecimals(e.target.value)}
                            className="bg-black/40 border-white/10"
                          />
                          <p className="text-xs text-muted-foreground">Standard is 18</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="totalSupply">Total Supply *</Label>
                          <Input
                            id="totalSupply"
                            type="number"
                            placeholder="1000000000"
                            value={totalSupply}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTotalSupply(e.target.value)}
                            className="bg-black/40 border-white/10"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg">
                        <div className="flex-1">
                          <Label htmlFor="antiBot" className="text-base">
                            Enable Anti-Bot System
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Protects against sniper bots during launch
                          </p>
                        </div>
                        <Switch id="antiBot" checked={antiBot} onCheckedChange={setAntiBot} />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Liquidity Generator Token */}
                  <TabsContent value="liquidity" className="space-y-4 mt-6">
                    <Alert className="bg-emerald-500/10 border-emerald-500/20">
                      <Info className="h-4 w-4 text-emerald-500" />
                      <AlertDescription className="text-emerald-200">
                        Token that automatically generates liquidity on every transaction. Ideal for DeFi projects.
                      </AlertDescription>
                    </Alert>

                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="tokenName2">Token Name *</Label>
                          <Input
                            id="tokenName2"
                            placeholder="My Token"
                            value={tokenName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenName(e.target.value)}
                            className="bg-black/40 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="symbol2">Token Symbol *</Label>
                          <Input
                            id="symbol2"
                            placeholder="MTK"
                            value={symbol}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSymbol(e.target.value)}
                            className="bg-black/40 border-white/10"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="decimals2">Decimals *</Label>
                          <Input
                            id="decimals2"
                            type="number"
                            placeholder="18"
                            value={decimals}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDecimals(e.target.value)}
                            className="bg-black/40 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="totalSupply2">Total Supply *</Label>
                          <Input
                            id="totalSupply2"
                            type="number"
                            placeholder="1000000000"
                            value={totalSupply}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTotalSupply(e.target.value)}
                            className="bg-black/40 border-white/10"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="taxFee">Transaction Tax Fee (%)</Label>
                          <Input
                            id="taxFee"
                            type="number"
                            placeholder="2"
                            value={taxFee}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaxFee(e.target.value)}
                            className="bg-black/40 border-white/10"
                          />
                          <p className="text-xs text-muted-foreground">Fee redistributed to holders</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="liquidityFee">Liquidity Fee (%)</Label>
                          <Input
                            id="liquidityFee"
                            type="number"
                            placeholder="3"
                            value={liquidityFee}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLiquidityFee(e.target.value)}
                            className="bg-black/40 border-white/10"
                          />
                          <p className="text-xs text-muted-foreground">Auto-added to liquidity pool</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg">
                        <div className="flex-1">
                          <Label htmlFor="antiBot2" className="text-base">
                            Enable Anti-Bot System
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Protects against sniper bots during launch
                          </p>
                        </div>
                        <Switch id="antiBot2" checked={antiBot} onCheckedChange={setAntiBot} />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Baby Token */}
                  <TabsContent value="baby" className="space-y-4 mt-6">
                    <Alert className="bg-purple-500/10 border-purple-500/20">
                      <Info className="h-4 w-4 text-purple-500" />
                      <AlertDescription className="text-purple-200">
                        Token that rewards holders with another token (like BTC or ETH). Great for passive income
                        tokens.
                      </AlertDescription>
                    </Alert>

                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="tokenName3">Token Name *</Label>
                          <Input
                            id="tokenName3"
                            placeholder="Baby Bitcoin"
                            value={tokenName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenName(e.target.value)}
                            className="bg-black/40 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="symbol3">Token Symbol *</Label>
                          <Input
                            id="symbol3"
                            placeholder="BABYBTC"
                            value={symbol}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSymbol(e.target.value)}
                            className="bg-black/40 border-white/10"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="decimals3">Decimals *</Label>
                          <Input
                            id="decimals3"
                            type="number"
                            placeholder="18"
                            value={decimals}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDecimals(e.target.value)}
                            className="bg-black/40 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="totalSupply3">Total Supply *</Label>
                          <Input
                            id="totalSupply3"
                            type="number"
                            placeholder="1000000000"
                            value={totalSupply}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTotalSupply(e.target.value)}
                            className="bg-black/40 border-white/10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rewardToken">Reward Token Address *</Label>
                        <Input
                          id="rewardToken"
                          placeholder="0x..."
                          value={rewardToken}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRewardToken(e.target.value)}
                          className="bg-black/40 border-white/10"
                        />
                        <p className="text-xs text-muted-foreground">
                          Token that holders will receive as rewards (e.g., WBTC, WETH)
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="rewardFee">Reward Fee (%)</Label>
                          <Input id="rewardFee" type="number" placeholder="7" className="bg-black/40 border-white/10" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="liquidityFee2">Liquidity Fee (%)</Label>
                          <Input
                            id="liquidityFee2"
                            type="number"
                            placeholder="3"
                            value={liquidityFee}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLiquidityFee(e.target.value)}
                            className="bg-black/40 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="marketingFee">Marketing Fee (%)</Label>
                          <Input
                            id="marketingFee"
                            type="number"
                            placeholder="2"
                            className="bg-black/40 border-white/10"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg">
                        <div className="flex-1">
                          <Label htmlFor="antiBot3" className="text-base">
                            Enable Anti-Bot System
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Protects against sniper bots during launch
                          </p>
                        </div>
                        <Switch id="antiBot3" checked={antiBot} onCheckedChange={setAntiBot} />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Summary & Create */}
            <Card className="bg-[#13141a] border-white/10">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-black/40 rounded-lg">
                  <div>
                    <div className="text-sm text-muted-foreground">Network</div>
                    <div className="font-semibold capitalize">{chains.find((c) => c.id === selectedChain)?.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Token Type</div>
                    <div className="font-semibold capitalize">{tokenType}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Creation Fee</div>
                    <div className="font-semibold">{chains.find((c) => c.id === selectedChain)?.fee}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Anti-Bot</div>
                    <div className="font-semibold">{antiBot ? "Enabled" : "Disabled"}</div>
                  </div>
                </div>

                <Alert className="bg-yellow-500/10 border-yellow-500/20">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <AlertDescription className="text-yellow-200">
                    Once created, core parameters (Name, Symbol, Supply, Decimals) cannot be changed. Please review
                    carefully.
                  </AlertDescription>
                </Alert>

                {created && (
                  <Alert className="bg-emerald-500/10 border-emerald-500/20">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <AlertDescription className="text-emerald-200">
                      Token created successfully! Contract: 0x742d...a3f9
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleCreateToken}
                  disabled={creating || !tokenName || !symbol || !totalSupply}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-12 text-lg"
                >
                  {creating ? "Creating Token..." : "Create Token"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By creating a token, you agree to our Terms of Service and understand the risks involved in
                  cryptocurrency creation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
