"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {  Menu, X } from "lucide-react"
import { ConnectWalletButton } from "./connect-wallet-button"

// Navbar component definition
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700/50 backdrop-blur-lg">
      <div className=" flex h-16 justify-between px-4 md:px-6 w-full">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">U</div>
            </div>
            <span className="hidden font-bold text-xl text-white md:inline-block">UIswap</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ConnectWalletButton />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
    </header>
  )
}
