"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"

const slides = [
  {
    src: "https://images.unsplash.com/photo-1615982513414-d287e6b70ad6?auto=format&fit=crop&w=1920&q=80",
    alt: "Orangutan perched on a tree branch in the Borneo rainforest",
  },
  {
    src: "https://images.unsplash.com/photo-1571386195942-dfb9db1e17d9?auto=format&fit=crop&w=1920&q=80",
    alt: "Orangutan mother and infant in the forest canopy",
  },
  {
    src: "https://images.unsplash.com/photo-1727100828954-8759b3e98d21?auto=format&fit=crop&w=1920&q=80",
    alt: "Orangutan hanging from a branch in Sumatra forest",
  },
  {
    src: "https://images.unsplash.com/photo-1685108305105-d76aa2aa38f7?auto=format&fit=crop&w=1920&q=80",
    alt: "Young orangutan clinging to a tree branch",
  },
  {
    src: "https://images.unsplash.com/photo-1701289870791-594cf2ce0448?auto=format&fit=crop&w=1920&q=80",
    alt: "Aerial view of a river winding through the Borneo rainforest",
  },
]

export default function HeroBackground() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)

  const advance = useCallback(() => {
    setCurrent((c) => {
      setPrev(c)
      return (c + 1) % slides.length
    })
  }, [])

  useEffect(() => {
    const id = setInterval(advance, 5500)
    return () => clearInterval(id)
  }, [advance])

  return (
    <div className="absolute inset-0">
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : i === prev ? 0 : 0 }}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient overlay — lightened so images show through */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0804]/60 via-[#0C0804]/30 to-[#0C0804]/75 z-10" />

      {/* Atmospheric glow orbs */}
      <div className="absolute top-[30%] left-[15%] w-96 h-96 bg-[#E85A00] rounded-full blur-[140px] orb-brand pointer-events-none z-10" />
      <div className="absolute bottom-[25%] right-[18%] w-64 h-64 bg-[#F4A030] rounded-full blur-[100px] orb-amber pointer-events-none z-10" />

      {/* Slide dots */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrev(current); setCurrent(i) }}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-400 ${
              i === current
                ? "w-7 bg-[#E85A00]"
                : "w-1.5 bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
