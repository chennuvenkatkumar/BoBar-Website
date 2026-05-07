'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Leaf from '@/components/effects/Leaf'

gsap.registerPlugin(ScrollTrigger)

const hours = [
  { day: 'Monday – Thursday', time: '11:00 am – 9:00 pm' },
  { day: 'Friday – Saturday', time: '11:00 am – 10:30 pm' },
  { day: 'Sunday', time: '12:00 pm – 9:00 pm' },
]

export default function FindUsPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const mapPinRef = useRef<SVGCircleElement>(null)

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 1000)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from(headerRef.current, {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.15,
      })

      // Left cards stagger in from left
      gsap.from('.left-card', {
        x: -40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.72,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftColRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      // Right items from right
      gsap.from('.right-card', {
        x: 40,
        opacity: 0,
        stagger: 0.14,
        duration: 0.72,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightColRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      // Map pin pulse (looping GSAP instead of CSS for smoothness)
      if (mapPinRef.current) {
        gsap.to(mapPinRef.current, {
          attr: { r: 34 },
          opacity: 0,
          duration: 1.8,
          repeat: -1,
          ease: 'power2.out',
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px 80px', position: 'relative', zIndex: 1 }}>
      <Leaf
        style={{ right: -20, top: 80 }}
        size={110}
        rotate={-30}
        opacity={0.62}
        flip
        color="#5a9e4a"
        animate
      />
      <Leaf
        style={{ left: -20, top: 600 }}
        size={90}
        rotate={50}
        opacity={0.42}
        color="#6aab5e"
        animate
      />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: 60 }}>
          <span
            style={{
              display: 'inline-block',
              background: '#f4a4c0',
              color: '#3b2314',
              borderRadius: 999,
              padding: '6px 20px',
              fontWeight: 800,
              fontSize: 13,
              marginBottom: 20,
            }}
          >
            📍 Halifax, NS
          </span>
          <h1
            style={{
              fontWeight: 900,
              fontSize: 'clamp(38px, 5vw, 56px)',
              color: '#3b2314',
              letterSpacing: '-1.5px',
            }}
          >
            Find Us
          </h1>
          <p style={{ fontSize: 18, color: '#8a6050', marginTop: 12 }}>
            We&apos;re on Quinpool — come say hi!
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 32,
          }}
        >
          {/* ── Left column ── */}
          <div ref={leftColRef} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Location */}
            <div
              className="left-card"
              style={{
                background: '#3b2314',
                borderRadius: 28,
                padding: '36px 32px',
                color: '#f5f0d0',
                boxShadow: '0 6px 32px rgba(59,35,20,0.18)',
              }}
            >
              <div style={{ fontWeight: 900, fontSize: 22, marginBottom: 20 }}>📍 Location</div>
              <div style={{ fontSize: 17, lineHeight: 1.85, color: '#d4b898', fontWeight: 600 }}>
                6082 Quinpool Road
                <br />
                Halifax, Nova Scotia
                <br />
                B3L 1A3, Canada
              </div>
              <a
                href="https://maps.google.com/?q=6082+Quinpool+Road+Halifax"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: 20,
                  background: '#f4a4c0',
                  color: '#3b2314',
                  borderRadius: 999,
                  padding: '10px 24px',
                  fontWeight: 800,
                  fontSize: 14,
                  textDecoration: 'none',
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform = 'scale(1.05)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform = '')
                }
              >
                Open in Maps →
              </a>
            </div>

            {/* Hours */}
            <div
              className="left-card"
              style={{
                background: 'rgba(255,255,255,0.88)',
                borderRadius: 28,
                padding: '36px 32px',
                boxShadow: '0 4px 20px rgba(59,35,20,0.08)',
                border: '1.5px solid rgba(255,255,255,0.9)',
              }}
            >
              <div style={{ fontWeight: 900, fontSize: 22, color: '#3b2314', marginBottom: 24 }}>
                🕐 Hours
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {hours.map((h) => (
                  <div
                    key={h.day}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid rgba(59,35,20,0.08)',
                      paddingBottom: 12,
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    <span style={{ fontWeight: 700, color: '#3b2314', fontSize: 15 }}>{h.day}</span>
                    <span style={{ fontWeight: 700, color: '#8b5ccc', fontSize: 15 }}>{h.time}</span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: 20,
                  background: 'rgba(244,164,192,0.35)',
                  borderRadius: 16,
                  padding: '12px 16px',
                  fontSize: 14,
                  color: '#3b2314',
                  fontWeight: 700,
                  animation: 'pulse 2.5s ease-in-out infinite',
                }}
              >
                🧋 Happy Hour: Mon–Fri 3–5pm · 20% off all drinks!
              </div>
            </div>

            {/* Contact */}
            <div
              className="left-card"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,204,0.12), rgba(244,164,192,0.12))',
                borderRadius: 28,
                padding: '28px 32px',
                border: '1.5px solid rgba(139,92,204,0.2)',
              }}
            >
              <div style={{ fontWeight: 900, fontSize: 22, color: '#3b2314', marginBottom: 16 }}>
                📞 Contact
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a
                  href="tel:+19021234567"
                  style={{ color: '#3b2314', fontWeight: 700, fontSize: 16, textDecoration: 'none' }}
                >
                  📱 (902) 123-4567
                </a>
                <a
                  href="mailto:hello@bobar.ca"
                  style={{ color: '#8b5ccc', fontWeight: 700, fontSize: 16, textDecoration: 'none' }}
                >
                  ✉️ hello@bobar.ca
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#e05c8a', fontWeight: 700, fontSize: 16, textDecoration: 'none' }}
                >
                  📸 @bobar.halifax
                </a>
              </div>
            </div>
          </div>

          {/* ── Right column ── */}
          <div ref={rightColRef} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Map */}
            <div
              className="right-card"
              style={{
                background: 'rgba(255,255,255,0.88)',
                borderRadius: 28,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(59,35,20,0.08)',
                border: '1.5px solid rgba(255,255,255,0.9)',
                height: 240,
                position: 'relative',
              }}
            >
              <svg
                viewBox="0 0 400 240"
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: 'absolute', inset: 0 }}
              >
                {/* Streets */}
                <rect width="400" height="240" fill="#e8e4d8" />
                <rect x="0" y="110" width="400" height="20" fill="#d0cab8" />
                <rect x="180" y="0" width="20" height="240" fill="#d0cab8" />
                <rect x="60" y="0" width="12" height="240" fill="#d8d2c0" />
                <rect x="320" y="0" width="12" height="240" fill="#d8d2c0" />
                <rect x="0" y="50" width="400" height="12" fill="#d8d2c0" />
                <rect x="0" y="178" width="400" height="12" fill="#d8d2c0" />
                {/* Blocks */}
                <rect x="80" y="68" width="90" height="34" rx="4" fill="#ccc8b8" />
                <rect x="220" y="68" width="90" height="34" rx="4" fill="#ccc8b8" />
                <rect x="80" y="136" width="90" height="34" rx="4" fill="#ccc8b8" />
                <rect x="220" y="136" width="90" height="34" rx="4" fill="#ccc8b8" />
                {/* Pin */}
                <circle cx="190" cy="120" r="22" fill="#8b5ccc" opacity="0.2" />
                <circle
                  ref={mapPinRef}
                  cx="190"
                  cy="120"
                  r="22"
                  fill="#8b5ccc"
                  opacity="0.12"
                />
                <circle cx="190" cy="120" r="12" fill="#8b5ccc" />
                <circle cx="190" cy="120" r="5" fill="white" />
              </svg>
              <div
                style={{
                  position: 'absolute',
                  bottom: 16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                <div
                  style={{
                    background: 'white',
                    borderRadius: 999,
                    padding: '6px 16px',
                    fontWeight: 800,
                    fontSize: 13,
                    color: '#3b2314',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  📍 6082 Quinpool Rd
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div
              className="right-card"
              style={{
                background: 'rgba(255,255,255,0.88)',
                borderRadius: 28,
                padding: '36px 32px',
                boxShadow: '0 4px 20px rgba(59,35,20,0.08)',
                border: '1.5px solid rgba(255,255,255,0.9)',
                flex: 1,
              }}
            >
              <div style={{ fontWeight: 900, fontSize: 22, color: '#3b2314', marginBottom: 8 }}>
                Send us a message
              </div>
              <p style={{ fontSize: 14, color: '#8a6050', marginBottom: 24 }}>
                Catering inquiries, wholesale, or just want to say hi 👋
              </p>

              {sent ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '32px 0',
                  }}
                >
                  <div style={{ fontSize: 56, marginBottom: 16 }}>🧋</div>
                  <div
                    style={{ fontWeight: 900, fontSize: 22, color: '#8b5ccc', marginBottom: 8 }}
                  >
                    Message sent!
                  </div>
                  <div style={{ fontSize: 15, color: '#8a6050' }}>
                    We&apos;ll get back to you within 24 hours.
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                >
                  {[
                    { key: 'name', placeholder: 'Your name', type: 'text' },
                    { key: 'email', placeholder: 'Your email', type: 'email' },
                  ].map((field) => (
                    <input
                      key={field.key}
                      placeholder={field.placeholder}
                      type={field.type}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, [field.key]: e.target.value }))
                      }
                      style={{
                        padding: '12px 18px',
                        borderRadius: 16,
                        border: '2px solid rgba(59,35,20,0.12)',
                        fontFamily: 'var(--font-nunito)',
                        fontSize: 15,
                        color: '#3b2314',
                        background: '#faf8f0',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#8b5ccc'
                        e.target.style.boxShadow = '0 0 0 3px rgba(139,92,204,0.15)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(59,35,20,0.12)'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                  ))}
                  <textarea
                    placeholder="Your message…"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                    style={{
                      padding: '12px 18px',
                      borderRadius: 16,
                      border: '2px solid rgba(59,35,20,0.12)',
                      fontFamily: 'var(--font-nunito)',
                      fontSize: 15,
                      color: '#3b2314',
                      background: '#faf8f0',
                      resize: 'vertical',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#8b5ccc'
                      e.target.style.boxShadow = '0 0 0 3px rgba(139,92,204,0.15)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(59,35,20,0.12)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    style={{
                      background: sending ? 'rgba(139,92,204,0.6)' : '#8b5ccc',
                      color: 'white',
                      border: 'none',
                      cursor: sending ? 'not-allowed' : 'pointer',
                      padding: '14px',
                      borderRadius: 999,
                      fontFamily: 'var(--font-nunito)',
                      fontWeight: 800,
                      fontSize: 16,
                      boxShadow: '0 4px 16px rgba(139,92,204,0.3)',
                      transition: 'transform 0.15s, box-shadow 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      if (sending) return
                      const el = e.currentTarget as HTMLElement
                      el.style.transform = 'translateY(-2px)'
                      el.style.boxShadow = '0 8px 28px rgba(139,92,204,0.4)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.transform = ''
                      el.style.boxShadow = '0 4px 16px rgba(139,92,204,0.3)'
                    }}
                  >
                    {sending ? 'Sending…' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.65; }
        }
      `}</style>
    </div>
  )
}
