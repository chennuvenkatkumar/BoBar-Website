'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MiniDrink from '@/components/ui/MiniDrink'
import Leaf from '@/components/effects/Leaf'
import { allDrinks, toppings, sizes, sugarLevels, iceLevels } from '@/lib/data/menu-data'
import type { MenuItem, OrderItem } from '@/types'
import { formatPrice, getItemPrice } from '@/lib/utils/pricing'

gsap.registerPlugin(ScrollTrigger)

type Step = 1 | 2 | 3 | 4

const pickupTimes = [
  '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm',
  '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm',
  '5:00 pm', '5:30 pm', '6:00 pm', '6:30 pm', '7:00 pm', '7:30 pm',
  '8:00 pm', '8:30 pm', '9:00 pm',
]

export default function OrderNowPage() {
  const [step, setStep] = useState<Step>(1)
  const [selectedDrink, setSelectedDrink] = useState<MenuItem | null>(null)
  const [selectedSize, setSelectedSize] = useState('Medium')
  const [selectedSugar, setSelectedSugar] = useState('50%')
  const [selectedIce, setSelectedIce] = useState('Regular Ice')
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['Tapioca Pearls'])
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [pickupForm, setPickupForm] = useState({ name: '', phone: '', time: '12:00 pm', notes: '' })
  const [orderNumber] = useState(() => Math.floor(Math.random() * 9000) + 1000)
  const [activeCategory, setActiveCategory] = useState('All')

  const headerRef = useRef<HTMLDivElement>(null)
  const stepPanelRef = useRef<HTMLDivElement>(null)
  const confettiRef = useRef<HTMLDivElement>(null)

  const categories = ['All', 'Milk Teas', 'Fruit Teas', 'Seasonal Specials']

  const filteredDrinks =
    activeCategory === 'All'
      ? allDrinks
      : allDrinks.filter((d) => {
          if (activeCategory === 'Milk Teas') return ['Taro Milk Tea', 'Classic Milk Tea', 'Matcha Milk Tea', 'Oolong Milk Tea'].includes(d.name)
          if (activeCategory === 'Fruit Teas') return ['Mango Passion', 'Strawberry Lychee', 'Peach Oolong', 'Watermelon Mint'].includes(d.name)
          return ['Brown Sugar Boba', 'Lavender Latte', 'Hojicha Cream'].includes(d.name)
        })

  const orderTotal = orderItems.reduce((acc, item) => acc + getItemPrice(item) * item.qty, 0)

  function animateStepIn() {
    gsap.fromTo(
      stepPanelRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    )
  }

  function goToStep(s: Step) {
    gsap.to(stepPanelRef.current, {
      opacity: 0,
      y: -16,
      duration: 0.28,
      ease: 'power2.in',
      onComplete: () => {
        setStep(s)
        setTimeout(animateStepIn, 50)
      },
    })
  }

  function addToOrder() {
    if (!selectedDrink) return
    const item: OrderItem = {
      drink: selectedDrink,
      size: selectedSize,
      sugar: selectedSugar,
      ice: selectedIce,
      toppings: [...selectedToppings],
      qty: 1,
    }
    setOrderItems((prev) => [...prev, item])
    setSelectedDrink(null)
    setSelectedSize('Medium')
    setSelectedSugar('50%')
    setSelectedIce('Regular Ice')
    setSelectedToppings(['Tapioca Pearls'])
    goToStep(3)
  }

  function placeOrder() {
    if (!pickupForm.name || !pickupForm.phone) return
    goToStep(4)
    // Confetti burst
    setTimeout(() => {
      const container = confettiRef.current
      if (!container) return
      for (let i = 0; i < 30; i++) {
        const piece = document.createElement('div')
        const colors = ['#8b5ccc', '#f4a4c0', '#f5e060', '#3b2314', '#c9a0e8']
        piece.style.cssText = `
          position: absolute;
          left: ${20 + Math.random() * 60}%;
          top: 0;
          width: ${6 + Math.random() * 8}px;
          height: ${6 + Math.random() * 8}px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
          pointer-events: none;
        `
        container.appendChild(piece)
        gsap.to(piece, {
          y: 300 + Math.random() * 200,
          x: (Math.random() - 0.5) * 160,
          rotation: Math.random() * 720,
          opacity: 0,
          duration: 1.6 + Math.random() * 1,
          ease: 'power1.out',
          delay: Math.random() * 0.5,
          onComplete: () => piece.remove(),
        })
      }
    }, 200)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.15,
      })
      setTimeout(animateStepIn, 400)
    })
    return () => ctx.revert()
  }, [])

  // Stagger drink cards when category changes
  useEffect(() => {
    if (step !== 1) return
    gsap.fromTo(
      '.order-drink-card',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.55, ease: 'power3.out' }
    )
  }, [activeCategory, step])

  const stepLabels = ['Choose Drink', 'Customise', 'Review Order', 'Confirmed']

  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px 80px', position: 'relative', zIndex: 1 }}>
      <Leaf style={{ left: -30, top: 80 }} size={120} rotate={28} opacity={0.65} color="#5a9e4a" animate />
      <Leaf style={{ right: -20, top: 400 }} size={100} rotate={-40} opacity={0.5} flip color="#4a8e3a" animate />

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: 44 }}>
          <span
            style={{
              display: 'inline-block',
              background: '#8b5ccc',
              color: 'white',
              borderRadius: 999,
              padding: '6px 20px',
              fontWeight: 800,
              fontSize: 13,
              marginBottom: 20,
            }}
          >
            🧋 Pickup Orders
          </span>
          <h1
            style={{
              fontWeight: 900,
              fontSize: 'clamp(36px, 5vw, 54px)',
              color: '#3b2314',
              letterSpacing: '-1.5px',
              marginBottom: 12,
            }}
          >
            Order Now
          </h1>
          <p style={{ fontSize: 17, color: '#8a6050' }}>
            Build your perfect bubble tea — pick up at 6082 Quinpool Rd
          </p>
        </div>

        {/* Step indicator */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
            marginBottom: 40,
            flexWrap: 'wrap',
          }}
        >
          {stepLabels.map((label, i) => {
            const stepNum = (i + 1) as Step
            const active = step === stepNum
            const done = step > stepNum
            return (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: active
                      ? '#3b2314'
                      : done
                      ? 'rgba(139,92,204,0.15)'
                      : 'rgba(255,255,255,0.7)',
                    borderRadius: 999,
                    padding: '6px 16px 6px 8px',
                    transition: 'all 0.3s',
                    border: active ? 'none' : done ? '1.5px solid rgba(139,92,204,0.3)' : '1.5px solid rgba(59,35,20,0.12)',
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: active ? '#f4a4c0' : done ? '#8b5ccc' : 'rgba(59,35,20,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: 12,
                      color: active ? '#3b2314' : done ? 'white' : '#8a6050',
                      flexShrink: 0,
                    }}
                  >
                    {done ? '✓' : stepNum}
                  </div>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 13,
                      color: active ? '#f5f0d0' : done ? '#8b5ccc' : '#8a6050',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {label}
                  </span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div
                    style={{
                      width: 24,
                      height: 2,
                      background: done ? '#8b5ccc' : 'rgba(59,35,20,0.12)',
                      borderRadius: 2,
                      transition: 'background 0.3s',
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Step panel */}
        <div ref={stepPanelRef} style={{ opacity: 0 }}>

          {/* ── Step 1: Choose Drink ── */}
          {step === 1 && (
            <div>
              {/* Category filter */}
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  marginBottom: 28,
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      background: activeCategory === cat ? '#3b2314' : 'rgba(255,255,255,0.85)',
                      color: activeCategory === cat ? '#f5f0d0' : '#3b2314',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '8px 20px',
                      borderRadius: 999,
                      fontFamily: 'var(--font-nunito)',
                      fontWeight: 700,
                      fontSize: 14,
                      transition: 'all 0.2s',
                      boxShadow: activeCategory === cat ? '0 4px 14px rgba(59,35,20,0.2)' : '0 2px 8px rgba(59,35,20,0.07)',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: 18,
                }}
              >
                {filteredDrinks.map((drink) => {
                  const selected = selectedDrink?.name === drink.name
                  return (
                    <button
                      key={drink.name}
                      className="order-drink-card"
                      onClick={() => setSelectedDrink(selected ? null : drink)}
                      style={{
                        background: selected
                          ? `linear-gradient(135deg, ${drink.color1}22, ${drink.color2}44)`
                          : 'rgba(255,255,255,0.88)',
                        border: selected
                          ? `2.5px solid ${drink.color1}`
                          : '2px solid rgba(255,255,255,0.9)',
                        borderRadius: 24,
                        padding: '20px 16px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        boxShadow: selected
                          ? `0 8px 28px ${drink.color1}40`
                          : '0 4px 16px rgba(59,35,20,0.08)',
                        transition: 'all 0.22s cubic-bezier(.22,1,.36,1)',
                        transform: selected ? 'scale(1.04)' : 'scale(1)',
                        fontFamily: 'var(--font-nunito)',
                      }}
                      onMouseEnter={(e) => {
                        if (!selected) {
                          const el = e.currentTarget as HTMLElement
                          el.style.transform = 'translateY(-5px)'
                          el.style.boxShadow = '0 12px 32px rgba(59,35,20,0.13)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!selected) {
                          const el = e.currentTarget as HTMLElement
                          el.style.transform = ''
                          el.style.boxShadow = '0 4px 16px rgba(59,35,20,0.08)'
                        }
                      }}
                    >
                      {drink.tag && (
                        <span
                          style={{
                            display: 'inline-block',
                            background: '#f4a4c0',
                            color: '#3b2314',
                            borderRadius: 999,
                            padding: '2px 10px',
                            fontSize: 10,
                            fontWeight: 800,
                            marginBottom: 10,
                          }}
                        >
                          {drink.tag}
                        </span>
                      )}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginBottom: 12,
                          animation: 'float 4s ease-in-out infinite',
                        }}
                      >
                        <MiniDrink color1={drink.color1} color2={drink.color2} size={72} />
                      </div>
                      <div style={{ fontWeight: 800, fontSize: 15, color: '#3b2314', marginBottom: 4 }}>
                        {drink.name}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: drink.color1 }}>
                        {drink.price}
                      </div>
                      {selected && (
                        <div
                          style={{
                            marginTop: 10,
                            background: drink.color1,
                            color: 'white',
                            borderRadius: 999,
                            padding: '4px 12px',
                            fontSize: 12,
                            fontWeight: 800,
                          }}
                        >
                          ✓ Selected
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>

              <div style={{ textAlign: 'center', marginTop: 36 }}>
                <button
                  disabled={!selectedDrink}
                  onClick={() => goToStep(2)}
                  style={{
                    background: selectedDrink ? '#8b5ccc' : 'rgba(139,92,204,0.35)',
                    color: 'white',
                    border: 'none',
                    cursor: selectedDrink ? 'pointer' : 'not-allowed',
                    padding: '14px 48px',
                    borderRadius: 999,
                    fontFamily: 'var(--font-nunito)',
                    fontWeight: 800,
                    fontSize: 17,
                    boxShadow: selectedDrink ? '0 4px 20px rgba(139,92,204,0.35)' : 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedDrink) {
                      const el = e.currentTarget as HTMLElement
                      el.style.transform = 'translateY(-2px)'
                      el.style.boxShadow = '0 8px 28px rgba(139,92,204,0.45)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = ''
                    el.style.boxShadow = selectedDrink ? '0 4px 20px rgba(139,92,204,0.35)' : 'none'
                  }}
                >
                  {selectedDrink ? `Customise ${selectedDrink.name} →` : 'Select a drink to continue'}
                </button>
              </div>
            </div>
          )}

          {/* ── Step 2: Customise ── */}
          {step === 2 && selectedDrink && (
            <div>
              <div
                style={{
                  background: 'rgba(255,255,255,0.88)',
                  borderRadius: 28,
                  padding: '32px',
                  boxShadow: '0 4px 24px rgba(59,35,20,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.9)',
                }}
              >
                {/* Selected drink preview */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    marginBottom: 32,
                    paddingBottom: 28,
                    borderBottom: '1.5px solid rgba(59,35,20,0.08)',
                  }}
                >
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${selectedDrink.color1}20, ${selectedDrink.color2}40)`,
                      borderRadius: 20,
                      padding: '12px 16px',
                    }}
                  >
                    <MiniDrink color1={selectedDrink.color1} color2={selectedDrink.color2} size={64} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 22, color: '#3b2314' }}>
                      {selectedDrink.name}
                    </div>
                    <div style={{ fontSize: 14, color: '#8a6050', marginTop: 4, maxWidth: 360 }}>
                      {selectedDrink.desc}
                    </div>
                  </div>
                  <button
                    onClick={() => goToStep(1)}
                    style={{
                      marginLeft: 'auto',
                      background: 'rgba(59,35,20,0.06)',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: 999,
                      padding: '8px 16px',
                      fontFamily: 'var(--font-nunito)',
                      fontWeight: 700,
                      fontSize: 13,
                      color: '#8a6050',
                    }}
                  >
                    ← Change
                  </button>
                </div>

                {/* Size */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#3b2314', marginBottom: 12 }}>
                    Size
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {sizes.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => setSelectedSize(s.label)}
                        style={{
                          flex: 1,
                          background: selectedSize === s.label ? '#3b2314' : 'rgba(255,255,255,0.7)',
                          color: selectedSize === s.label ? '#f5f0d0' : '#3b2314',
                          border: selectedSize === s.label ? 'none' : '2px solid rgba(59,35,20,0.12)',
                          borderRadius: 16,
                          padding: '12px 8px',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-nunito)',
                          fontWeight: 800,
                          fontSize: 14,
                          textAlign: 'center',
                          transition: 'all 0.2s',
                        }}
                      >
                        <div>{s.label}</div>
                        <div style={{ fontSize: 11, marginTop: 2, opacity: 0.75 }}>{s.oz}</div>
                        {s.mod > 0 && (
                          <div style={{ fontSize: 11, marginTop: 2 }}>+${s.mod.toFixed(2)}</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sugar level */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#3b2314', marginBottom: 12 }}>
                    Sugar Level
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {sugarLevels.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSugar(s)}
                        style={{
                          background: selectedSugar === s ? '#8b5ccc' : 'rgba(255,255,255,0.7)',
                          color: selectedSugar === s ? 'white' : '#3b2314',
                          border: selectedSugar === s ? 'none' : '2px solid rgba(59,35,20,0.12)',
                          borderRadius: 999,
                          padding: '8px 18px',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-nunito)',
                          fontWeight: 700,
                          fontSize: 14,
                          transition: 'all 0.2s',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ice level */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#3b2314', marginBottom: 12 }}>
                    Ice Level
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {iceLevels.map((ice) => (
                      <button
                        key={ice}
                        onClick={() => setSelectedIce(ice)}
                        style={{
                          background: selectedIce === ice ? '#8b5ccc' : 'rgba(255,255,255,0.7)',
                          color: selectedIce === ice ? 'white' : '#3b2314',
                          border: selectedIce === ice ? 'none' : '2px solid rgba(59,35,20,0.12)',
                          borderRadius: 999,
                          padding: '8px 18px',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-nunito)',
                          fontWeight: 700,
                          fontSize: 14,
                          transition: 'all 0.2s',
                        }}
                      >
                        {ice}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toppings */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#3b2314', marginBottom: 12 }}>
                    Toppings
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
                      gap: 10,
                    }}
                  >
                    {toppings.map((t) => {
                      const checked = selectedToppings.includes(t.name)
                      return (
                        <button
                          key={t.name}
                          onClick={() =>
                            setSelectedToppings((prev) =>
                              checked ? prev.filter((x) => x !== t.name) : [...prev, t.name]
                            )
                          }
                          style={{
                            background: checked ? 'rgba(139,92,204,0.1)' : 'rgba(255,255,255,0.6)',
                            border: checked ? '2px solid #8b5ccc' : '2px solid rgba(59,35,20,0.1)',
                            borderRadius: 16,
                            padding: '10px 14px',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontFamily: 'var(--font-nunito)',
                            transition: 'all 0.18s',
                          }}
                        >
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontWeight: 700, fontSize: 13, color: '#3b2314' }}>
                              {t.name}
                            </div>
                            <div style={{ fontSize: 11, color: '#8a6050', marginTop: 1 }}>
                              {t.price}
                            </div>
                          </div>
                          <div
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: '50%',
                              background: checked ? '#8b5ccc' : 'rgba(59,35,20,0.08)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 12,
                              color: 'white',
                              flexShrink: 0,
                              transition: 'all 0.18s',
                            }}
                          >
                            {checked ? '✓' : ''}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Price & Add */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 16,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, color: '#8a6050', fontWeight: 600 }}>Item total</div>
                    <div style={{ fontWeight: 900, fontSize: 28, color: '#8b5ccc' }}>
                      {formatPrice(
                        getItemPrice({
                          drink: selectedDrink,
                          size: selectedSize,
                          sugar: selectedSugar,
                          ice: selectedIce,
                          toppings: selectedToppings,
                          qty: 1,
                        })
                      )}
                    </div>
                  </div>
                  <button
                    onClick={addToOrder}
                    style={{
                      background: '#3b2314',
                      color: '#f5f0d0',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '14px 36px',
                      borderRadius: 999,
                      fontFamily: 'var(--font-nunito)',
                      fontWeight: 800,
                      fontSize: 16,
                      boxShadow: '0 4px 20px rgba(59,35,20,0.25)',
                      transition: 'transform 0.15s, box-shadow 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.transform = 'translateY(-2px)'
                      el.style.boxShadow = '0 8px 28px rgba(59,35,20,0.3)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.transform = ''
                      el.style.boxShadow = '0 4px 20px rgba(59,35,20,0.25)'
                    }}
                  >
                    Add to Order →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Step 3: Review Order ── */}
          {step === 3 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 28,
              }}
            >
              {/* Order summary */}
              <div>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.88)',
                    borderRadius: 28,
                    padding: '28px',
                    boxShadow: '0 4px 24px rgba(59,35,20,0.08)',
                    border: '1.5px solid rgba(255,255,255,0.9)',
                    marginBottom: 16,
                  }}
                >
                  <div style={{ fontWeight: 900, fontSize: 20, color: '#3b2314', marginBottom: 20 }}>
                    Your Order
                  </div>

                  {orderItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '20px 0', color: '#8a6050' }}>
                      No items yet.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {orderItems.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            gap: 12,
                            alignItems: 'flex-start',
                            borderBottom: '1px solid rgba(59,35,20,0.07)',
                            paddingBottom: 14,
                          }}
                        >
                          <div
                            style={{
                              background: `linear-gradient(135deg, ${item.drink.color1}20, ${item.drink.color2}35)`,
                              borderRadius: 14,
                              padding: '8px',
                              flexShrink: 0,
                            }}
                          >
                            <MiniDrink color1={item.drink.color1} color2={item.drink.color2} size={44} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 800, fontSize: 15, color: '#3b2314' }}>
                              {item.drink.name}
                            </div>
                            <div style={{ fontSize: 12, color: '#8a6050', marginTop: 2, lineHeight: 1.6 }}>
                              {item.size} · {item.sugar} sugar · {item.ice}
                              {item.toppings.length > 0 && (
                                <><br />{item.toppings.join(', ')}</>
                              )}
                            </div>
                          </div>
                          <div style={{ fontWeight: 800, color: '#8b5ccc', fontSize: 15, flexShrink: 0 }}>
                            {formatPrice(getItemPrice(item))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Order more */}
                  <button
                    onClick={() => {
                      setSelectedDrink(null)
                      goToStep(1)
                    }}
                    style={{
                      marginTop: 16,
                      width: '100%',
                      background: 'rgba(139,92,204,0.1)',
                      color: '#8b5ccc',
                      border: '2px dashed rgba(139,92,204,0.35)',
                      borderRadius: 16,
                      padding: '10px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-nunito)',
                      fontWeight: 800,
                      fontSize: 14,
                      transition: 'all 0.2s',
                    }}
                  >
                    + Add another drink
                  </button>
                </div>

                {/* Total */}
                <div
                  style={{
                    background: '#3b2314',
                    borderRadius: 22,
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontWeight: 800, fontSize: 16, color: '#c9a888' }}>Total</span>
                  <span style={{ fontWeight: 900, fontSize: 26, color: '#f4a4c0' }}>
                    {formatPrice(orderTotal)}
                  </span>
                </div>
              </div>

              {/* Pickup details */}
              <div>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.88)',
                    borderRadius: 28,
                    padding: '28px',
                    boxShadow: '0 4px 24px rgba(59,35,20,0.08)',
                    border: '1.5px solid rgba(255,255,255,0.9)',
                  }}
                >
                  <div style={{ fontWeight: 900, fontSize: 20, color: '#3b2314', marginBottom: 20 }}>
                    Pickup Details
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[
                      { key: 'name', placeholder: 'Your name', type: 'text' },
                      { key: 'phone', placeholder: 'Phone number', type: 'tel' },
                    ].map((field) => (
                      <input
                        key={field.key}
                        placeholder={field.placeholder}
                        type={field.type}
                        value={pickupForm[field.key as keyof typeof pickupForm]}
                        onChange={(e) =>
                          setPickupForm((s) => ({ ...s, [field.key]: e.target.value }))
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

                    {/* Pickup time */}
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#8a6050', marginBottom: 8 }}>
                        Pickup Time
                      </div>
                      <select
                        value={pickupForm.time}
                        onChange={(e) => setPickupForm((s) => ({ ...s, time: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '12px 18px',
                          borderRadius: 16,
                          border: '2px solid rgba(59,35,20,0.12)',
                          fontFamily: 'var(--font-nunito)',
                          fontSize: 15,
                          color: '#3b2314',
                          background: '#faf8f0',
                          cursor: 'pointer',
                          appearance: 'none',
                        }}
                      >
                        {pickupTimes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* Notes */}
                    <textarea
                      placeholder="Any special requests? (optional)"
                      rows={3}
                      value={pickupForm.notes}
                      onChange={(e) => setPickupForm((s) => ({ ...s, notes: e.target.value }))}
                      style={{
                        padding: '12px 18px',
                        borderRadius: 16,
                        border: '2px solid rgba(59,35,20,0.12)',
                        fontFamily: 'var(--font-nunito)',
                        fontSize: 15,
                        color: '#3b2314',
                        background: '#faf8f0',
                        resize: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#8b5ccc'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(59,35,20,0.12)'
                      }}
                    />

                    <button
                      disabled={!pickupForm.name || !pickupForm.phone || orderItems.length === 0}
                      onClick={placeOrder}
                      style={{
                        background:
                          pickupForm.name && pickupForm.phone && orderItems.length > 0
                            ? '#8b5ccc'
                            : 'rgba(139,92,204,0.35)',
                        color: 'white',
                        border: 'none',
                        cursor:
                          pickupForm.name && pickupForm.phone && orderItems.length > 0
                            ? 'pointer'
                            : 'not-allowed',
                        padding: '15px',
                        borderRadius: 999,
                        fontFamily: 'var(--font-nunito)',
                        fontWeight: 800,
                        fontSize: 16,
                        boxShadow:
                          pickupForm.name && pickupForm.phone
                            ? '0 4px 20px rgba(139,92,204,0.35)'
                            : 'none',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        if (pickupForm.name && pickupForm.phone && orderItems.length > 0) {
                          const el = e.currentTarget as HTMLElement
                          el.style.transform = 'translateY(-2px)'
                          el.style.boxShadow = '0 8px 28px rgba(139,92,204,0.45)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.transform = ''
                        el.style.boxShadow =
                          pickupForm.name && pickupForm.phone
                            ? '0 4px 20px rgba(139,92,204,0.35)'
                            : 'none'
                      }}
                    >
                      Place Order →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Step 4: Confirmation ── */}
          {step === 4 && (
            <div style={{ textAlign: 'center', position: 'relative', padding: '20px 0 60px' }}>
              <div
                ref={confettiRef}
                style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
              />
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 96,
                  height: 96,
                  background: 'linear-gradient(135deg, #f4a4c0, #8b5ccc)',
                  borderRadius: '50%',
                  fontSize: 48,
                  marginBottom: 24,
                  boxShadow: '0 8px 32px rgba(139,92,204,0.3)',
                }}
              >
                🧋
              </div>
              <h2
                style={{
                  fontWeight: 900,
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  color: '#3b2314',
                  letterSpacing: '-1px',
                  marginBottom: 12,
                }}
              >
                Order Confirmed!
              </h2>
              <p style={{ fontSize: 18, color: '#8a6050', marginBottom: 32, lineHeight: 1.7 }}>
                Your order #{orderNumber} is in. We&apos;ll have your boba ready
                <br />
                at <strong style={{ color: '#8b5ccc' }}>6082 Quinpool Road</strong> for{' '}
                <strong style={{ color: '#3b2314' }}>{pickupForm.time}</strong> 🎉
              </p>

              {/* Order recap */}
              <div
                style={{
                  display: 'inline-block',
                  background: 'rgba(255,255,255,0.88)',
                  borderRadius: 24,
                  padding: '24px 32px',
                  boxShadow: '0 4px 24px rgba(59,35,20,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.9)',
                  marginBottom: 36,
                  textAlign: 'left',
                  maxWidth: 480,
                  width: '100%',
                }}
              >
                <div style={{ fontWeight: 800, fontSize: 16, color: '#3b2314', marginBottom: 14 }}>
                  🧾 Order #{orderNumber}
                </div>
                {orderItems.map((item, i) => (
                  <div key={i} style={{ fontSize: 14, color: '#7a5040', marginBottom: 8, lineHeight: 1.6 }}>
                    • {item.drink.name} ({item.size}, {item.sugar} sugar)
                    {item.toppings.length > 0 && ` + ${item.toppings.join(', ')}`}
                    {' — '}
                    <strong style={{ color: '#8b5ccc' }}>{formatPrice(getItemPrice(item))}</strong>
                  </div>
                ))}
                <div
                  style={{
                    borderTop: '1.5px solid rgba(59,35,20,0.08)',
                    marginTop: 12,
                    paddingTop: 12,
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 800,
                    fontSize: 16,
                    color: '#3b2314',
                  }}
                >
                  <span>Total</span>
                  <span style={{ color: '#8b5ccc' }}>{formatPrice(orderTotal)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="/menu"
                  style={{
                    background: '#3b2314',
                    color: '#f5f0d0',
                    padding: '13px 32px',
                    borderRadius: 999,
                    fontWeight: 800,
                    fontSize: 15,
                    textDecoration: 'none',
                    transition: 'transform 0.15s',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.transform = '')
                  }
                >
                  Browse Menu
                </a>
                <button
                  onClick={() => {
                    setOrderItems([])
                    setPickupForm({ name: '', phone: '', time: '12:00 pm', notes: '' })
                    goToStep(1)
                  }}
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    color: '#3b2314',
                    border: '2px solid rgba(59,35,20,0.15)',
                    padding: '11px 28px',
                    borderRadius: 999,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-nunito)',
                    fontWeight: 800,
                    fontSize: 15,
                    transition: 'transform 0.15s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.transform = '')
                  }
                >
                  Order Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  )
}
