'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Leaf from '@/components/effects/Leaf'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  {
    year: '2019',
    title: 'The Beginning',
    body: "A market stall. A dream. Founder Sofia Rossi spent six months perfecting the brown sugar boba recipe before serving a single cup. The line-ups told her everything.",
    dark: false,
  },
  {
    year: '2021',
    title: 'Quinpool Calling',
    body: 'We opened our permanent home at 6082 Quinpool Road and never looked back. The bright yellow exterior became a Halifax landmark overnight.',
    dark: true,
  },
  {
    year: '2023',
    title: 'Community Roots',
    body: 'Launched our partnership with Dal and SMU campuses and started the BoBar Bursary — helping local students, one cup at a time.',
    gradient: true,
  },
  {
    year: 'Today',
    title: 'Still Brewing',
    body: '30+ drinks, thousands of happy customers, and a team of 8 passionate boba artists. The pearls keep cooking and the love keeps flowing.',
    dark: false,
  },
]

const values = [
  { icon: '🌱', title: 'Fresh Daily', desc: 'Pearls cooked every morning. No shortcuts, ever.' },
  { icon: '💜', title: 'Community First', desc: 'Halifax is home. We give back through local events.' },
  { icon: '🌍', title: 'Sustainably Sourced', desc: 'Ethically traded teas and biodegradable packaging.' },
  { icon: '🧪', title: 'Always Experimenting', desc: 'New seasonal drinks crafted with care every month.' },
]

const team = [
  { name: 'Mei Lin', role: 'Head Boba Artist', emoji: '👩‍🍳' },
  { name: 'James Park', role: 'Tea Sourcer', emoji: '🫖' },
  { name: 'Sofia Rossi', role: 'Founder & Dreamer', emoji: '✨' },
]

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLElement>(null)
  const valuesRef = useRef<HTMLElement>(null)
  const teamRef = useRef<HTMLElement>(null)
  const heroBlobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero blob float
      gsap.to(heroBlobRef.current, {
        scale: 1.1,
        rotation: 8,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Hero text
      gsap.from('.about-hero-content > *', {
        y: 36,
        opacity: 0,
        stagger: 0.14,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      })

      // Timeline cards
      gsap.from('.timeline-card', {
        y: 44,
        opacity: 0,
        stagger: 0.12,
        duration: 0.72,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 78%',
          once: true,
        },
      })

      // Values heading + cards
      gsap.from('.values-heading', {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top 80%',
          once: true,
        },
      })
      gsap.from('.value-card', {
        y: 36,
        opacity: 0,
        stagger: 0.1,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.values-grid',
          start: 'top 82%',
          once: true,
        },
      })

      // Team cards
      gsap.from('.team-heading', {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: teamRef.current,
          start: 'top 80%',
          once: true,
        },
      })
      gsap.from('.team-card', {
        scale: 0.92,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.team-grid',
          start: 'top 82%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <Leaf style={{ left: -40, top: 60 }} size={130} rotate={30} opacity={0.7} color="#5a9e4a" animate />
      <Leaf style={{ right: -20, top: 340 }} size={100} rotate={-40} opacity={0.58} flip color="#4a8e3a" animate />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{ padding: '140px 24px 80px', textAlign: 'center', position: 'relative' }}
      >
        <div
          ref={heroBlobRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 520,
            height: 320,
            background: 'radial-gradient(ellipse, rgba(244,164,192,0.3) 0%, transparent 70%)',
            pointerEvents: 'none',
            borderRadius: '50%',
          }}
        />

        <div className="about-hero-content" style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
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
            Our Story
          </span>
          <h1
            style={{
              fontWeight: 900,
              fontSize: 'clamp(36px, 5.5vw, 62px)',
              color: '#3b2314',
              letterSpacing: '-1.5px',
              marginBottom: 24,
            }}
          >
            Born in Halifax,
            <br />
            <span style={{ color: '#8b5ccc' }}>Brewed with Love</span>
          </h1>
          <p
            style={{
              fontSize: 18,
              color: '#7a5040',
              lineHeight: 1.78,
              maxWidth: 620,
              margin: '0 auto',
            }}
          >
            BoBar started as a tiny pop-up at the Halifax Seaport Farmers&apos; Market in 2019.
            What began as a weekend passion project — fuelled by late nights, a secondhand
            sealer machine, and an obsession with the perfect pearl — grew into Halifax&apos;s
            most-loved bubble tea destination.
          </p>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <section ref={timelineRef} style={{ padding: '20px 24px 80px' }}>
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 28,
          }}
        >
          {timeline.map((t) => (
            <div
              key={t.year}
              className="timeline-card"
              style={{
                background: t.dark
                  ? '#3b2314'
                  : t.gradient
                  ? 'linear-gradient(135deg, rgba(139,92,204,0.15), rgba(244,164,192,0.15))'
                  : 'rgba(255,255,255,0.88)',
                borderRadius: 28,
                padding: '40px 36px',
                boxShadow: '0 4px 24px rgba(59,35,20,0.09)',
                border: !t.dark && !t.gradient ? '1.5px solid rgba(255,255,255,0.9)' : 'none',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-5px)'
                el.style.boxShadow = '0 16px 40px rgba(59,35,20,0.16)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = ''
                el.style.boxShadow = '0 4px 24px rgba(59,35,20,0.09)'
              }}
            >
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 52,
                  color: t.dark ? '#f4a4c0' : '#8b5ccc',
                  marginBottom: 10,
                  lineHeight: 1,
                }}
              >
                {t.year}
              </div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 20,
                  color: t.dark ? '#f5f0d0' : '#3b2314',
                  marginBottom: 12,
                }}
              >
                {t.title}
              </div>
              <p
                style={{
                  color: t.dark ? '#c9a888' : '#7a5040',
                  lineHeight: 1.72,
                  fontSize: 15,
                }}
              >
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section
        ref={valuesRef}
        style={{
          padding: '40px 24px 80px',
          background: 'rgba(255,255,255,0.35)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2
            className="values-heading"
            style={{
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 42px)',
              color: '#3b2314',
              textAlign: 'center',
              marginBottom: 52,
              letterSpacing: '-0.5px',
            }}
          >
            What We Stand For
          </h2>

          <div
            className="values-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 20,
            }}
          >
            {values.map((v) => (
              <div
                key={v.title}
                className="value-card"
                style={{
                  textAlign: 'center',
                  padding: '28px 16px',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform = '')
                }
              >
                <div style={{ fontSize: 44, marginBottom: 14 }}>{v.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 17, color: '#3b2314', marginBottom: 8 }}>
                  {v.title}
                </div>
                <div style={{ fontSize: 14, color: '#8a6050', lineHeight: 1.65 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <section ref={teamRef} style={{ padding: '60px 24px 100px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2
            className="team-heading"
            style={{
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 42px)',
              color: '#3b2314',
              marginBottom: 48,
              letterSpacing: '-0.5px',
            }}
          >
            Meet the Crew
          </h2>

          <div
            className="team-grid"
            style={{
              display: 'flex',
              gap: 28,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {team.map((member) => (
              <div
                key={member.name}
                className="team-card"
                style={{
                  background: 'rgba(255,255,255,0.88)',
                  borderRadius: 24,
                  padding: '36px 32px',
                  boxShadow: '0 4px 20px rgba(59,35,20,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.9)',
                  minWidth: 180,
                  flex: '1 1 180px',
                  maxWidth: 240,
                  transition: 'transform 0.25s, box-shadow 0.25s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-6px) rotate(1deg)'
                  el.style.boxShadow = '0 16px 36px rgba(59,35,20,0.14)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = ''
                  el.style.boxShadow = '0 4px 20px rgba(59,35,20,0.08)'
                }}
              >
                <div style={{ fontSize: 52, marginBottom: 12 }}>{member.emoji}</div>
                <div style={{ fontWeight: 800, fontSize: 18, color: '#3b2314' }}>{member.name}</div>
                <div style={{ fontSize: 14, color: '#8b5ccc', fontWeight: 700, marginTop: 4 }}>
                  {member.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
