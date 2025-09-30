import { createConfig, http } from "wagmi"
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains"
import { injected } from "wagmi/connectors"


export const config = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum],
  // Commit 14: Added a comment to the wagmi config file.
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
