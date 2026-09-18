'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pageLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/find-us', label: 'Find Us' },
  { href: '/order-now', label: 'Order Now' },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-col', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          once: true,
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      style={{
        background: '#3b2314',
        color: '#f5f0d0',
        padding: '52px 24px 32px',
        position: 'relative',
        zIndex: 10,
        marginTop: 40,
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 40,
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <svg viewBox="0 0 40 40" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#f4a4c0" />
                <circle cx="14" cy="22" r="5" fill="#3b2314" />
                <circle cx="22" cy="26" r="4" fill="#8b5ccc" />
                <circle cx="28" cy="21" r="3.5" fill="#3b2314" />
                <rect x="19" y="6" width="4" height="14" rx="2" fill="#e8e8e8" />
                <ellipse cx="21" cy="19" rx="12" ry="4" fill="#d4987a" />
              </svg>
              <span style={{ fontWeight: 900, fontSize: 22, letterSpacing: '-0.5px' }}>BoBar</span>
            </div>
            <p style={{ color: '#a08060', fontSize: 14, lineHeight: 1.75, maxWidth: 240 }}>
              Halifax's favourite handcrafted bubble tea shop. Made with love at 6082 Quinpool Road.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {['📸', '🐦', '📘'].map((icon, i) => (
                <div
                  key={i}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: 16,
                    transition: 'background 0.2s, transform 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(255,255,255,0.2)'
                    el.style.transform = 'scale(1.15)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(255,255,255,0.1)'
                    el.style.transform = ''
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div className="footer-col">
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 16, color: '#f4a4c0' }}>
              Pages
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pageLinks.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  style={{
                    color: '#a08060',
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: 'none',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = '#f5f0d0')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = '#a08060')
                  }
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Visit */}
          <div className="footer-col">
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 16, color: '#f4a4c0' }}>
              Visit Us
            </div>
            <div style={{ color: '#a08060', fontSize: 14, lineHeight: 2 }}>
              6082 Quinpool Rd
              <br />
              Halifax, NS
              <br />
              B3L 1A3
              <br />
              <a href="tel:+19021234567" style={{ color: '#a08060', textDecoration: 'none' }}>
                (902) 123-4567
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="footer-col">
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 16, color: '#f4a4c0' }}>
              Hours
            </div>
            <div style={{ color: '#a08060', fontSize: 14, lineHeight: 2 }}>
              Mon–Thu: 11am–9pm
              <br />
              Fri–Sat: 11am–10:30pm
              <br />
              Sun: 12pm–9pm
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div style={{ color: '#7a5a3a', fontSize: 13 }}>
            © 2026 BoBar. Crafted with 🧋 in Halifax, NS.
          </div>
          <div style={{ color: '#7a5a3a', fontSize: 13 }}>hello@bobar.ca</div>
        </div>
      </div>
    </footer>
  )
}
