"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useAccount, useChainId } from "wagmi"
import { WalletConnectionModal } from "./wallet-connection-modal"
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains"

// ConnectWalletButton component handles wallet connection UI
export function ConnectWalletButton() {
  const [mounted, setMounted] = useState(false)
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalView, setModalView] = useState<"connect" | "account" | "network">("connect")

  // Get current chain info
  const chains = [mainnet, polygon, optimism, arbitrum]
  const currentChain = chains.find((chain) => chain.id === chainId) || mainnet

  useEffect(() => {
    setMounted(true)
  }, [])

  const openConnectModal = () => {
    setModalView("connect")
    setIsModalOpen(true)
  }

  const openAccountModal = () => {
    setModalView("account")
    setIsModalOpen(true)
  }

  const openNetworkModal = () => {
    setModalView("network")
    setIsModalOpen(true)
  }

  if (!mounted) {
    return (
      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg">
        <Wallet className="h-5 w-5 mr-2" />
        Connect Wallet
      </Button>
    )
  }

  if (!isConnected) {
    return (
      <>
        <button
          onClick={openConnectModal}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-purple-500/20"
        >
          <Wallet className="h-5 w-5" />
          <span className="font-medium">Connect Wallet</span>
        </button>

        <WalletConnectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} view={modalView} />
      </>
    )
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={openNetworkModal}
          className="bg-slate-700 border border-slate-600 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-all duration-200"
        >
          {currentChain.name}
        </button>

        <button
          onClick={openAccountModal}
          className="bg-slate-700 border border-slate-600 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all duration-200"
        >
          <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"></div>
          <span>
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </button>
      </div>

      <WalletConnectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} view={modalView} />
    </>
  )
}

// End of connect-wallet-button.tsx
