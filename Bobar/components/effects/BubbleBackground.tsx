'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function BubbleBackground() {
  const containerRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const blobs = containerRef.current?.querySelectorAll('.bg-blob')
    if (!blobs) return

    const ctx = gsap.context(() => {
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          scale: 1.06 + i * 0.01,
          rotation: (i % 2 === 0 ? 1 : -1) * (4 + i),
          duration: 7 + i * 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          transformOrigin: 'center center',
          delay: i * 0.8,
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={containerRef}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 900"
    >
      <defs>
        <filter id="blobBlur">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>
      <g filter="url(#blobBlur)">
        <ellipse className="bg-blob" cx="200" cy="160" rx="220" ry="200" fill="#8b5ccc" opacity="0.16" transform="rotate(-20 200 160)" />
        <ellipse className="bg-blob" cx="1280" cy="200" rx="180" ry="220" fill="#f4a4c0" opacity="0.16" transform="rotate(15 1280 200)" />
        <ellipse className="bg-blob" cx="750" cy="500" rx="260" ry="230" fill="#8b5ccc" opacity="0.10" transform="rotate(10 750 500)" />
        <ellipse className="bg-blob" cx="100" cy="620" rx="160" ry="180" fill="#f4a4c0" opacity="0.13" transform="rotate(-30 100 620)" />
        <ellipse className="bg-blob" cx="1360" cy="660" rx="200" ry="160" fill="#8b5ccc" opacity="0.11" transform="rotate(25 1360 660)" />
        <ellipse className="bg-blob" cx="600" cy="820" rx="140" ry="120" fill="#f4a4c0" opacity="0.09" transform="rotate(0 600 820)" />
        <ellipse className="bg-blob" cx="960" cy="100" rx="100" ry="90" fill="#f4a4c0" opacity="0.10" transform="rotate(5 960 100)" />
        <ellipse className="bg-blob" cx="400" cy="400" rx="80" ry="80" fill="#8b5ccc" opacity="0.07" transform="rotate(0 400 400)" />
      </g>
    </svg>
  )
}
