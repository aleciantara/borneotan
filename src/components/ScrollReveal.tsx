"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
  delay?: number
}

export default function ScrollReveal({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()
        if (delay) {
          setTimeout(() => el.classList.add("is-visible"), delay)
        } else {
          el.classList.add("is-visible")
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  )
}
