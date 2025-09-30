import { createConfig, http } from "wagmi"
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains"
import { injected } from "wagmi/connectors"

// Wagmi configuration for connecting to different chains and wallets
export const config = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
  connectors: [
    injected(),
  ],
})
