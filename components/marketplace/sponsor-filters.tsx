"use client"

import { useState } from "react"
import { Filter, X, Search } from "lucide-react"

interface SponsorFiltersProps {
  onFilterChange: (filters: SponsorFilterState) => void
}

export interface SponsorFilterState {
  sponsorType: string[]
  category: string[]
  university: string[]
  budgetMin: string
  budgetMax: string
  deliverables: string[]
}

const sponsorTypes = [
  "Financial Sponsor",
  "Product Sponsor",
  "Service Sponsor",
  "Booth Sponsor",
  "Media Sponsor",
  "Technology Sponsor",
  "Food & Beverage Sponsor",
]

const categories = ["Concert", "University Event", "Conference", "Competition", "Festival", "Sport", "Charity", "Tech", "Music", "Art", "Corporate"]

const universities = [
  "Chulalongkorn University (จุฬาลงกรณ์มหาวิทยาลัย)",
  "Thammasat University (มหาวิทยาลัยธรรมศาสตร์)",
  "Kasetsart University (มหาวิทยาลัยเกษตรศาสตร์)",
  "Mahidol University (มหาวิทยาลัยมหิดล)",
  "Chiang Mai University (มหาวิทยาลัยเชียงใหม่)",
  "Khon Kaen University (มหาวิทยาลัยขอนแก่น)",
  "KMITL (สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง)",
  "KMUTT (มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี)",
  "Silpakorn University (มหาวิทยาลัยศิลปากร)",
  "Srinakharinwirot University (มหาวิทยาลัยศรีนครินทรวิโรฒ)",
  "King Mongkut's University of Technology North Bangkok (KMUTNB)",
  "Burapha University (มหาวิทยาลัยบูรพา)",
  "Prince of Songkla University (มหาวิทยาลัยสงขลานครินทร์)",
]

const deliverables = ["Logo placement", "Social media posts", "Booth space", "Product sampling", "VIP passes", "On-stage mention"]

export default function SponsorFilters({ onFilterChange }: SponsorFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<SponsorFilterState>({
    sponsorType: [],
    category: [],
    university: [],
    budgetMin: "",
    budgetMax: "",
    deliverables: [],
  })
  const [categorySearch, setCategorySearch] = useState("")
  const [universitySearch, setUniversitySearch] = useState("")

  const toggleFilter = (category: keyof SponsorFilterState, value: string) => {
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter((v) => v !== value)
          : [...prev[category], value],
      }
      onFilterChange(newFilters)
      return newFilters
    })
  }

  const clearFilters = () => {
    const emptyFilters: SponsorFilterState = {
      sponsorType: [],
      category: [],
      university: [],
      budgetMin: "",
      budgetMax: "",
      deliverables: [],
    }
    setFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  const hasActiveFilters =
    filters.sponsorType.length > 0 ||
    filters.category.length > 0 ||
    filters.university.length > 0 ||
    filters.deliverables.length > 0 ||
    filters.budgetMin !== "" ||
    filters.budgetMax !== ""

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-card hover:bg-muted transition-colors"
      >
        <Filter size={18} />
        <span className="text-sm font-medium">Filters</span>
        {hasActiveFilters && (
          <span className="px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
            {filters.sponsorType.length +
              filters.category.length +
              filters.university.length +
              filters.deliverables.length +
              (filters.budgetMin ? 1 : 0) +
              (filters.budgetMax ? 1 : 0)}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-96 bg-card border border-border rounded-xl shadow-lg z-50 p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Filter Sponsors</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                >
                  <X size={14} />
                  Clear all
                </button>
              )}
            </div>

            {/* Sponsor Type */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Sponsor Type</label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {sponsorTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.sponsorType.includes(type)}
                      onChange={() => toggleFilter("sponsorType", type)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Event Categories</label>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="text"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  placeholder="Search categories..."
                  className="w-full pl-9 pr-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories
                  .filter((cat) =>
                    categorySearch === "" || cat.toLowerCase().includes(categorySearch.toLowerCase())
                  )
                  .map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={filters.category.includes(cat)}
                        onChange={() => toggleFilter("category", cat)}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                      />
                      <span className="text-sm text-foreground">{cat}</span>
                    </label>
                  ))}
              </div>
            </div>

            {/* University */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Target Universities</label>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="text"
                  value={universitySearch}
                  onChange={(e) => setUniversitySearch(e.target.value)}
                  placeholder="Search universities..."
                  className="w-full pl-9 pr-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {universities
                  .filter((uni) =>
                    universitySearch === "" ||
                    uni.toLowerCase().includes(universitySearch.toLowerCase()) ||
                    uni.includes(universitySearch)
                  )
                  .map((uni) => (
                    <label
                      key={uni}
                      className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={filters.university.includes(uni)}
                        onChange={() => toggleFilter("university", uni)}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                      />
                      <span className="text-sm text-foreground">{uni}</span>
                    </label>
                  ))}
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Budget Range</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Min</label>
                  <input
                    type="text"
                    value={filters.budgetMin}
                    onChange={(e) => {
                      const newFilters = { ...filters, budgetMin: e.target.value }
                      setFilters(newFilters)
                      onFilterChange(newFilters)
                    }}
                    placeholder="$0"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Max</label>
                  <input
                    type="text"
                    value={filters.budgetMax}
                    onChange={(e) => {
                      const newFilters = { ...filters, budgetMax: e.target.value }
                      setFilters(newFilters)
                      onFilterChange(newFilters)
                    }}
                    placeholder="$100K"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Deliverables Offered</label>
              <div className="space-y-2">
                {deliverables.map((deliverable) => (
                  <label
                    key={deliverable}
                    className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.deliverables.includes(deliverable)}
                      onChange={() => toggleFilter("deliverables", deliverable)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">{deliverable}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

