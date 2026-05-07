'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Leaf from '@/components/effects/Leaf'
import BobaIllustration from '@/components/ui/BobaIllustration'
import MiniDrink from '@/components/ui/MiniDrink'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: '🧋', title: 'Made Fresh Daily', desc: 'Every drink crafted to order with premium whole milk and real fruit.' },
  { icon: '🌿', title: 'Quality Ingredients', desc: 'Sourced teas, real tapioca pearls cooked in-house every morning.' },
  { icon: '💜', title: 'Halifax Local', desc: 'Proudly rooted in Halifax since 2019, serving Quinpool Road.' },
]

const drinks = [
  { name: 'Taro Milk Tea', tag: 'Fan Fave', price: '$7.25', color1: '#8b5ccc', color2: '#c9a0e8' },
  { name: 'Strawberry Matcha', tag: 'Trending', price: '$7.75', color1: '#e05c8a', color2: '#f4a4c0' },
  { name: 'Brown Sugar Boba', tag: 'Classic', price: '$8.25', color1: '#8b4513', color2: '#d2a679' },
  { name: 'Mango Passion', tag: 'Summer', price: '$7.50', color1: '#e8a020', color2: '#ffd580' },
]

const stats = [
  { num: 30, suffix: '+', label: 'Drinks' },
  { num: 5, suffix: '★', label: 'Rating' },
  { num: 2019, suffix: '', label: 'Est.' },
]

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)
  const heroBadgeRef = useRef<HTMLDivElement>(null)
  const heroH1Ref = useRef<HTMLHeadingElement>(null)
  const heroParaRef = useRef<HTMLParagraphElement>(null)
  const heroBtnsRef = useRef<HTMLDivElement>(null)
  const heroStatsRef = useRef<HTMLDivElement>(null)
  const heroIllustrationRef = useRef<HTMLDivElement>(null)
  const bobaRef = useRef<HTMLDivElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)
  const featuresSectionRef = useRef<HTMLElement>(null)
  const favouritesSectionRef = useRef<HTMLElement>(null)
  const ctaSectionRef = useRef<HTMLElement>(null)
  const statRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Hero entrance timeline ───────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(heroBadgeRef.current, { y: 24, opacity: 0, duration: 0.7 }, 0.4)
        .from(heroH1Ref.current, { y: 40, opacity: 0, duration: 0.8 }, 0.55)
        .from(heroParaRef.current, { y: 32, opacity: 0, duration: 0.75 }, 0.7)
        .from(heroBtnsRef.current, { y: 24, opacity: 0, duration: 0.7 }, 0.85)
        .from(heroStatsRef.current, { y: 20, opacity: 0, duration: 0.65 }, 1.0)
        .from(
          heroIllustrationRef.current,
          { scale: 0.88, opacity: 0, duration: 1.0, ease: 'power2.out' },
          0.5
        )

      // ─── Boba float ───────────────────────────────────────────────────────
      gsap.to(bobaRef.current, {
        y: -18,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // ─── Blob morph ───────────────────────────────────────────────────────
      gsap.to(blobRef.current, {
        scale: 1.08,
        rotation: 6,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // ─── Count-up stats ───────────────────────────────────────────────────
      stats.forEach((stat, i) => {
        const el = statRefs.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.num,
          duration: 1.6,
          ease: 'power2.out',
          delay: 1.1 + i * 0.1,
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val)}${stat.suffix}`
          },
        })
      })

      // ─── Feature cards scroll reveal ──────────────────────────────────────
      gsap.from('.feature-card', {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuresSectionRef.current,
          start: 'top 78%',
          once: true,
        },
      })

      // ─── Favourites heading ───────────────────────────────────────────────
      gsap.from('.fav-heading', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: favouritesSectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      // ─── Drink cards ──────────────────────────────────────────────────────
      gsap.from('.drink-card', {
        y: 44,
        opacity: 0,
        stagger: 0.1,
        duration: 0.72,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.drink-grid',
          start: 'top 82%',
          once: true,
        },
      })

      // ─── CTA banner ───────────────────────────────────────────────────────
      gsap.from('.cta-banner', {
        scale: 0.96,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Botanical leaves */}
      <Leaf style={{ left: -30, top: -10 }} size={160} rotate={25} opacity={0.82} color="#5a9e4a" animate />
      <Leaf style={{ right: -20, top: -20 }} size={140} rotate={-35} opacity={0.78} flip color="#4a8e3a" animate />
      <Leaf style={{ left: -20, top: 520 }} size={100} rotate={60} opacity={0.48} color="#6aab5e" animate />
      <Leaf style={{ right: -15, top: 640 }} size={120} rotate={-50} opacity={0.5} flip color="#5a9e4a" animate />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 24px 60px',
          position: 'relative',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 60,
            alignItems: 'center',
          }}
        >
          {/* Left: text */}
          <div ref={heroTextRef} style={{ position: 'relative', zIndex: 1 }}>
            <div ref={heroBadgeRef}>
              <span
                style={{
                  display: 'inline-block',
                  background: '#f4a4c0',
                  color: '#3b2314',
                  borderRadius: 999,
                  padding: '6px 18px',
                  fontWeight: 800,
                  fontSize: 13,
                  marginBottom: 20,
                  letterSpacing: '0.4px',
                }}
              >
                🧋 Halifax&apos;s Favourite Boba Shop
              </span>
            </div>

            <h1
              ref={heroH1Ref}
              style={{
                fontWeight: 900,
                fontSize: 'clamp(40px, 5.5vw, 68px)',
                color: '#3b2314',
                lineHeight: 1.08,
                marginBottom: 22,
                letterSpacing: '-1.5px',
              }}
            >
              Sip into
              <br />
              <span style={{ color: '#8b5ccc' }}>Pure Bliss</span>
            </h1>

            <p
              ref={heroParaRef}
              style={{
                fontSize: 18,
                lineHeight: 1.75,
                color: '#6a4a35',
                marginBottom: 36,
                maxWidth: 420,
              }}
            >
              Handcrafted bubble teas made with love, real ingredients, and way too many
              pearls. Find us at 6082 Quinpool Road, Halifax.
            </p>

            <div ref={heroBtnsRef} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link
                href="/menu"
                style={{
                  background: '#3b2314',
                  color: '#f5f0d0',
                  padding: '14px 32px',
                  borderRadius: 999,
                  fontWeight: 800,
                  fontSize: 16,
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(59,35,20,0.25)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-3px)'
                  el.style.boxShadow = '0 10px 32px rgba(59,35,20,0.3)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = ''
                  el.style.boxShadow = '0 4px 20px rgba(59,35,20,0.25)'
                }}
              >
                See Our Menu
              </Link>
              <Link
                href="/find-us"
                style={{
                  background: 'transparent',
                  color: '#3b2314',
                  border: '2.5px solid #3b2314',
                  padding: '12px 28px',
                  borderRadius: 999,
                  fontWeight: 800,
                  fontSize: 16,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#3b2314'
                  el.style.color = '#f5f0d0'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'transparent'
                  el.style.color = '#3b2314'
                }}
              >
                Find Us
              </Link>
            </div>

            {/* Stats */}
            <div
              ref={heroStatsRef}
              style={{ display: 'flex', gap: 36, marginTop: 52 }}
            >
              {stats.map((s, i) => (
                <div key={s.label}>
                  <div style={{ fontWeight: 900, fontSize: 30, color: '#8b5ccc' }}>
                    <span
                      ref={(el) => {
                        statRefs.current[i] = el
                      }}
                    >
                      0{s.suffix}
                    </span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#8a6050', marginTop: 2 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: illustration */}
          <div
            ref={heroIllustrationRef}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              ref={blobRef}
              style={{
                position: 'absolute',
                background: 'radial-gradient(circle, rgba(244,164,192,0.35) 0%, rgba(139,92,204,0.22) 60%, transparent 100%)',
                borderRadius: '60% 40% 55% 45% / 45% 55% 45% 55%',
                width: 460,
                height: 460,
              }}
            />
            <div ref={bobaRef} style={{ position: 'relative', zIndex: 1 }}>
              <BobaIllustration color1="#8b5ccc" color2="#c9a0e8" size={280} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Cards ─────────────────────────────────────────────────── */}
      <section ref={featuresSectionRef} style={{ padding: '0 24px 80px', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="feature-card"
              style={{
                background: 'rgba(255,255,255,0.82)',
                backdropFilter: 'blur(12px)',
                borderRadius: 24,
                padding: '32px 28px',
                boxShadow: '0 4px 24px rgba(59,35,20,0.08)',
                border: '1.5px solid rgba(255,255,255,0.9)',
                transition: 'transform 0.25s cubic-bezier(.22,1,.36,1), box-shadow 0.25s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-6px) rotate(-0.4deg)'
                el.style.boxShadow = '0 16px 40px rgba(59,35,20,0.14)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = ''
                el.style.boxShadow = '0 4px 24px rgba(59,35,20,0.08)'
              }}
            >
              <div style={{ fontSize: 38, marginBottom: 14 }}>{f.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 18, color: '#3b2314', marginBottom: 8 }}>
                {f.title}
              </div>
              <div style={{ fontSize: 15, color: '#7a5040', lineHeight: 1.65 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Fan Favourites ────────────────────────────────────────────────── */}
      <section ref={favouritesSectionRef} style={{ padding: '40px 24px 100px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="fav-heading" style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2
              style={{
                fontWeight: 900,
                fontSize: 'clamp(32px, 4vw, 46px)',
                color: '#3b2314',
                letterSpacing: '-1px',
              }}
            >
              Fan Favourites
            </h2>
            <p style={{ fontSize: 17, color: '#8a6050', marginTop: 10 }}>
              Our most loved drinks, ready to make your day
            </p>
          </div>

          <div
            className="drink-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 20,
            }}
          >
            {drinks.map((d) => (
              <Link
                key={d.name}
                href="/menu"
                className="drink-card"
                style={{
                  background: 'rgba(255,255,255,0.88)',
                  borderRadius: 28,
                  padding: '28px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(59,35,20,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.9)',
                  transition: 'transform 0.25s cubic-bezier(.22,1,.36,1), box-shadow 0.25s',
                  textDecoration: 'none',
                  display: 'block',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-8px) scale(1.02)'
                  el.style.boxShadow = '0 20px 48px rgba(59,35,20,0.16)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = ''
                  el.style.boxShadow = '0 4px 20px rgba(59,35,20,0.08)'
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    background: '#f4a4c0',
                    color: '#3b2314',
                    borderRadius: 999,
                    padding: '3px 12px',
                    fontSize: 11,
                    fontWeight: 800,
                    marginBottom: 12,
                  }}
                >
                  {d.tag}
                </span>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 16,
                    animation: 'float 4s ease-in-out infinite',
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                >
                  <MiniDrink color1={d.color1} color2={d.color2} size={88} />
                </div>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#3b2314' }}>{d.name}</div>
                <div style={{ fontSize: 14, color: '#8b5ccc', fontWeight: 700, marginTop: 4 }}>
                  {d.price}
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <Link
              href="/menu"
              style={{
                background: '#8b5ccc',
                color: 'white',
                padding: '14px 44px',
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 17,
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(139,92,204,0.35)',
                display: 'inline-block',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-3px)'
                el.style.boxShadow = '0 10px 32px rgba(139,92,204,0.45)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = ''
                el.style.boxShadow = '0 4px 20px rgba(139,92,204,0.35)'
              }}
            >
              View Full Menu →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section ref={ctaSectionRef} style={{ padding: '0 24px 100px', position: 'relative', zIndex: 1 }}>
        <div
          className="cta-banner"
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            background: '#3b2314',
            borderRadius: 32,
            padding: 'clamp(40px, 5vw, 60px) clamp(28px, 5vw, 48px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 32,
            boxShadow: '0 8px 48px rgba(59,35,20,0.22)',
            position: 'relative',
            overflow: 'hidden',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: -60,
              top: -60,
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: 'rgba(244,164,192,0.13)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3
              style={{
                fontWeight: 900,
                fontSize: 'clamp(24px, 3vw, 36px)',
                color: '#f5f0d0',
                marginBottom: 12,
                letterSpacing: '-0.5px',
              }}
            >
              Come visit us today!
            </h3>
            <p style={{ fontSize: 16, color: '#c9a888', lineHeight: 1.65 }}>
              6082 Quinpool Road, Halifax · Open daily 11am – 10pm
            </p>
          </div>
          <Link
            href="/find-us"
            style={{
              background: '#f4a4c0',
              color: '#3b2314',
              padding: '16px 36px',
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 16,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(244,164,192,0.4)',
              transition: 'transform 0.15s, box-shadow 0.15s',
              position: 'relative',
              zIndex: 1,
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'scale(1.05)'
              el.style.boxShadow = '0 8px 28px rgba(244,164,192,0.55)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = ''
              el.style.boxShadow = '0 4px 20px rgba(244,164,192,0.4)'
            }}
          >
            Get Directions →
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
      `}</style>
    </div>
  )
}
