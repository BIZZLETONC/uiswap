"use client"

import { useAccount, useBalance, useChainId } from "wagmi"
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains"

// Hook to retrieve wallet-related information - updated
export function useWalletInfo() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { data: balanceData } = useBalance({
    address: address,
  })

  // Get current chain info
  const chains = [mainnet, polygon, optimism, arbitrum]
  const currentChain = chains.find((chain) => chain.id === chainId) || mainnet

  return {
    address: address || null,
    isConnected,
    chainId,
    chainName: currentChain.name || "Unknown Network",
    balance: balanceData ? balanceData.formatted : "0",
    symbol: balanceData ? balanceData.symbol : "ETH",
    chains,
  }
}
