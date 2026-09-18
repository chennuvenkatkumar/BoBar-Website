import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['var(--font-nunito)', 'sans-serif'],
      },
      colors: {
        cream: '#f5f0d0',
        brown: {
          DEFAULT: '#3b2314',
          light: '#7a5040',
          muted: '#8a6050',
          pale: '#c9a888',
        },
        purple: {
          DEFAULT: '#8b5ccc',
          light: '#c9a0e8',
          soft: '#d4c0f0',
        },
        pink: {
          DEFAULT: '#f4a4c0',
          soft: '#fce8f0',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'leaf-sway': 'leafSway 6s ease-in-out infinite',
        'blob-morph': 'blobMorph 8s ease-in-out infinite',
        pulse: 'pulse 2.5s ease-in-out infinite',
        'cart-pop': 'cartPop 0.4s cubic-bezier(.22,1,.36,1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        leafSway: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '30%': { transform: 'rotate(3deg)' },
          '70%': { transform: 'rotate(-3deg)' },
        },
        blobMorph: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.07) rotate(5deg)' },
        },
        cartPop: {
          '0%': { transform: 'translateX(-50%) translateY(20px) scale(0.92)', opacity: '0' },
          '100%': { transform: 'translateX(-50%) translateY(0) scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        card: '0 4px 24px rgba(59,35,20,0.08)',
        'card-hover': '0 16px 48px rgba(59,35,20,0.15)',
        nav: '0 4px 32px rgba(59,35,20,0.10)',
        'nav-scrolled': '0 8px 40px rgba(59,35,20,0.15)',
      },
    },
  },
  plugins: [],
}

export default config
