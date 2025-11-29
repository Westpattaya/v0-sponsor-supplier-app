"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const [isDragging, setIsDragging] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  // Add enhanced drag interaction with CSS
  useEffect(() => {
    const calendar = calendarRef.current
    if (!calendar) return

    let dragStart: HTMLButtonElement | null = null

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const button = target.closest('button[role="gridcell"]') as HTMLButtonElement
      if (button && !button.disabled && !button.hasAttribute("aria-disabled")) {
        dragStart = button
        setIsDragging(true)
        button.classList.add("drag-start")
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragStart) return
      const target = e.target as HTMLElement
      const button = target.closest('button[role="gridcell"]') as HTMLButtonElement
      if (button && !button.disabled && !button.hasAttribute("aria-disabled")) {
        // Remove previous hover classes
        calendar.querySelectorAll(".drag-hover").forEach((el) => {
          el.classList.remove("drag-hover")
        })
        button.classList.add("drag-hover")
      }
    }

    const handleMouseUp = () => {
      if (dragStart && isDragging) {
        const hovered = calendar.querySelector(".drag-hover") as HTMLButtonElement
        if (hovered && hovered !== dragStart) {
          // Click the hovered button to select it
          hovered.click()
        }
        dragStart.classList.remove("drag-start")
        calendar.querySelectorAll(".drag-hover").forEach((el) => {
          el.classList.remove("drag-hover")
        })
      }
      setIsDragging(false)
      dragStart = null
    }

    calendar.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      calendar.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  // Add dynamic styles for drag interaction
  useEffect(() => {
    const styleId = "calendar-drag-styles"
    if (document.getElementById(styleId)) return

    const style = document.createElement("style")
    style.id = styleId
    style.textContent = `
      button[role="gridcell"].drag-start {
        background-color: hsl(var(--primary) / 0.5) !important;
        transform: scale(1.1) !important;
        z-index: 10;
        border-radius: 0.5rem;
      }
      button[role="gridcell"].drag-hover {
        background-color: hsl(var(--primary) / 0.3) !important;
        transform: scale(1.05) !important;
        transition: all 0.15s ease;
        border-radius: 0.5rem;
      }
      button[role="gridcell"]:not([aria-disabled="true"]):not(.rdp-day_selected):hover {
        background-color: hsl(var(--accent)) !important;
        transform: scale(1.05) !important;
        transition: all 0.15s ease;
      }
      button[role="gridcell"]:not([aria-disabled="true"]):active {
        transform: scale(0.95) !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      const existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
    }
  }, [])

  return (
    <div 
      ref={calendarRef} 
      className={cn("select-none", isDragging && "cursor-grabbing")}
    >
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 cursor-pointer transition-opacity"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100 transition-all duration-150 cursor-pointer"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground font-semibold",
          day_outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        }}
        {...props}
      />
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }


