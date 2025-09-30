"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, Search, TrendingUp } from "lucide-react"
import { useTokenContext, type Token } from "./token-provider"

// Props for the TokenSelector component
interface TokenSelectorProps {
  selectedToken: Token
  onSelectToken: (token: Token) => void
  otherToken: Token
}

export function TokenSelector({ selectedToken, onSelectToken, otherToken }: TokenSelectorProps) {
  const { tokens } = useTokenContext()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTokens = tokens.filter(
    (token) =>
      token.id !== otherToken.id &&
      (token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-slate-600 border-slate-500 hover:bg-slate-500 hover:border-slate-400 text-white"
      >
        <img src={selectedToken.logo || "/placeholder.svg"} alt={selectedToken.name} className="h-5 w-5 rounded-full" />
        <span>{selectedToken.symbol}</span>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-slate-800 text-white border-slate-700">
          <DialogHeader>
            <DialogTitle>Select a token</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search name or paste address"
              className="pl-9 bg-slate-700 border-slate-600 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 my-2">
            {tokens.slice(0, 4).map((token) => (
              <Button
                key={token.id}
                variant="outline"
                className={`flex items-center gap-2 ${
                  token.id === otherToken.id
                    ? "opacity-50 cursor-not-allowed bg-slate-700 border-slate-600"
                    : "bg-slate-700 border-slate-600 hover:bg-slate-600"
                }`}
                onClick={() => {
                  if (token.id !== otherToken.id) {
                    onSelectToken(token)
                    setIsOpen(false)
                  }
                }}
                disabled={token.id === otherToken.id}
              >
                <img src={token.logo || "/placeholder.svg"} alt={token.name} className="h-4 w-4 rounded-full" />
                <span>{token.symbol}</span>
              </Button>
            ))}
          </div>
          <ScrollArea className="h-60">
            <div className="space-y-1 p-1">
              {filteredTokens.map((token) => (
                <Button
                  key={token.id}
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-slate-700"
                  onClick={() => {
                    onSelectToken(token)
                    setIsOpen(false)
                  }}
                >
                  <div className="flex items-center w-full">
                    <img
                      src={token.logo || "/placeholder.svg"}
                      alt={token.name}
                      className="h-8 w-8 rounded-full mr-3"
                    />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{token.symbol}</span>
                      <span className="text-xs text-slate-400">{token.name}</span>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                      <div className="flex items-center text-xs">
                        <TrendingUp className="h-3 w-3 mr-1 text-green-400" />
                        <span className="text-green-400">+{(Math.random() * 5).toFixed(2)}%</span>
                      </div>
                      <span className="font-medium">{token.balance.toFixed(4)}</span>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}

// End of token-selector.tsx
