'use client'

import { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'

interface Particle {
  id: number
  size: number
  x: number
  y: number
  color: string
  dur: number
  delay: number
  animIndex: number
}

export default function BobaParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  const particles: Particle[] = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        size: 8 + Math.random() * 18,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color:
          i % 3 === 0 ? '#8b5ccc' : i % 3 === 1 ? '#f4a4c0' : '#f5e8a0',
        dur: 5 + Math.random() * 7,
        delay: Math.random() * 5,
        animIndex: i % 4,
      })),
    []
  )

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll('.boba-particle')
    if (!els) return

    const ctx = gsap.context(() => {
      els.forEach((el, i) => {
        const p = particles[i]
        gsap.to(el, {
          x: (i % 2 === 0 ? 1 : -1) * (12 + Math.random() * 20),
          y: -(14 + Math.random() * 24),
          duration: p.dur,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: p.delay,
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [particles])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="boba-particle"
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            opacity: 0.1,
          }}
        />
      ))}
    </div>
  )
}
