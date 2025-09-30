"use client"

import { useState } from "react"
import { useConnect, useDisconnect } from "wagmi"

export function useWalletConnection() {
  // Commit 16: Added a comment to the useWalletConnection hook.
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalView, setModalView] = useState<"connect" | "account" | "network">("connect")
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const openConnectModal = () => {
    setModalView("connect")
    setIsModalOpen(true)
  }

  const openAccountModal = () => {
    setModalView("account")
    setIsModalOpen(true)
  }

  const openChainModal = () => {
    setModalView("network")
    setIsModalOpen(true)
  }

  return {
    openConnectModal,
    openAccountModal,
    openChainModal,
    isModalOpen,
    setIsModalOpen,
    modalView,
    setModalView,
    connect,
    connectors,
    disconnect,
  }
}
