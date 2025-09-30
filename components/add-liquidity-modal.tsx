"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TokenSelector } from "./token-selector"
import { useTokenContext } from "./token-provider"
import { Info, Plus } from "lucide-react"
import { toast } from "./ui/use-toast"

interface AddLiquidityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddLiquidityModal({ open, onOpenChange }: AddLiquidityModalProps) {
  const { tokens } = useTokenContext()
  // Commit 11: Added a comment to the AddLiquidityModal component.
  const [token0, setToken0] = useState(tokens[0])
  const [token1, setToken1] = useState(tokens[1])
  const [amount0, setAmount0] = useState("")
  const [amount1, setAmount1] = useState("")
  const [ratio, setRatio] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculate the ratio between tokens
  useEffect(() => {
    if (token0 && token1) {
      const newRatio = token0.price / token1.price
      setRatio(newRatio)

      // Update amount1 based on amount0 and the new ratio
      if (amount0 && !isNaN(Number.parseFloat(amount0))) {
        setAmount1((Number.parseFloat(amount0) / newRatio).toFixed(6))
      }
    }
  }, [token0, token1, amount0])

  const handleAmount0Change = (value: string) => {
    setAmount0(value)
    if (value && !isNaN(Number.parseFloat(value))) {
      setAmount1((Number.parseFloat(value) / ratio).toFixed(6))
    } else {
      setAmount1("")
    }
  }

  const handleAmount1Change = (value: string) => {
    setAmount1(value)
    if (value && !isNaN(Number.parseFloat(value))) {
      setAmount0((Number.parseFloat(value) * ratio).toFixed(6))
    } else {
      setAmount0("")
    }
  }

  const switchTokens = () => {
    setToken0(token1)
    setToken1(token0)
    setAmount0(amount1)
    setAmount1(amount0)
  }

  const handleAddLiquidity = async () => {
    if (!amount0 || !amount1) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Liquidity Added",
      description: `Added ${amount0} ${token0.symbol} and ${amount1} ${token1.symbol} to the pool`,
    })

    setIsSubmitting(false)
    onOpenChange(false)

    // Reset form
    setAmount0("")
    setAmount1("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-800 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle>Add Liquidity</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* First Token */}
          <div className="p-4 bg-slate-700 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-400">Token 1</span>
              <span className="text-sm text-slate-400">Balance: {token0?.balance.toFixed(4)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="0.0"
                value={amount0}
                onChange={(e) => handleAmount0Change(e.target.value)}
                className="bg-transparent border-none text-xl font-medium text-white focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              />
              <TokenSelector selectedToken={token0} onSelectToken={setToken0} otherToken={token1} />
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-slate-400 hover:text-white hover:bg-slate-600"
                  onClick={() => handleAmount0Change((token0.balance * 0.25).toFixed(6))}
                >
                  25%
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-slate-400 hover:text-white hover:bg-slate-600"
                  onClick={() => handleAmount0Change((token0.balance * 0.5).toFixed(6))}
                >
                  50%
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-slate-400 hover:text-white hover:bg-slate-600"
                  onClick={() => handleAmount0Change((token0.balance * 0.75).toFixed(6))}
                >
                  75%
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-slate-400 hover:text-white hover:bg-slate-600"
                  onClick={() => handleAmount0Change(token0.balance.toFixed(6))}
                >
                  Max
                </Button>
              </div>
              <span className="text-xs text-slate-400">
                ~${amount0 ? (Number.parseFloat(amount0) * token0?.price).toFixed(2) : "0.00"}
              </span>
            </div>
          </div>

          {/* Switch Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 bg-slate-800 border-slate-600 hover:bg-slate-700 hover:border-slate-500"
              onClick={switchTokens}
            >
              <Plus className="h-4 w-4 text-slate-400" />
            </Button>
          </div>

          {/* Second Token */}
          <div className="p-4 bg-slate-700 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-400">Token 2</span>
              <span className="text-sm text-slate-400">Balance: {token1?.balance.toFixed(4)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="0.0"
                value={amount1}
                onChange={(e) => handleAmount1Change(e.target.value)}
                className="bg-transparent border-none text-xl font-medium text-white focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              />
              <TokenSelector selectedToken={token1} onSelectToken={setToken1} otherToken={token0} />
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-slate-400 hover:text-white hover:bg-slate-600"
                  onClick={() => handleAmount1Change((token1.balance * 0.25).toFixed(6))}
                >
                  25%
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-slate-400 hover:text-white hover:bg-slate-600"
                  onClick={() => handleAmount1Change((token1.balance * 0.5).toFixed(6))}
                >
                  50%
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-slate-400 hover:text-white hover:bg-slate-600"
                  onClick={() => handleAmount1Change((token1.balance * 0.75).toFixed(6))}
                >
                  75%
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-slate-400 hover:text-white hover:bg-slate-600"
                  onClick={() => handleAmount1Change(token1.balance.toFixed(6))}
                >
                  Max
                </Button>
              </div>
              <span className="text-xs text-slate-400">
                ~${amount1 ? (Number.parseFloat(amount1) * token1?.price).toFixed(2) : "0.00"}
              </span>
            </div>
          </div>

          {/* Pool Information */}
          {amount0 && amount1 && (
            <div className="p-4 bg-slate-700/50 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Exchange Rate</span>
                <span className="text-sm text-white">
                  1 {token0.symbol} = {ratio.toFixed(6)} {token1.symbol}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Share of Pool</span>
                <span className="text-sm text-white">0.01%</span>
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="flex items-start gap-2 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
            <Info className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-300">
              When you add liquidity, you will receive pool tokens representing your position. These tokens
              automatically earn fees proportional to your share of the pool.
            </p>
          </div>

          {/* Add Liquidity Button */}
          <Button
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            disabled={!amount0 || !amount1 || isSubmitting}
            onClick={handleAddLiquidity}
          >
            {isSubmitting ? "Adding Liquidity..." : "Add Liquidity"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
