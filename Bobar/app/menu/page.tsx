'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MiniDrink from '@/components/ui/MiniDrink'
import Leaf from '@/components/effects/Leaf'
import { menuData } from '@/lib/data/menu-data'

gsap.registerPlugin(ScrollTrigger)

type CartItem = { name: string; count: number }

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState('Milk Teas')
  const [cart, setCart] = useState<Record<string, number>>({})
  const [gridKey, setGridKey] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  const tabs = Object.keys(menuData)
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0)

  function switchTab(tab: string) {
    // Fade out current cards, switch, then stagger in
    gsap.to('.menu-card', {
      opacity: 0,
      y: 12,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        setActiveTab(tab)
        setGridKey((k) => k + 1)
      },
    })
  }

  function handleAdd(name: string) {
    setCart((prev) => ({ ...prev, [name]: (prev[name] || 0) + 1 }))
  }

  // Header reveal on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.1,
      })
      gsap.from(tabsRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.25,
      })
    })
    return () => ctx.revert()
  }, [])

  // Stagger cards whenever tab/gridKey changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.menu-card',
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.07,
          duration: 0.6,
          ease: 'power3.out',
        }
      )
    })
    return () => ctx.revert()
  }, [gridKey, activeTab])

  return (
    <div style={{ minHeight: '100vh', padding: '110px 24px 80px', position: 'relative', zIndex: 1 }}>
      <Leaf
        style={{ right: -20, top: 60 }}
        size={110}
        rotate={-30}
        opacity={0.6}
        flip
        color="#5a9e4a"
        animate
      />
      <Leaf
        style={{ left: -20, top: 500 }}
        size={90}
        rotate={40}
        opacity={0.45}
        color="#6aab5e"
        animate
      />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1
            style={{
              fontWeight: 900,
              fontSize: 'clamp(38px, 5vw, 56px)',
              color: '#3b2314',
              letterSpacing: '-1.5px',
            }}
          >
            Our Menu
          </h1>
          <p style={{ fontSize: 18, color: '#8a6050', marginTop: 12 }}>
            Everything made fresh, every single day
          </p>
        </div>

        {/* Category tabs */}
        <div
          ref={tabsRef}
          style={{
            display: 'flex',
            gap: 10,
            marginBottom: 40,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => switchTab(tab)}
              style={{
                background: activeTab === tab ? '#3b2314' : 'rgba(255,255,255,0.85)',
                color: activeTab === tab ? '#f5f0d0' : '#3b2314',
                border: 'none',
                cursor: 'pointer',
                padding: '10px 24px',
                borderRadius: 999,
                fontFamily: 'var(--font-nunito)',
                fontWeight: 800,
                fontSize: 15,
                boxShadow:
                  activeTab === tab
                    ? '0 4px 16px rgba(59,35,20,0.2)'
                    : '0 2px 8px rgba(59,35,20,0.08)',
                transition: 'all 0.25s cubic-bezier(.22,1,.36,1)',
                transform: activeTab === tab ? 'scale(1.04)' : 'scale(1)',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div
          key={gridKey}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 24,
          }}
        >
          {menuData[activeTab].map((item) => (
            <div
              key={item.name}
              className="menu-card"
              style={{
                background: 'rgba(255,255,255,0.9)',
                borderRadius: 28,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(59,35,20,0.09)',
                border: '1.5px solid rgba(255,255,255,0.95)',
                transition: 'transform 0.25s cubic-bezier(.22,1,.36,1), box-shadow 0.25s',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-6px) scale(1.01)'
                el.style.boxShadow = '0 16px 40px rgba(59,35,20,0.15)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = ''
                el.style.boxShadow = '0 4px 20px rgba(59,35,20,0.09)'
              }}
            >
              {/* Drink image area */}
              <div
                style={{
                  background: `linear-gradient(135deg, ${item.color1}22, ${item.color2}44)`,
                  padding: '24px 20px 16px',
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {item.tag && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      background: '#f4a4c0',
                      color: '#3b2314',
                      borderRadius: 999,
                      padding: '3px 10px',
                      fontSize: 11,
                      fontWeight: 800,
                    }}
                  >
                    {item.tag}
                  </span>
                )}
                <div
                  style={{
                    animation: 'float 4s ease-in-out infinite',
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                >
                  <MiniDrink color1={item.color1} color2={item.color2} size={80} />
                </div>
              </div>

              {/* Info */}
              <div
                style={{
                  padding: '20px 20px 24px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ fontWeight: 800, fontSize: 17, color: '#3b2314', marginBottom: 6 }}>
                  {item.name}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: '#8a6050',
                    lineHeight: 1.55,
                    flex: 1,
                  }}
                >
                  {item.desc}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 16,
                  }}
                >
                  <span style={{ fontWeight: 900, fontSize: 18, color: '#8b5ccc' }}>
                    {item.price}
                  </span>
                  <button
                    onClick={() => handleAdd(item.name)}
                    style={{
                      background: cart[item.name] ? '#3b2314' : '#8b5ccc',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '8px 18px',
                      borderRadius: 999,
                      fontFamily: 'var(--font-nunito)',
                      fontWeight: 800,
                      fontSize: 14,
                      transition: 'all 0.2s, transform 0.12s',
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.transform = 'scale(1.06)')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.transform = '')
                    }
                  >
                    {cart[item.name] ? `✓ ${cart[item.name]}` : '+ Add'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Now CTA */}
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <Link
            href="/order-now"
            style={{
              background: '#3b2314',
              color: '#f5f0d0',
              padding: '16px 48px',
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 17,
              textDecoration: 'none',
              boxShadow: '0 6px 28px rgba(59,35,20,0.25)',
              display: 'inline-block',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'translateY(-3px)'
              el.style.boxShadow = '0 12px 36px rgba(59,35,20,0.3)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = ''
              el.style.boxShadow = '0 6px 28px rgba(59,35,20,0.25)'
            }}
          >
            Ready to Order? →
          </Link>
        </div>
      </div>

      {/* Floating cart pill */}
      {totalItems > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#3b2314',
            color: '#f5f0d0',
            borderRadius: 999,
            padding: '16px 32px',
            fontWeight: 800,
            fontSize: 17,
            boxShadow: '0 8px 36px rgba(59,35,20,0.32)',
            display: 'flex',
            gap: 20,
            alignItems: 'center',
            zIndex: 200,
            animation: 'cartPop 0.4s cubic-bezier(.22,1,.36,1)',
            fontFamily: 'var(--font-nunito)',
            whiteSpace: 'nowrap',
          }}
        >
          🧋 {totalItems} drink{totalItems !== 1 ? 's' : ''} in mind
          <Link
            href="/order-now"
            style={{
              background: '#f4a4c0',
              color: '#3b2314',
              border: 'none',
              cursor: 'pointer',
              padding: '10px 24px',
              borderRadius: 999,
              fontFamily: 'var(--font-nunito)',
              fontWeight: 800,
              fontSize: 15,
              transition: 'transform 0.15s',
              textDecoration: 'none',
              display: 'inline-block',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = 'scale(1.05)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = '')
            }
          >
            Order Now →
          </Link>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes cartPop {
          0% { transform: translateX(-50%) translateY(20px) scale(0.92); opacity: 0; }
          100% { transform: translateX(-50%) translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
