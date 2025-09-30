"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Info } from "lucide-react"

// Props for the SettingsDialog component
interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [slippage, setSlippage] = useState(0.5)
  const [deadline, setDeadline] = useState(20)
  const [expertMode, setExpertMode] = useState(false)
  const [multihops, setMultihops] = useState(true)
  const handleSlippageChange = (value: number[]) => {
    setSlippage(value[0])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-800 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle>Transaction Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-1">
                Slippage Tolerance
                <Info className="h-3.5 w-3.5 text-slate-400" />
              </Label>
              <span className="text-sm font-medium text-purple-400">{slippage}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Slider
                value={[slippage]}
                min={0.1}
                max={5}
                step={0.1}
                onValueChange={handleSlippageChange}
                className="flex-1"
              />
              <div className="relative w-16">
                <Input
                  type="number"
                  value={slippage}
                  onChange={(e) => setSlippage(Number.parseFloat(e.target.value) || 0.1)}
                  className="bg-slate-700 border-slate-600 text-white pr-6"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-400">%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-1">
                Transaction Deadline
                <Info className="h-3.5 w-3.5 text-slate-400" />
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={deadline}
                onChange={(e) => setDeadline(Number.parseInt(e.target.value) || 1)}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <span className="text-sm text-slate-400">minutes</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium flex items-center gap-1">
                  Expert Mode
                  <Info className="h-3.5 w-3.5 text-slate-400" />
                </Label>
                <p className="text-xs text-slate-400 mt-1">Allow high slippage trades and skip confirmation screen</p>
              </div>
              <Switch checked={expertMode} onCheckedChange={setExpertMode} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium flex items-center gap-1">
                  Multi-hop Trades
                  <Info className="h-3.5 w-3.5 text-slate-400" />
                </Label>
                <p className="text-xs text-slate-400 mt-1">Allow trades via multiple pools for better rates</p>
              </div>
              <Switch checked={multihops} onCheckedChange={setMultihops} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
