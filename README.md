# 🧪 Next.js Rendering Strategies Lab

A hands-on reference project demonstrating all four core rendering strategies in **Next.js 14 App Router** — SSR, SSG, ISR, and CSR — with real data, live UI, and deployed on Vercel.

🔗 **Live Demo:** [nextjs-render-strategies-lab-psi.vercel.app](https://nextjs-render-strategies-lab-psi.vercel.app)

---

## 📌 Why I Built This

Most developers can define SSR, SSG, ISR, and CSR — but struggle to explain *when* and *why* to use each one in a real project.

This lab makes each strategy tangible by building a dedicated page for each — same UI layout, real data — so you can see the behavioral difference, not just the theory.

---

## 🚀 Rendering Strategies Covered

### ⚡ SSR — Server Side Rendering (`/ssr`)
- Data fetched **fresh on every request** from the server
- Implemented using `async` Server Component with `cache: 'no-store'`
- **Use case:** Dashboards, user-specific pages, real-time data

### 🏗️ SSG — Static Site Generation (`/ssg`)
- HTML generated **at build time**, served instantly from CDN
- Zero server load at runtime — fastest possible response
- **Use case:** Blog posts, marketing pages, documentation

### 🔄 ISR — Incremental Static Regeneration (`/isr`)
- Static page that **auto-regenerates in the background** after a set interval
- Best of both worlds — speed of SSG + freshness of SSR
- **Use case:** Product listings, news articles, content that updates occasionally

### 💻 CSR — Client Side Rendering (`/csr`)
- Data fetched **in the browser** after page load using `useEffect` + `useState`
- Marked with `'use client'` directive — runs entirely on the client
- **Use case:** Interactive widgets, user-specific UI, non-SEO pages

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework + rendering strategies |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Vercel | Deployment |

---

## 📁 Project Structure
app/

├── page.tsx                  → Home — strategy comparison overview

├── ssr/

│   └── page.tsx              → SSR demo — fresh data every request

├── ssg/

│   └── page.tsx              → SSG demo — pre-built at deploy time

├── isr/

│   └── page.tsx              → ISR demo — revalidates every 60s

├── csr/

│   └── page.tsx              → CSR demo — client-side fetch

└── api/

└── dashboard/

└── route.ts          → API route
lib/

└── dashboard.ts              → Shared data functions

---

## 🐛 Key Bug Fixed in Production

During deployment, the SSR and ISR pages crashed on Vercel with:
Error: connect ECONNREFUSED 127.0.0.1:3000

**Root cause:** The page was fetching from `http://localhost:3000/api/dashboard` — which works locally but fails on Vercel because there is no `localhost` in a serverless environment.

**Fix:** Moved data logic into a shared `lib/dashboard.ts` function and called it directly inside the Server Component — no `fetch()` needed for internal API routes.

```ts
// ❌ Before — breaks on Vercel
const res = await fetch('http://localhost:3000/api/dashboard')

// ✅ After — works everywhere
import { getDashboardData } from '@/lib/dashboard'
const data = await getDashboardData()
```

This is the kind of real-world production gotcha that tutorials skip.

---

## 📊 When to Use Which Strategy

| Strategy | Data Freshness | Performance | SEO | Use When |
|---|---|---|---|---|
| SSR | Every request | Medium | ✅ | User-specific or real-time data |
| SSG | Build time | Fastest | ✅ | Rarely changing content |
| ISR | Interval-based | Fast | ✅ | Occasional updates needed |
| CSR | Client fetch | Depends | ❌ | Interactivity over SEO |

---

## 🏃 Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/Suryansh65/nextjs-render-strategies-lab

# 2. Install dependencies
cd nextjs-render-strategies-lab
npm install

# 3. Start dev server
npm run dev

# 4. Open in browser
http://localhost:3000
```

> No environment variables required — all data is handled via internal lib functions.

---

## 📚 Learnings

- How Next.js App Router handles rendering at the file level
- Difference between Server Components and Client Components
- Why `localhost` fetch calls fail in serverless deployments
- How ISR revalidation works in background without blocking requests
- Proper way to share data logic between pages without redundant API calls

---

## 👤 Author

**Suryansh Agrawal** — Full Stack Developer | Angular · React · Next.js · TypeScript

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/suryansh-agrawal-334aa2358)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github)](https://github.com/Suryansh65)
[![Live Demo](https://img.shields.io/badge/Vercel-Live%20Demo-000?style=flat&logo=vercel)](https://nextjs-render-strategies-9o9wj69c4-surryanshs-projects.vercel.app)
