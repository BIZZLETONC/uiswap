"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { config } from "@/config/wagmi-config"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TokenProvider } from "@/components/token-provider"
import { WalletProvider } from "@/contexts/wallet-context"
import dynamic from "next/dynamic"

// Import components dynamically to avoid SSR issues - updated
const SwapInterface = dynamic(() => import("@/components/swap-interface"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-md mx-auto h-[500px] bg-slate-800 border-slate-700 rounded-lg animate-pulse"></div>
  ),
})

const queryClient = new QueryClient()

export default function ClientLayout() {
  // Use client-side rendering for wallet connections to avoid SSR issues
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {mounted ? (
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
              <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-12">
                  <div className="grid grid-cols-1 gap-8">
                    <div className="flex items-center justify-center">
                      <Suspense
                        fallback={<div className="w-full max-w-md h-[500px] bg-slate-800 rounded-lg animate-pulse"></div>}
                      >
                        <TokenProvider>
                          <WalletProvider>
                            <SwapInterface />
                          </WalletProvider>
                        </TokenProvider>
                      </Suspense>
                    </div>
                  </div>
                </main>
                <Footer />
              </div>
              <Toaster />
          </QueryClientProvider>
        </WagmiProvider>
      ) : (
        // Simple loading state while client-side code initializes
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
      )}
    </>
  )
}

// End of client-layout.tsx
