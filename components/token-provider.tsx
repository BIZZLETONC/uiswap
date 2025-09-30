"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Interface for a single token
export interface Token {
  id: string
  name: string
  symbol: string
  logo: string
  balance: number
  price: number
}

interface TokenContextType {
  tokens: Token[]
  addToken: (token: Token) => void
  removeToken: (id: string) => void
}

const TokenContext = createContext<TokenContextType | undefined>(undefined)

export function TokenProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokens] = useState<Token[]>([
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      logo: "https://www.citypng.com/public/uploads/preview/ethereum-eth-round-logo-icon-png-701751694969815akblwl2552.png",
      balance: 1.234,
      price: 3500,
    },
    {
      id: "usd-coin",
      name: "USD Coin",
      symbol: "USDC",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbBMfDxr1PrxlKVnOBktTGlNgXSVYUT0LB7Q&s",
      balance: 2500,
      price: 1,
    },
    {
      id: "uiswap",
      name: "UIswap",
      symbol: "UIS",
      logo: "/icon.png",
      balance: 1000,
      price: 2.5,
    },
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
      balance: 0.05,
      price: 65000,
    },
    {
      id: "cardano",
      name: "Cardano",
      symbol: "ADA",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmgltrrU531rdPFGKEZkVSKuFHKKoM5GMFhQ&s",
      balance: 1500,
      price: 0.45,
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsIsJL3zRgUrkD3yE3lD7LK0wZWSiRyY1GVg&s",
      balance: 25,
      price: 150,
    },
    {
      id: "polkadot",
      name: "Polkadot",
      symbol: "DOT",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQfy_UnBnPrqfM3qtVAT12pMMRpZ6P05M6vg&s",
      balance: 100,
      price: 6.8,
    },
    {
      id: "chainlink",
      name: "Chainlink",
      symbol: "LINK",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQfRAsYsjdu8rl1c4NrM76ebWjKDuzwrKn9g&s",
      balance: 75,
      price: 15.2,
    },
  ])

  const addToken = (token: Token) => {
    setTokens((prev) => [...prev, token])
  }

  const removeToken = (id: string) => {
    setTokens((prev) => prev.filter((token) => token.id !== id))
  }

  return <TokenContext.Provider value={{ tokens, addToken, removeToken }}>{children}</TokenContext.Provider>
}

export function useTokenContext() {
  const context = useContext(TokenContext)
  if (context === undefined) {
    throw new Error("useTokenContext must be used within a TokenProvider")
  }
  return context
}
// End of token-provider.tsx
