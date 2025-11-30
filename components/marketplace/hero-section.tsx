"use client"

import { Search } from "lucide-react"
import { useState } from "react"

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="relative w-full bg-gradient-to-br from-muted/50 via-background to-muted/30 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-5 md:space-y-6">
          {/* Main Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
            เชื่อมโยงงานกับสปอนเซอร์
          </h1>

          {/* Sub-headline */}
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            แพลตฟอร์มที่ผู้จัดงานมหาวิทยาลัยหาสปอนเซอร์เพื่อให้งานของพวกเขาบรรลุผล
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-6 md:mt-8">
            <div className="relative">
              <div className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2">
                <Search className="text-muted-foreground" size={18} />
              </div>
              <input
                type="text"
                placeholder="ค้นหางานหรือสปอนเซอร์..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 md:pl-12 pr-28 md:pr-32 py-3 md:py-4 text-sm md:text-base border border-border rounded-full bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
              <button className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 px-4 md:px-6 py-1.5 md:py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-medium text-xs md:text-sm">
                ค้นหา
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

