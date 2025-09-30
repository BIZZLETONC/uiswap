"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useConnect, useDisconnect, useAccount, useBalance, useChainId, useSwitchChain } from "wagmi"
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains"
import { toast } from "@/components/ui/use-toast"
import { Copy, ExternalLink, LogOut } from "lucide-react"

interface WalletConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  view: "connect" | "account" | "network"
}

export function WalletConnectionModal({ isOpen, onClose, view }: WalletConnectionModalProps) {
  const { connectors, connect, isPending, error } = useConnect()
  // Commit 13: Added a comment to the WalletConnectionModal component.
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()
  const { data: balanceData } = useBalance({ address })
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const networks = [
    { ...mainnet, icon: "https://www.citypng.com/public/uploads/preview/ethereum-eth-round-logo-icon-png-701751694969815akblwl2552.png" },
    { ...polygon, icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-UjZYpTKlVQWhKF3Sf3camP-rCTZ_OZnqcA&s" },
    { ...optimism, icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqidBq62tBzMjwxpb9WljM3BuKe6oEHzbJ6Q&s" },
    { ...arbitrum, icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6mQ1pwxVT3lqCTZWhuUZzKTOqT0ZmYh2oeg&s" },
  ]

  // Format address for display
  const formatAddress = (address?: string) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Copy address to clipboard
  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  // View on Etherscan
  const viewOnEtherscan = () => {
    if (address) {
      window.open(`https://etherscan.io/address/${address}`, "_blank")
    }
  }

  // Handle connection errors
  if (error) {
    toast({
      title: "Connection Error",
      description: error.message,
      variant: "destructive",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-slate-800 text-white border-slate-700">
        {view === "connect" && (
          <>
            <DialogHeader>
              <DialogTitle>Connect a Wallet</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {connectors.map((connector) => (
                <Button
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                  disabled={isPending}
                  className="flex justify-between items-center w-full bg-slate-700 hover:bg-slate-600"
                >
                  <span>{connector.name}</span>
                  <img
                    src={
                      connector.name.toLowerCase().includes("metamask")
                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ymr3UNKopfI0NmUY95Dr-0589vG-91KuAA&s"
                        : connector.name.toLowerCase().includes("coinbase")
                          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVGFrvFc94KMgF2467-SSZX5g0mZwOgwm_Rg&s"
                          : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                    }
                    alt={connector.name}
                    className="h-6 w-6"
                  />
                </Button>
              ))}
            </div>
          </>
        )}

        {view === "account" && isConnected && (
          <>
            <DialogHeader>
              <DialogTitle>Account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <img src="/classic-leather-wallet.png" alt="Wallet" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">{formatAddress(address)}</p>
                    <p className="text-sm font-medium">
                      {balanceData?.formatted.slice(0, 6)} {balanceData?.symbol}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-slate-700 border-slate-600 hover:bg-slate-600 text-white"
                  onClick={copyAddress}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Address
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-slate-700 border-slate-600 hover:bg-slate-600 text-white"
                  onClick={viewOnEtherscan}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View on Etherscan
                </Button>
              </div>

              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  disconnect()
                  onClose()
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            </div>
          </>
        )}

        {view === "network" && (
          <>
            <DialogHeader>
              <DialogTitle>Switch Network</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {networks.map((network) => (
                <Button
                  key={network.id}
                  onClick={() => {
                    switchChain({ chainId: network.id })
                    onClose()
                  }}
                  className={`flex justify-between items-center w-full ${
                    network.id === chainId ? "bg-purple-600 hover:bg-purple-700" : "bg-slate-700 hover:bg-slate-600"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 999,
                        overflow: "hidden",
                        marginRight: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        alt={network.name}
                        src={network.icon || "/placeholder.svg"}
                        style={{ width: 16, height: 16 }}
                      />
                    </div>
                    {network.name}
                  </div>
                  {network.id === chainId && <div className="h-2 w-2 rounded-full bg-green-400"></div>}
                </Button>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
