"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"
import { Plus, Trash2, Edit, Building2 } from "lucide-react"
import Link from "next/link"

// Simple role check - in production, use proper auth/session
function useUserRole() {
  const [role, setRole] = useState<string>("organizer")
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("userRole") || "organizer"
      setRole(storedRole)
    }
  }, [])
  
  return role
}

export default function SponsorDashboard() {
  const router = useRouter()
  const userRole = useUserRole()
  const queryClient = useQueryClient()

  // Check if user is a sponsor - if not, redirect
  useEffect(() => {
    if (userRole !== "sponsor") {
      router.push("/")
    }
  }, [userRole, router])

  // Fetch sponsor postings
  const { data: postingsData, isLoading } = useQuery({
    queryKey: ["sponsor-postings", "my-postings"],
    queryFn: async () => {
      const response = await fetch("/api/sponsor-postings")
      if (!response.ok) throw new Error("Failed to fetch sponsor postings")
      return response.json()
    },
  })

  const deletePostingMutation = useMutation({
    mutationFn: async (postingId: string) => {
      const response = await fetch(`/api/sponsor-postings/${postingId}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete posting")
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sponsor-postings"] })
    },
  })

  const handleDeletePosting = (postingId: string, postingTitle: string) => {
    if (confirm(`Are you sure you want to delete "${postingTitle}"? This action cannot be undone.`)) {
      deletePostingMutation.mutate(postingId)
    }
  }

  if (userRole !== "sponsor") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground">This page is only available to sponsors.</p>
        </div>
      </div>
    )
  }

  const postings = postingsData?.postings || []

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Sponsor Dashboard</h1>
              <p className="text-muted-foreground">Manage your sponsorship postings and offers</p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">My Sponsor Postings</h2>
              <Link
                href="/post-sponsor"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <Plus size={16} />
                Post New Sponsor Offer
              </Link>
            </div>

            {/* Postings List */}
            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading postings...</div>
            ) : postings.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <Building2 size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">You haven't posted any sponsorship offers yet</p>
                <Link
                  href="/post-sponsor"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <Plus size={16} />
                  Post Your First Sponsor Offer
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {postings.map((posting: any) => (
                  <div
                    key={posting.id}
                    className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow relative group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Link href={`/sponsors/${posting.id}`} className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{posting.title}</h3>
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          handleDeletePosting(posting.id, posting.title)
                        }}
                        disabled={deletePostingMutation.isPending}
                        className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors disabled:opacity-50 flex-shrink-0"
                        title="Delete posting"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <Link href={`/sponsors/${posting.id}`} className="block">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Building2 size={14} />
                        <span className="line-clamp-1">{posting.companyName}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {posting.shortDescription || posting.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="capitalize">{posting.sponsorType}</span>
                        <span>{new Date(posting.createdAt).toLocaleDateString()}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

