'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface LeafProps {
  style?: React.CSSProperties
  size?: number
  color?: string
  rotate?: number
  flip?: boolean
  opacity?: number
  animate?: boolean
}

export default function Leaf({
  style,
  size = 80,
  color = '#6aab5e',
  rotate = 0,
  flip = false,
  opacity = 0.7,
  animate = true,
}: LeafProps) {
  const leafRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!animate || !leafRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(leafRef.current, {
        rotation: rotate + 4,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: 'bottom center',
        delay: Math.random() * 2,
      })
    })

    return () => ctx.revert()
  }, [animate, rotate])

  return (
    <svg
      ref={leafRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 140"
      width={size}
      height={size * 1.4}
      style={{
        position: 'absolute',
        opacity,
        pointerEvents: 'none',
        zIndex: 0,
        transform: `rotate(${rotate}deg) scaleX(${flip ? -1 : 1})`,
        ...style,
      }}
    >
      <path
        d="M50 130 C20 90 5 50 30 20 C45 5 55 5 70 20 C95 50 80 90 50 130Z"
        fill={color}
      />
      <path
        d="M50 130 C50 90 50 50 50 20"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M50 80 C35 70 25 60 30 50"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M50 80 C65 70 75 60 70 50"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
}
