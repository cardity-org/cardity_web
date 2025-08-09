"use client"

import { useEffect } from "react"

export default function ActiveSectionObserver() {
  useEffect(() => {
    const container = document.getElementById("docs-content") || document.body
    const headings = Array.from(
      container.querySelectorAll<HTMLElement>("h2, h3")
    )

    if (headings.length === 0) return

    const slugify = (text: string, fallbackIndex: number) => {
      const base = text
        .toLowerCase()
        .trim()
        .replace(/[\s]+/g, "-")
        .replace(/[^a-z0-9\-\u4e00-\u9fa5]/g, "")
      return base || `section-${fallbackIndex}`
    }

    // Ensure each heading has an id
    headings.forEach((h, idx) => {
      if (!h.id) h.id = slugify(h.innerText || h.textContent || "", idx)
    })

    let ticking = false
    const setHash = (id: string) => {
      // Avoid pushing history; replaceState keeps back button clean
      history.replaceState(null, "", `#${id}`)
    }

    const handler: IntersectionObserverCallback = (entries) => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).getBoundingClientRect().top -
              (b.target as HTMLElement).getBoundingClientRect().top
          )
        const current = (visible[0]?.target as HTMLElement) || null
        if (current && current.id) setHash(current.id)
        ticking = false
      })
    }

    const observer = new IntersectionObserver(handler, {
      root: null,
      rootMargin: "0px 0px -60% 0px",
      threshold: [0, 1],
    })

    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [])

  return null
}
