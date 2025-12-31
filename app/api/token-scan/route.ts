import { type NextRequest, NextResponse } from "next/server"

// Chain configurations with DEXScreener chain identifiers
const chainConfigs: Record<
  string,
  {
    name: string
    explorer: string
    dexScreenerChain: string
    goPlusChain: string
    nativeSymbol: string
    tokenStandard: string
  }
> = {
  ethereum: {
    name: "Ethereum",
    explorer: "etherscan.io",
    dexScreenerChain: "ethereum",
    goPlusChain: "1",
    nativeSymbol: "ETH",
    tokenStandard: "ERC-20",
  },
  bsc: {
    name: "BNB Smart Chain",
    explorer: "bscscan.com",
    dexScreenerChain: "bsc",
    goPlusChain: "56",
    nativeSymbol: "BNB",
    tokenStandard: "BEP-20",
  },
  polygon: {
    name: "Polygon",
    explorer: "polygonscan.com",
    dexScreenerChain: "polygon",
    goPlusChain: "137",
    nativeSymbol: "MATIC",
    tokenStandard: "ERC-20",
  },
  base: {
    name: "Base",
    explorer: "basescan.org",
    dexScreenerChain: "base",
    goPlusChain: "8453",
    nativeSymbol: "ETH",
    tokenStandard: "ERC-20",
  },
  arbitrum: {
    name: "Arbitrum",
    explorer: "arbiscan.io",
    dexScreenerChain: "arbitrum",
    goPlusChain: "42161",
    nativeSymbol: "ETH",
    tokenStandard: "ERC-20",
  },
  solana: {
    name: "Solana",
    explorer: "solscan.io",
    dexScreenerChain: "solana",
    goPlusChain: "solana",
    nativeSymbol: "SOL",
    tokenStandard: "SPL",
  },
  avalanche: {
    name: "Avalanche",
    explorer: "snowtrace.io",
    dexScreenerChain: "avalanche",
    goPlusChain: "43114",
    nativeSymbol: "AVAX",
    tokenStandard: "ERC-20",
  },
  fantom: {
    name: "Fantom",
    explorer: "ftmscan.com",
    dexScreenerChain: "fantom",
    goPlusChain: "250",
    nativeSymbol: "FTM",
    tokenStandard: "ERC-20",
  },
  cronos: {
    name: "Cronos",
    explorer: "cronoscan.com",
    dexScreenerChain: "cronos",
    goPlusChain: "25",
    nativeSymbol: "CRO",
    tokenStandard: "CRC-20",
  },
  optimism: {
    name: "Optimism",
    explorer: "optimistic.etherscan.io",
    dexScreenerChain: "optimism",
    goPlusChain: "10",
    nativeSymbol: "ETH",
    tokenStandard: "ERC-20",
  },
}

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs: number = 10000): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout')
    }
    throw error
  }
}

async function fetchEthplorerData(address: string) {
  try {
    const response = await fetchWithTimeout(`https://api.ethplorer.io/getTokenInfo/${address}?apiKey=freekey`, {
      cache: "no-store",
    }, 8000)

    if (!response.ok) {
      console.log(`[v0] Ethplorer API returned ${response.status}`)
      return null
    }

    const data = await response.json()

    if (data.error) {
      console.log(`[v0] Ethplorer error: ${data.error.message}`)
      return null
    }

    console.log(`[v0] Ethplorer found token: ${data.name} (${data.symbol})`)

    return {
      name: data.name || "Unknown",
      symbol: data.symbol || "???",
      address: data.address || address,
      decimals: data.decimals || 18,
      totalSupply: data.totalSupply,
      holdersCount: data.holdersCount,
      price: data.price?.rate ? `$${Number(data.price.rate).toFixed(8)}` : "N/A",
      marketCap: data.price?.marketCapUsd ? `$${Number(data.price.marketCapUsd).toLocaleString()}` : "N/A",
      volume24h: data.price?.volume24h ? `$${Number(data.price.volume24h).toLocaleString()}` : "N/A",
      priceChange24h: data.price?.diff || 0,
      owner: data.owner,
      isVerified: data.publicTags?.length > 0,
    }
  } catch (error) {
    console.error("[v0] Ethplorer API error:", error)
    return null
  }
}

async function fetchBlockscoutData(address: string, chain: string) {
  const blockscoutUrls: Record<string, string> = {
    ethereum: "https://eth.blockscout.com/api/v2",
    polygon: "https://polygon.blockscout.com/api/v2",
    base: "https://base.blockscout.com/api/v2",
    arbitrum: "https://arbitrum.blockscout.com/api/v2",
    optimism: "https://optimism.blockscout.com/api/v2",
  }

  const baseUrl = blockscoutUrls[chain]
  if (!baseUrl) return null

  try {
    const response = await fetch(`${baseUrl}/tokens/${address}`, { cache: "no-store" })

    if (!response.ok) {
      console.log(`[v0] Blockscout API returned ${response.status}`)
      return null
    }

    const data = await response.json()

    if (!data || data.message) {
      console.log(`[v0] Blockscout error: ${data?.message || "No data"}`)
      return null
    }

    console.log(`[v0] Blockscout found token: ${data.name} (${data.symbol})`)

    return {
      name: data.name || "Unknown",
      symbol: data.symbol || "???",
      address: data.address || address,
      decimals: data.decimals ? Number.parseInt(data.decimals) : 18,
      totalSupply: data.total_supply,
      holdersCount: data.holders,
      price: data.exchange_rate ? `$${Number(data.exchange_rate).toFixed(8)}` : "N/A",
      marketCap: data.circulating_market_cap ? `$${Number(data.circulating_market_cap).toLocaleString()}` : "N/A",
      volume24h: "N/A",
      priceChange24h: 0,
      isVerified: data.is_verified_via_admin_panel || false,
      type: data.type,
    }
  } catch (error) {
    console.error("[v0] Blockscout API error:", error)
    return null
  }
}

async function fetchDexScreenerData(address: string, chain: string) {
  try {
    const chainConfig = chainConfigs[chain]

    const response = await fetchWithTimeout(`https://api.dexscreener.com/latest/dex/search?q=${address}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    }, 8000)

    if (!response.ok) {
      console.error(`[v0] DEXScreener API returned ${response.status}`)
      return null
    }

    const data = await response.json()

    if (!data.pairs || data.pairs.length === 0) {
      console.log(`[v0] No DEXScreener pairs found for address ${address}`)
      return null
    }

    const normalizedAddress = address.toLowerCase()
    const matchingPairs = data.pairs.filter((p: any) => {
      const chainMatch = p.chainId === chainConfig.dexScreenerChain
      const addressMatch = p.baseToken?.address?.toLowerCase() === normalizedAddress
      return chainMatch && addressMatch
    })

    if (matchingPairs.length === 0) {
      const quoteMatchingPairs = data.pairs.filter((p: any) => {
        const chainMatch = p.chainId === chainConfig.dexScreenerChain
        const addressMatch = p.quoteToken?.address?.toLowerCase() === normalizedAddress
        return chainMatch && addressMatch
      })

      if (quoteMatchingPairs.length > 0) {
        const pair = quoteMatchingPairs[0]
        return {
          name: pair.quoteToken?.name || "Unknown",
          symbol: pair.quoteToken?.symbol || "???",
          address: pair.quoteToken?.address || address,
          price: pair.priceUsd ? `$${Number.parseFloat(pair.priceUsd).toFixed(8)}` : "N/A",
          priceChange24h: pair.priceChange?.h24 || 0,
          marketCap: pair.marketCap ? `$${Number(pair.marketCap).toLocaleString()}` : "N/A",
          fdv: pair.fdv ? `$${Number(pair.fdv).toLocaleString()}` : "N/A",
          liquidity: pair.liquidity?.usd ? `$${Number(pair.liquidity.usd).toLocaleString()}` : "N/A",
          volume24h: pair.volume?.h24 ? `$${Number(pair.volume.h24).toLocaleString()}` : "N/A",
          transactions24h: (pair.txns?.h24?.buys || 0) + (pair.txns?.h24?.sells || 0),
          buys24h: pair.txns?.h24?.buys || 0,
          sells24h: pair.txns?.h24?.sells || 0,
          pairAddress: pair.pairAddress,
          dexId: pair.dexId,
          pairCreatedAt: pair.pairCreatedAt,
          url: pair.url,
        }
      }

      console.log(`[v0] No DEXScreener matching pairs for chain ${chain} and address ${address}`)
      return null
    }

    const sortedPairs = matchingPairs.sort((a: any, b: any) => {
      const liqA = a.liquidity?.usd || 0
      const liqB = b.liquidity?.usd || 0
      return liqB - liqA
    })

    const pair = sortedPairs[0]
    console.log(`[v0] DEXScreener found token: ${pair.baseToken?.name} (${pair.baseToken?.symbol})`)

    return {
      name: pair.baseToken?.name || "Unknown",
      symbol: pair.baseToken?.symbol || "???",
      address: pair.baseToken?.address || address,
      price: pair.priceUsd ? `$${Number.parseFloat(pair.priceUsd).toFixed(8)}` : "N/A",
      priceChange24h: pair.priceChange?.h24 || 0,
      marketCap: pair.marketCap ? `$${Number(pair.marketCap).toLocaleString()}` : "N/A",
      fdv: pair.fdv ? `$${Number(pair.fdv).toLocaleString()}` : "N/A",
      liquidity: pair.liquidity?.usd ? `$${Number(pair.liquidity.usd).toLocaleString()}` : "N/A",
      volume24h: pair.volume?.h24 ? `$${Number(pair.volume.h24).toLocaleString()}` : "N/A",
      transactions24h: (pair.txns?.h24?.buys || 0) + (pair.txns?.h24?.sells || 0),
      buys24h: pair.txns?.h24?.buys || 0,
      sells24h: pair.txns?.h24?.sells || 0,
      pairAddress: pair.pairAddress,
      dexId: pair.dexId,
      pairCreatedAt: pair.pairCreatedAt,
      url: pair.url,
    }
  } catch (error) {
    console.error("[v0] DEXScreener API error:", error)
    return null
  }
}

async function fetchGoPlusSecurityData(address: string, chainId: string) {
  try {
    const normalizedAddress = address.toLowerCase()
    const response = await fetchWithTimeout(
      `https://api.gopluslabs.io/api/v1/token_security/${chainId}?contract_addresses=${normalizedAddress}`,
      { cache: "no-store" },
      8000
    )

    if (!response.ok) {
      console.error(`[v0] GoPlus API returned ${response.status}`)
      return null
    }

    const data = await response.json()

    if (data.code !== 1 || !data.result) {
      console.log(`[v0] GoPlus returned no data for ${address}`)
      return null
    }

    const result = data.result[normalizedAddress] || data.result[address]

    if (!result) {
      console.log(`[v0] No GoPlus result for address ${address}`)
      return null
    }

    console.log(`[v0] GoPlus found security data for token`)
    return result
  } catch (error) {
    console.error("[v0] GoPlus API error:", error)
    return null
  }
}

function processSecurityData(security: any) {
  const issues: { type: "error" | "warning" | "info"; message: string; severity: number }[] = []

  if (security.is_honeypot === "1") {
    issues.push({ type: "error", message: "HONEYPOT DETECTED - DO NOT BUY", severity: 10 })
  } else if (security.is_honeypot === "0") {
    issues.push({ type: "info", message: "Not a honeypot - trading is possible", severity: 0 })
  }

  if (security.is_open_source === "1") {
    issues.push({ type: "info", message: "Contract source code is verified", severity: 0 })
  } else if (security.is_open_source === "0") {
    issues.push({ type: "warning", message: "Contract source code is NOT verified", severity: 3 })
  }

  if (security.is_proxy === "1") {
    issues.push({ type: "warning", message: "Proxy contract - code can be changed", severity: 4 })
  }

  if (security.is_mintable === "1") {
    issues.push({ type: "warning", message: "Owner can mint new tokens - supply can increase", severity: 3 })
  } else if (security.is_mintable === "0") {
    issues.push({ type: "info", message: "No mint function - fixed supply", severity: 0 })
  }

  if (security.can_take_back_ownership === "1") {
    issues.push({ type: "error", message: "Owner can reclaim ownership after renouncing", severity: 5 })
  }

  if (security.owner_change_balance === "1") {
    issues.push({ type: "error", message: "Owner can modify token balances", severity: 5 })
  }

  if (security.hidden_owner === "1") {
    issues.push({ type: "error", message: "Hidden owner detected", severity: 5 })
  }

  if (security.is_blacklisted === "1") {
    issues.push({ type: "error", message: "Blacklist function - can block addresses from trading", severity: 4 })
  }

  if (security.is_whitelisted === "1") {
    issues.push({ type: "warning", message: "Whitelist function detected", severity: 2 })
  }

  if (security.can_not_sell_all === "1") {
    issues.push({ type: "error", message: "Cannot sell all tokens - selling restrictions", severity: 5 })
  }

  if (security.trading_cooldown === "1") {
    issues.push({ type: "warning", message: "Trading cooldown enabled", severity: 2 })
  }

  if (security.transfer_pausable === "1") {
    issues.push({ type: "warning", message: "Transfers can be paused by owner", severity: 3 })
  }

  if (security.is_anti_whale === "1") {
    issues.push({ type: "info", message: "Anti-whale mechanism in place", severity: 1 })
  }

  const buyTax = security.buy_tax ? Number.parseFloat(security.buy_tax) * 100 : 0
  const sellTax = security.sell_tax ? Number.parseFloat(security.sell_tax) * 100 : 0

  if (buyTax > 10 || sellTax > 10) {
    issues.push({
      type: "error",
      message: `High taxes: Buy ${buyTax.toFixed(1)}% / Sell ${sellTax.toFixed(1)}%`,
      severity: 4,
    })
  } else if (buyTax > 0 || sellTax > 0) {
    issues.push({
      type: "warning",
      message: `Trading taxes: Buy ${buyTax.toFixed(1)}% / Sell ${sellTax.toFixed(1)}%`,
      severity: 2,
    })
  } else {
    issues.push({ type: "info", message: "No trading taxes", severity: 0 })
  }

  if (security.external_call === "1") {
    issues.push({ type: "warning", message: "Contract makes external calls", severity: 2 })
  }

  if (security.selfdestruct === "1") {
    issues.push({ type: "error", message: "Contract can self-destruct", severity: 5 })
  }

  return {
    issues,
    buyTax: `${buyTax.toFixed(1)}%`,
    sellTax: `${sellTax.toFixed(1)}%`,
    isVerified: security.is_open_source === "1",
    isRenounced: security.owner_address === "0x0000000000000000000000000000000000000000",
    ownerAddress: security.owner_address,
    creatorAddress: security.creator_address,
    totalSupply: security.total_supply,
    holderCount: security.holder_count,
    lpHolderCount: security.lp_holder_count,
    holders: security.holders || [],
    lpHolders: security.lp_holders || [],
    tokenName: security.token_name,
    tokenSymbol: security.token_symbol,
  }
}

function calculateTrustScore(issues: { type: string; severity: number }[]) {
  let score = 100

  issues.forEach((issue) => {
    if (issue.type === "error") score -= issue.severity * 5
    else if (issue.type === "warning") score -= issue.severity * 2
  })

  return Math.max(0, Math.min(100, Math.round(score)))
}

function isValidAddress(address: string, chain: string): boolean {
  if (chain === "solana") {
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)
  }
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export async function POST(request: NextRequest) {
  try {
    const { address, chain } = await request.json()

    if (!address || !chain) {
      return NextResponse.json({ error: "Address and chain are required" }, { status: 400 })
    }

    const chainConfig = chainConfigs[chain]
    if (!chainConfig) {
      return NextResponse.json({ error: "Unsupported chain" }, { status: 400 })
    }

    const cleanAddress = address.trim()

    if (!isValidAddress(cleanAddress, chain)) {
      return NextResponse.json(
        {
          error: `Invalid ${chainConfig.name} address format. ${chain === "solana" ? "Solana addresses are base58 encoded." : "EVM addresses should start with 0x and be 40 characters."}`,
        },
        { status: 400 },
      )
    }

    console.log(`[v0] Scanning token ${cleanAddress} on ${chain}`)

    const [dexData, securityData, ethplorerData, blockscoutData] = await Promise.all([
      fetchDexScreenerData(cleanAddress, chain),
      chain !== "solana" ? fetchGoPlusSecurityData(cleanAddress, chainConfig.goPlusChain) : null,
      chain === "ethereum" ? fetchEthplorerData(cleanAddress) : null,
      ["ethereum", "polygon", "base", "arbitrum", "optimism"].includes(chain)
        ? fetchBlockscoutData(cleanAddress, chain)
        : null,
    ])

    let tokenName = "Unknown"
    let tokenSymbol = "???"
    let tokenData: any = null

    // Priority: GoPlus security data > DEXScreener > Ethplorer > Blockscout
    if (securityData?.token_name && securityData?.token_symbol) {
      tokenName = securityData.token_name
      tokenSymbol = securityData.token_symbol
      console.log(`[v0] Using GoPlus token info: ${tokenName} (${tokenSymbol})`)
    }

    // Determine best data source for market data
    if (dexData) {
      tokenData = dexData
      if (tokenName === "Unknown") {
        tokenName = dexData.name
        tokenSymbol = dexData.symbol
      }
    } else if (ethplorerData) {
      tokenData = ethplorerData
      if (tokenName === "Unknown") {
        tokenName = ethplorerData.name
        tokenSymbol = ethplorerData.symbol
      }
    } else if (blockscoutData) {
      tokenData = blockscoutData
      if (tokenName === "Unknown") {
        tokenName = blockscoutData.name
        tokenSymbol = blockscoutData.symbol
      }
    }

    if (!tokenData && !securityData) {
      return NextResponse.json(
        {
          error: `Token not found on ${chainConfig.name}. Make sure:\n1. The address is correct\n2. You selected the correct blockchain\n3. The token contract exists on this chain`,
        },
        { status: 404 },
      )
    }

    // Process security data
    let securityInfo = null
    let issues: { type: "error" | "warning" | "info"; message: string; severity: number }[] = []

    if (securityData) {
      securityInfo = processSecurityData(securityData)
      issues = securityInfo.issues
    } else {
      issues = [
        { type: "warning", message: "Limited security analysis available", severity: 2 },
        {
          type: "info",
          message: `Token found via ${dexData ? "DEXScreener" : ethplorerData ? "Ethplorer" : "Blockscout"}`,
          severity: 0,
        },
      ]
    }

    const trustScore = calculateTrustScore(issues)

    // Process holder data
    const holders =
      securityInfo?.holders?.slice(0, 10).map((h: any) => ({
        address: `${h.address.slice(0, 6)}...${h.address.slice(-4)}`,
        fullAddress: h.address,
        percentage: (Number.parseFloat(h.percent) * 100).toFixed(2),
        isContract: h.is_contract === 1,
        isLocked: h.is_locked === 1,
        tag: h.tag || null,
      })) || []

    // Calculate contract age
    let contractAge = "Unknown"
    if (dexData?.pairCreatedAt) {
      const createdDate = new Date(dexData.pairCreatedAt)
      const now = new Date()
      const diffDays = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24))
      contractAge =
        diffDays > 365
          ? `${Math.floor(diffDays / 365)} year(s)`
          : diffDays > 30
            ? `${Math.floor(diffDays / 30)} month(s)`
            : `${diffDays} days`
    }

    return NextResponse.json({
      name: tokenName,
      symbol: tokenSymbol,
      address: cleanAddress,
      chain: chainConfig.name,
      chainId: chain,
      tokenStandard: chainConfig.tokenStandard,
      trustScore,
      securityIssues: issues.map((i) => ({ type: i.type, message: i.message })),
      holders,
      liquidity: dexData?.liquidity || "N/A",
      marketCap: tokenData?.marketCap || "N/A",
      fdv: dexData?.fdv || "N/A",
      price: tokenData?.price || "N/A",
      priceChange24h: tokenData?.priceChange24h || 0,
      volume24h: tokenData?.volume24h || "N/A",
      totalSupply: securityInfo?.totalSupply
        ? Number(securityInfo.totalSupply).toLocaleString()
        : ethplorerData?.totalSupply
          ? Number(ethplorerData.totalSupply).toLocaleString()
          : "N/A",
      circulatingSupply: "N/A",
      contractAge,
      transactions24h: dexData?.transactions24h || 0,
      buys24h: dexData?.buys24h || 0,
      sells24h: dexData?.sells24h || 0,
      uniqueHolders: securityInfo?.holderCount || ethplorerData?.holdersCount || blockscoutData?.holdersCount || "N/A",
      buyTax: securityInfo?.buyTax || "N/A",
      sellTax: securityInfo?.sellTax || "N/A",
      isVerified: securityInfo?.isVerified ?? ethplorerData?.isVerified ?? blockscoutData?.isVerified ?? null,
      isRenounced: securityInfo?.isRenounced ?? null,
      ownerAddress: securityInfo?.ownerAddress || null,
      liquidityLocked: null,
      explorerUrl:
        chain === "solana"
          ? `https://solscan.io/token/${cleanAddress}`
          : `https://${chainConfig.explorer}/token/${cleanAddress}`,
      dexScreenerUrl: dexData?.url || null,
      dexId: dexData?.dexId || null,
      pairAddress: dexData?.pairAddress || null,
      dataSource: dexData ? "DEXScreener" : ethplorerData ? "Ethplorer" : blockscoutData ? "Blockscout" : "GoPlus",
    })
  } catch (error) {
    console.error("[v0] Token scan error:", error)
    return NextResponse.json({ error: "Failed to scan token. Please try again." }, { status: 500 })
  }
}
