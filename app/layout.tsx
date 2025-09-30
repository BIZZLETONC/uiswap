import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./client-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UIswap - DeFi Token Swap",
  description: "A decentralized exchange for swapping tokens ",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  manifest: "/manifest.json",
  themeColor: "#a855f7",
    generator: 'v0.dev',
  // Commit 6: Adding a metadata comment.
}

export default function RootLayout() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        {/* Commit 7: Adding a head comment. */}
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className={inter.className}>
        <ClientLayout />
      </body>
    </html>
  )
}
