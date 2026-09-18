<div align="center">

# 🧋 BoBar Website

### *A playful, animated bubble tea experience for Halifax's favourite boba shop*

<p>
  <img src="https://img.shields.io/badge/Next.js-15.3.2-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-149eca?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/GSAP-3.12.5-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
</p>

<p>
  <strong>BoBar</strong> is a modern, responsive marketing and ordering website for a Halifax bubble tea shop. It combines a warm visual identity, handcrafted SVG illustrations, motion-driven interactions, menu browsing, and a multi-step pickup-order experience.
</p>

</div>

---

## 📋 Table of Contents

- [✨ Highlights](#-highlights)
- [🧭 Pages and User Flows](#-pages-and-user-flows)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Project Structure](#️-project-structure)
- [🚀 Local Setup](#-local-setup)
- [📜 Available Scripts](#-available-scripts)
- [🧠 Implementation Notes](#-implementation-notes)
- [🗺️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Highlights

- **Immersive landing page** with animated hero content, drink highlights, feature cards, store statistics, and a visit-us call to action.
- **Interactive menu** grouped into Milk Teas, Fruit Teas, Seasonal Specials, and Toppings.
- **Client-side cart interaction** that lets visitors add drinks and see a floating order reminder.
- **Custom pickup ordering flow** with four steps:
  1. Choose a drink
  2. Customise size, sugar, ice, and toppings
  3. Review the order and enter pickup details
  4. View a confirmation screen with an order number and confetti animation
- **Dynamic pricing** for drink sizes and toppings through the shared pricing utility.
- **About page** featuring BoBar's story, timeline, values, and team.
- **Find Us page** with store address, opening hours, contact details, an illustrated map, and a contact form interaction.
- **Responsive navigation** with active route states, desktop links, and a mobile menu.
- **Custom visual system** using cream, brown, purple, and pink brand colors, Nunito typography, glass-style cards, rounded pill controls, and handcrafted SVG drink illustrations.
- **Motion throughout the experience** using GSAP timelines, ScrollTrigger reveals, floating particles, animated leaves, pulsing map elements, and page-level decorative backgrounds.

> **Note:** The current ordering and contact experiences are frontend-only demonstrations. Orders and messages are held in local React state and are not sent to a backend or payment provider yet.

---

## 🧭 Pages and User Flows

| Route | Purpose |
| --- | --- |
| `/` | Brand landing page, featured drinks, store highlights, and navigation into the menu or location page |
| `/menu` | Browse drinks by category and add items to a lightweight client-side cart |
| `/about` | Learn about BoBar's history, values, and team |
| `/find-us` | View the Halifax location, hours, contact links, map illustration, and message form |
| `/order-now` | Build a customised pickup order through the complete four-step ordering flow |

### Ordering flow

The order builder uses shared data from `lib/data/menu-data.ts` and pricing logic from `lib/utils/pricing.ts`:

```text
Choose Drink
    ↓
Customise
(size → sugar → ice → toppings)
    ↓
Review Order
(items → pickup details → total)
    ↓
Confirmed
(order number → pickup time → order recap)
```

---

## 🛠️ Tech Stack

| Layer | Technology | Role |
| --- | --- | --- |
| Framework | [Next.js](https://nextjs.org/) 15.3.2 | App Router, layouts, routing, and production builds |
| UI | [React](https://react.dev/) 19 | Interactive page components and local state |
| Language | [TypeScript](https://www.typescriptlang.org/) 5 | Typed components, menu data, and order models |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 3.4 + custom CSS | Theme tokens, utility classes, responsive styling, and animations |
| Animation | [GSAP](https://gsap.com/) 3.12.5 | Entrance animations, hover motion, ScrollTrigger effects, and confetti |
| Typography | [Nunito](https://fonts.google.com/specimen/Nunito) | Friendly rounded typography loaded through `next/font/google` |

---

## 🏗️ Project Structure

```text
BoBar-Website/
├── README.md                         # Project documentation
├── .gitignore
└── Bobar/
    ├── app/
    │   ├── layout.tsx                # Root layout, metadata, navigation, footer, global effects
    │   ├── page.tsx                  # Home page and hero experience
    │   ├── globals.css                # Global theme, Tailwind layers, and shared animations
    │   ├── about/page.tsx             # BoBar story, timeline, values, and team
    │   ├── menu/page.tsx              # Category-based menu and client-side cart interaction
    │   ├── find-us/page.tsx           # Location, hours, map, contact details, and form
    │   └── order-now/page.tsx         # Multi-step pickup order builder
    ├── components/
    │   ├── layout/
    │   │   ├── Nav.tsx                # Responsive navigation and active route state
    │   │   └── Footer.tsx             # Site footer, page links, address, and hours
    │   ├── effects/
    │   │   ├── BobaParticles.tsx      # Floating decorative boba particles
    │   │   ├── BubbleBackground.tsx   # Animated blurred SVG background shapes
    │   │   └── Leaf.tsx                # Decorative animated leaf illustration
    │   └── ui/
    │       ├── BobaIllustration.tsx   # Large reusable animated boba SVG
    │       └── MiniDrink.tsx           # Compact drink illustration for cards
    ├── lib/
    │   ├── data/menu-data.ts          # Drinks, toppings, sizes, sugar, and ice options
    │   └── utils/pricing.ts           # Item price calculation and currency formatting
    ├── types/index.ts                 # MenuItem and OrderItem TypeScript models
    ├── next.config.ts                 # Next.js configuration
    ├── tailwind.config.ts             # Theme colors, fonts, shadows, and keyframes
    ├── postcss.config.mjs             # PostCSS configuration
    ├── tsconfig.json                  # TypeScript compiler configuration
    ├── package.json                   # Scripts and dependencies
    └── package-lock.json              # Locked dependency versions
```

### How it fits together

`app/layout.tsx` provides the shared shell for every route: Nunito typography, animated background layers, the responsive `Nav`, and the `Footer`. Each route is implemented as an App Router page, while reusable illustrations and decorative effects live under `components/`.

Menu and ordering pages consume the central catalog in `lib/data/menu-data.ts`. The order builder combines a selected `MenuItem` with size, sugar, ice, and topping choices, then calculates totals through `getItemPrice()` in `lib/utils/pricing.ts`.

---

## 🚀 Local Setup

### Prerequisites

- Node.js 18.18+ recommended
- npm 9+ recommended
- A modern browser with JavaScript enabled

### 1. Clone the repository

```bash
git clone https://github.com/chennuvenkatkumar/BoBar-Website.git
cd BoBar-Website/Bobar
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Create a production build

```bash
npm run build
npm run start
```

The project does not currently require environment variables for its frontend-only flows.

---

## 📜 Available Scripts

Run these commands from the `Bobar/` directory:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create an optimised production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run the configured Next.js lint command |

---

## 🧠 Implementation Notes

### Centralised menu configuration

All drinks and customisation options are defined in one place:

```text
lib/data/menu-data.ts
├── menuData
│   ├── Milk Teas
│   ├── Fruit Teas
│   ├── Seasonal Specials
│   └── Toppings
├── allDrinks
├── toppings
├── sizes
├── sugarLevels
└── iceLevels
```

This keeps the `/menu` and `/order-now` experiences consistent and makes it straightforward to add or update products.

### Price calculation

`lib/utils/pricing.ts` calculates each item total from:

```text
base drink price + selected size modifier + selected topping prices
```

`formatPrice()` then presents the result as a two-decimal currency value such as `$8.25`.

### Animation architecture

GSAP is used for both initial page reveals and scroll-based interactions. Components register `ScrollTrigger` where needed and clean up animation contexts when unmounted. Decorative effects such as `BubbleBackground`, `BobaParticles`, and `Leaf` remain pointer-free so they do not interfere with navigation or forms.

### Current backend boundary

The repository currently provides a polished frontend prototype. The following integrations are natural next steps but are not implemented yet:

- Persisting orders to an API or database
- Sending contact-form messages
- Payment processing
- Real-time order status updates
- Authentication or customer accounts

---

## 🗺️ Roadmap

- [ ] Connect pickup orders to a backend service
- [ ] Add order persistence and status tracking
- [ ] Integrate payment processing
- [ ] Send contact-form submissions to the BoBar team
- [ ] Add automated tests for pricing and ordering flows
- [ ] Add accessibility audits and keyboard-flow coverage
- [ ] Add deployment documentation and production environment configuration

---

## 🤝 Contributing

Contributions are welcome. To propose a change:

1. Fork the repository.
2. Create a focused branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Make your changes inside `Bobar/`.
4. Run the build and lint checks:

   ```bash
   npm run build
   npm run lint
   ```

5. Commit your work and open a pull request with a clear description of the user-facing impact.

When adding a new drink, update `lib/data/menu-data.ts` so the menu and order builder continue to share the same source of truth.

---

<div align="center">

**Crafted with 🧋 and motion in Halifax, Nova Scotia**

</div>
