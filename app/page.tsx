"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import DiscoveryScreen from "@/components/screens/discovery-screen"
import ProposalBoardScreen from "@/components/screens/proposal-board-screen"

type Screen = "discovery" | "proposals" | "profile"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("discovery")

  return (
    <div className="w-full h-screen bg-background flex flex-col">
      {currentScreen === "discovery" && <DiscoveryScreen />}
      {currentScreen === "proposals" && <ProposalBoardScreen />}
      <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  )
}
