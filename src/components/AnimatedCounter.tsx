"use client"

import { useEffect, useRef, useState } from "react"

function parseValue(val: string) {
  const m = val.match(/^([^0-9]*)([0-9][0-9,.]*)(.*)/)
  if (!m) return null
  const n = parseFloat(m[2].replace(/,/g, ""))
  return isNaN(n) ? null : { pre: m[1], n, suf: m[3] }
}

export default function AnimatedCounter({
  value,
  className = "",
}: {
  value: string
  className?: string
}) {
  const [display, setDisplay] = useState(value)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const parsed = parseValue(value)
    if (!parsed) return
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        obs.disconnect()

        const dur = 1800
        const t0 = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - t0) / dur, 1)
          const v = Math.round((1 - (1 - p) ** 3) * parsed.n)
          setDisplay(`${parsed.pre}${v.toLocaleString()}${parsed.suf}`)
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
