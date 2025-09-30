# UIswap!

UIswap is a modern decentralized exchange (DEX) interface for swapping tokens on Ethereum and other EVM-compatible blockchains. Built with Next.js and RainbowKit, UIswap provides a clean, intuitive user interface for token swapping.

## Features

- **Token Swapping**: Easily swap between different tokens with a simple interface
- **Wallet Integration**: Connect with popular wallets via RainbowKit (MetaMask, Coinbase Wallet, etc.)
- **Portfolio Management**: Track your token holdings and transaction history
- **Multi-chain Support**: Compatible with Ethereum, Polygon, Optimism, and Arbitrum
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices

## Technologies

- **Frontend**: Next.js 15 (App Router), React 18
- **Styling**: Tailwind CSS, shadcn/ui components
- **Wallet Connection**: wagmi
- **State Management**: React Context API
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- A WalletConnect Project ID (for wallet connections)

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/..../uiswap.git
   cd uiswap
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Create a `.env.local` file in the root directory with your WalletConnect Project ID:
   \`\`\`
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
   \`\`\`

4. Start the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
uiswap/
├── app/                    # Next.js App Router and client-side layouts
│   ├── layout.tsx
│   ├── page.tsx
│   ├── client-layout.tsx
│   ├── globals.css
│   ├── pair/               # Token pair pages
│   ├── pools/              # Liquidity pools page
│   └── token/              # Token detail pages
├── components/             # React components
│   ├── ui/                 # UI components (shadcn/ui)
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── swap-interface.tsx
│   ├── token-selector.tsx
│   ├── token-provider.tsx
│   ├── connect-wallet-button.tsx
│   ├── settings-dialog.tsx
│   └── ...                 # Other components
├── config/                 # Configuration files
│   └── wagmi-config.ts
├── contexts/               # React context providers
│   └── wallet-context.tsx
├── hooks/                  # Custom React hooks
│   ├── use-wallet-info.ts
│   ├── use-wallet-connection.ts
│   └── use-mobile_del.tsx # Renamed from use-mobile.tsx
├── lib/                    # Utility functions
│   └── utils.ts
├── public/                 # Static assets (images and other assets)
│   └── ...
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Key Components

### Swap Interface

The main swap interface allows users to exchange tokens. It includes:
- Token selection
- Amount input
- Price information
- Slippage settings
- Transaction confirmation

### Wallet Connection

UIswap uses wagmi for wallet connections, with a custom WalletConnectionModal supporting:
- MetaMask
- WalletConnect
- And many other popular wallets

## Development

### Adding New Features

1. Create new components in the `components/` directory
2. Add new pages in the `app/` directory
3. Update context providers as needed

### Styling

UIswap uses Tailwind CSS for styling. The main theme colors and styles are defined in:
- `app/globals.css`
- `tailwind.config.ts`

### Adding New Tokens

To add new tokens, update the token list in `components/token-provider.tsx`.

## Deployment

### Vercel Deployment

The easiest way to deploy UIswap is using Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Set the environment variables (NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID)
4. Deploy

### Docker Deployment

You can also deploy UIswap using Docker:

1. Build the Docker image:
   \`\`\`bash
   docker build -t uiswap .
   \`\`\`

2. Run the container:
   \`\`\`bash
   docker run -p 3000:3000 -e NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here uiswap
   \`\`\`

## Testing

### Running Tests

To run the tests:

\`\`\`bash
npm test
# or
yarn test
\`\`\`

### Testing Wallet Connections

For testing wallet connections, you can use the following test wallets:

- MetaMask: Install the MetaMask browser extension and create a test account
- Coinbase Wallet: Install the Coinbase Wallet browser extension
- For other wallets, you can use their respective test environments

## Security

UIswap implements several security measures:

- All transactions require explicit user confirmation
- No private keys are stored in the application
- All connections are secured with HTTPS
- Smart contract interactions are validated before execution

## Performance Optimization

The application is optimized for performance:

- Code splitting for faster initial load
- Dynamic imports for components
- Memoization of expensive calculations
- Optimized images and assets
- Server-side rendering where appropriate

## Troubleshooting

### Common Issues

1. **Wallet Connection Issues**
   - Make sure your wallet is unlocked
   - Check that you're on the correct network
   - Try refreshing the page

2. **Transaction Failures**
   - Ensure you have enough funds for gas
   - Check slippage tolerance settings
   - Verify token approvals

3. **UI Display Issues**
   - Clear browser cache
   - Try a different browser
   - Check for browser extensions that might interfere

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add some new feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [wagmi](https://wagmi.sh/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [viem](https://viem.sh/)
- [TanStack Query](https://tanstack.com/query)

---

Made with ❤️ by the GMonchain Team
