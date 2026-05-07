'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const links = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/find-us', label: 'Find Us' },
]

export default function Nav() {
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate nav in on load
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.2,
      })

      // Shrink nav on scroll
      ScrollTrigger.create({
        start: 40,
        onEnter: () => {
          gsap.to(navRef.current, {
            top: 10,
            duration: 0.4,
            ease: 'power2.out',
          })
          gsap.to(innerRef.current, {
            paddingTop: '8px',
            paddingBottom: '8px',
            boxShadow: '0 8px 40px rgba(59,35,20,0.15)',
            duration: 0.4,
            ease: 'power2.out',
          })
        },
        onLeaveBack: () => {
          gsap.to(navRef.current, {
            top: 20,
            duration: 0.4,
            ease: 'power2.out',
          })
          gsap.to(innerRef.current, {
            paddingTop: '10px',
            paddingBottom: '10px',
            boxShadow: '0 4px 32px rgba(59,35,20,0.10)',
            duration: 0.4,
            ease: 'power2.out',
          })
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          width: 'min(92vw, 920px)',
        }}
      >
        <div
          ref={innerRef}
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 999,
            padding: '10px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 32px rgba(59,35,20,0.10)',
            border: '1.5px solid rgba(255,255,255,0.85)',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
            }}
          >
            <svg viewBox="0 0 40 40" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#3b2314" />
              <circle cx="14" cy="22" r="5" fill="#f4a4c0" />
              <circle cx="22" cy="26" r="4" fill="#8b5ccc" />
              <circle cx="28" cy="21" r="3.5" fill="#f4a4c0" />
              <rect x="19" y="6" width="4" height="14" rx="2" fill="#e8e8e8" />
              <ellipse cx="21" cy="19" rx="12" ry="4" fill="#5a3620" />
            </svg>
            <span
              style={{
                fontWeight: 900,
                fontSize: 20,
                color: '#3b2314',
                letterSpacing: '-0.5px',
                fontFamily: 'var(--font-nunito)',
              }}
            >
              BoBar
            </span>
          </Link>

          {/* Desktop links */}
          <div
            className="hidden md:flex"
            style={{ gap: 4, alignItems: 'center' }}
          >
            {links.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    background: active ? '#3b2314' : 'transparent',
                    color: active ? '#f5f0d0' : '#3b2314',
                    padding: '7px 18px',
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: 15,
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    fontFamily: 'var(--font-nunito)',
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              href="/order-now"
              style={{
                background: '#8b5ccc',
                color: 'white',
                padding: '8px 20px',
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 15,
                marginLeft: 8,
                boxShadow: '0 2px 12px rgba(139,92,204,0.35)',
                textDecoration: 'none',
                transition: 'all 0.2s',
                fontFamily: 'var(--font-nunito)',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.transform = 'scale(1.06)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.transform = '')
              }
            >
              Order Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 22,
                  height: 2.5,
                  background: '#3b2314',
                  borderRadius: 2,
                  transition: 'all 0.25s',
                  transform:
                    menuOpen && i === 0
                      ? 'rotate(45deg) translate(5px, 5px)'
                      : menuOpen && i === 2
                      ? 'rotate(-45deg) translate(5px, -5px)'
                      : menuOpen && i === 1
                      ? 'scaleX(0)'
                      : 'none',
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            style={{
              marginTop: 8,
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(20px)',
              borderRadius: 24,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              boxShadow: '0 8px 40px rgba(59,35,20,0.15)',
              border: '1.5px solid rgba(255,255,255,0.85)',
            }}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  background: pathname === link.href ? '#3b2314' : 'transparent',
                  color: pathname === link.href ? '#f5f0d0' : '#3b2314',
                  padding: '10px 18px',
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: 'none',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  fontFamily: 'var(--font-nunito)',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/order-now"
              onClick={() => setMenuOpen(false)}
              style={{
                background: '#8b5ccc',
                color: 'white',
                padding: '10px 18px',
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 16,
                textDecoration: 'none',
                textAlign: 'center',
                fontFamily: 'var(--font-nunito)',
              }}
            >
              Order Now
            </Link>
          </div>
        )}
      </nav>
    </>
  )
}
