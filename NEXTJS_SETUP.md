# CPA Offer Directory & Smartlink Web Application
## Built with Next.js (App Router), Tailwind CSS, and Decap CMS

---

### 1. Color Scheme & UI Theme:
- **Background Color**: `#F7F2EB` (Warm Creamish Light)
- **Accent / CTA Button Color**: `#B5F714` (Vibrant Lime Green) with dark text (`#111A05` / `black`) inside buttons for high-contrast readability.
- **Secondary Elements & Borders**: Light sage/grayish borders (`#D2D9C5`) and clean typography on top of the cream background.
- **Admin Panel Visibility & Security**: The Admin Panel is completely hidden from regular site visitors. All visible "Admin", "CMS Admin", and Settings buttons have been removed from Navbar, Header, Sidebar, and Footer. Decap CMS is exclusively accessible via direct browser URL at `/admin` (`yoursite.com/admin`) authenticated via Netlify Identity.

---

### 2. Next.js App Router Structure

```
my-cpa-directory/
├── app/
│   ├── layout.tsx             # Root layout with warm cream #F7F2EB background
│   ├── page.tsx               # Homepage: Left sidebar + Top Ad Banner + Main Offer Table
│   ├── smartlinks/
│   │   └── page.tsx           # Dedicated Smartlink auto-routing directory
│   ├── categories/
│   │   └── page.tsx           # Category verticals & payout stats
│   ├── blog/
│   │   └── page.tsx           # Affiliate marketing & Adsterra monetization guides
│   ├── contact/
│   │   └── page.tsx           # Sponsor inquiries & offer submission
│   └── globals.css            # Tailwind CSS theme with #F7F2EB & #B5F714
├── components/
│   ├── Header.tsx             # Custom Logo, search bar, nav links, "Submit Offer" (#B5F714)
│   ├── LeftSidebar.tsx        # "FEATURED NETWORKS - Verified CPA & Smartlink Sponsors"
│   ├── TopAdBanner.tsx        # Adsterra / custom HTML script & image banner container
│   ├── OfferListingTable.tsx  # CPA table with overflow-x-auto, GEOs, Payout, "Run Offer" (#B5F714)
│   ├── OfferDetailModal.tsx   # Tracking link generator with rel="sponsored nofollow"
│   └── Footer.tsx             # Copyright "© 2026 Offer Directory", social links, newsletter
├── public/
│   ├── admin/
│   │   ├── config.yml         # Decap CMS collections (Offers, Sponsors, Ads)
│   │   └── index.html         # Decap CMS Netlify Identity entrypoint
│   └── uploads/               # Uploaded network logos and banner images
└── package.json
```

---

### 3. Next.js App Router Page Components

#### `app/layout.tsx`
```tsx
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'CPAHub.pro - OFFER & SMARTLINK DIRECTORY',
  description: 'Premier CPA offer and Smartlink directory featuring verified networks, real-time payouts, GEO filtering, and Decap CMS integration.',
  openGraph: {
    title: 'CPAHub.pro - OFFER & SMARTLINK DIRECTORY',
    description: 'Premier CPA offer and Smartlink directory featuring verified networks, real-time payouts, GEO filtering, and Decap CMS integration.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sansFont.variable} ${monoFont.variable} font-sans bg-[#F7F2EB] text-[#111A05] min-h-screen flex flex-col antialiased`}>
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

#### `app/page.tsx`
```tsx
import { LeftSidebar } from '@/components/LeftSidebar';
import { TopAdBanner } from '@/components/TopAdBanner';
import { OfferListingTable } from '@/components/OfferListingTable';

export default function HomePage() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Section: Featured Networks & Sponsors (3 cols) */}
        <aside className="lg:col-span-4 xl:col-span-3 w-full">
          <LeftSidebar />
        </aside>

        {/* Right Section: Top Ad Banner + Main Offer Table (9 cols) */}
        <section className="lg:col-span-8 xl:col-span-9 space-y-6 w-full min-w-0">
          <TopAdBanner />
          <div className="w-full min-w-0 overflow-hidden">
            <OfferListingTable />
          </div>
        </section>
      </div>
    </div>
  );
}
```

---

### 4. Tailwind CSS Theme Setup (`app/globals.css`)

```css
@import "tailwindcss";

@layer base {
  :root {
    --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --bg-cream: #F7F2EB;
    --accent-lime: #B5F714;
    --accent-lime-hover: #A2E20E;
    --primary-dark: #111A05;
    --text-primary: #1C2612;
    --text-muted: #54653D;
    --border-subtle: #D2D9C5;
  }

  body {
    background-color: #F7F2EB;
    color: #1C2612;
    font-family: var(--font-sans);
    overflow-x: hidden;
  }
}
```

---

### 5. Header Component (`components/Header.tsx`)
Features custom logo ("CPAHub.pro - OFFER & SMARTLINK DIRECTORY"), search bar ("Search offers, smartlinks, geos..."), navigation links, and "Submit Offer" CTA styled with `#B5F714` (Vibrant Lime Green) and dark text (`#111A05`). All visible admin links are removed:

```tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Layers, PlusCircle, Menu, X, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#D2D9C5] bg-[#F7F2EB]/95 backdrop-blur-md">
      {/* Ticker */}
      <div className="bg-[#EFE9DE] border-b border-[#D2D9C5] px-4 py-1 text-xs text-[#1C2612]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex h-2 w-2 rounded-full bg-[#B5F714] border border-[#111A05]/30 animate-pulse"></span>
            <span className="text-[#1C2612] font-bold">2026 Directory:</span>
            <span className="text-[#54653D] hidden sm:inline">1,240+ Verified CPA Offers, Direct Advertisers & Auto-Optimizing Smartlinks</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#54653D] shrink-0">
            <span className="hidden md:inline">Daily Sync Active</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B5F714]"></span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#111A05] text-[#B5F714] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 font-extrabold" />
            </div>
            <div>
              <div className="text-lg font-black tracking-tight text-[#111A05]">
                CPAHub<span className="text-[#54653D]">.pro</span>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[#54653D] font-bold -mt-1 hidden sm:block">
                Offer & Smartlink Directory
              </div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="h-4 w-4 text-[#54653D] absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search offers, smartlinks, geos..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#D2D9C5] rounded-xl text-[#111A05] placeholder-[#54653D]/70 focus:outline-none focus:ring-2 focus:ring-[#B5F714]"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="text-sm font-bold text-[#111A05] hover:text-[#54653D]">Offers</Link>
            <Link href="/smartlinks" className="text-sm font-bold text-[#54653D] hover:text-[#111A05] flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Top Smartlinks</span>
            </Link>
            <Link href="/categories" className="text-sm font-bold text-[#54653D] hover:text-[#111A05]">Categories</Link>
            <Link href="/blog" className="text-sm font-bold text-[#54653D] hover:text-[#111A05]">Blog</Link>
            <Link href="/contact" className="text-sm font-bold text-[#54653D] hover:text-[#111A05]">Contact</Link>
          </nav>

          {/* CTA: Submit Offer (Lime Green #B5F714 with Dark Text) */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-[#B5F714] hover:bg-[#A2E20E] text-[#111A05] border border-[#111A05]/20 shadow-xs transition-all active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Submit Offer</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
```

---

### 6. Left Featured Sidebar (`components/LeftSidebar.tsx`)
Displays "FEATURED NETWORKS - Verified CPA & Smartlink Sponsors" with logo, name, rating, and direct join link:

```tsx
import React from 'react';
import { Star, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  rating: number;
  tagline: string;
  minPayout: string;
  paymentFrequency: string;
  link: string;
}

const SPONSORS: Sponsor[] = [
  { id: '1', name: 'LosPollos', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80', rating: 4.9, tagline: 'Premier Smartlink Algorithm', minPayout: '$100', paymentFrequency: 'Weekly (Net-7)', link: 'https://lospollos.com' },
  { id: '2', name: 'ClickDealer', logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80', rating: 4.8, tagline: 'Global Direct Advertisers', minPayout: '$50', paymentFrequency: 'Bi-Weekly / Weekly', link: 'https://clickdealer.com' },
  { id: '3', name: 'Mobidea', logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&auto=format&fit=crop&q=80', rating: 4.7, tagline: 'Mobile Content & CPA Leader', minPayout: '$50', paymentFrequency: 'Weekly', link: 'https://mobidea.com' }
];

export const LeftSidebar: React.FC = () => {
  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-5 min-w-0 max-w-full">
      <div className="rounded-2xl border border-[#D2D9C5] bg-white p-4 shadow-xs">
        <div className="pb-3 border-b border-[#D2D9C5]">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="p-2 rounded-xl bg-[#EFE9DE] text-[#111A05] border border-[#D2D9C5] shrink-0">
              <Zap className="w-4 h-4 fill-[#B5F714] text-[#111A05]" />
            </span>
            <div className="min-w-0">
              <h2 className="text-xs font-black text-[#111A05] uppercase tracking-wider truncate">
                FEATURED NETWORKS
              </h2>
              <p className="text-[11px] text-[#54653D] font-medium truncate">
                Verified CPA & Smartlink Sponsors
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3.5 space-y-3">
          {SPONSORS.map((sponsor) => (
            <div key={sponsor.id} className="rounded-xl border border-[#D2D9C5] bg-[#FAF7F2] p-3 hover:border-[#111A05]/40 hover:bg-white transition-all shadow-2xs">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#D2D9C5] bg-white shrink-0 p-1 flex items-center justify-center">
                  <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-contain rounded" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="font-extrabold text-sm text-[#111A05] truncate">{sponsor.name}</span>
                    <div className="flex items-center gap-1 font-mono text-xs text-[#111A05] bg-[#EFE9DE] px-1.5 py-0.5 rounded-lg border border-[#D2D9C5] font-bold">
                      <Star className="w-3 h-3 fill-[#111A05] text-[#111A05]" />
                      <span>{sponsor.rating}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#54653D] truncate mt-0.5 font-medium">{sponsor.tagline}</p>
                  <div className="mt-2.5">
                    <a
                      href={sponsor.link}
                      target="_blank"
                      rel="sponsored nofollow"
                      className="w-full inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg bg-[#B5F714] text-[#111A05] border border-[#111A05]/20 hover:bg-[#A2E20E] transition-all text-center shadow-2xs"
                    >
                      <span>Join Network</span>
                      <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
```

---

### 7. Main Offer Table with `overflow-x-auto` & Lime CTA Button

```tsx
import React from 'react';
import { ExternalLink } from 'lucide-react';

export const OfferListingTable: React.FC<{ offers: any[] }> = ({ offers }) => {
  return (
    <div className="w-full max-w-full overflow-hidden rounded-2xl border border-[#D2D9C5] bg-white shadow-xs">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[720px]">
          <thead>
            <tr className="border-b border-[#D2D9C5] bg-[#FAF7F2] text-[11px] font-bold text-[#54653D] uppercase tracking-wider font-mono">
              <th className="py-3.5 px-4 w-[34%]">Offer Title</th>
              <th className="py-3.5 px-3 w-[14%]">Network Badge</th>
              <th className="py-3.5 px-3 w-[13%]">Category Badge</th>
              <th className="py-3.5 px-3 w-[13%]">Supported GEOs</th>
              <th className="py-3.5 px-3 text-right w-[11%]">Metrics</th>
              <th className="py-3.5 px-4 text-right w-[15%]">Payout</th>
              <th className="py-3.5 px-4 text-center shrink-0">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D2D9C5] text-sm">
            {offers.map((offer) => (
              <tr key={offer.id} className="hover:bg-[#FAF7F2]/80 transition-colors">
                <td className="py-3.5 px-4 max-w-[260px] break-words">
                  <div className="font-extrabold text-[#111A05] leading-snug">{offer.title}</div>
                  <div className="text-xs text-[#54653D] font-medium mt-1">{offer.type} · {offer.device}</div>
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold bg-[#FAF7F2] text-[#111A05] border border-[#D2D9C5] font-mono">
                    {offer.network}
                  </span>
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs text-[#54653D] bg-[#EFE9DE] border border-[#D2D9C5] font-semibold">
                    {offer.category}
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-1 flex-wrap max-w-[130px]">
                    {offer.targetGeos.slice(0, 3).map((geo: string) => (
                      <span key={geo} className="px-1.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#FAF7F2] text-[#111A05] border border-[#D2D9C5]">
                        {geo}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-3 text-right whitespace-nowrap font-mono text-xs">
                  <div className="text-[#111A05] font-bold">{offer.epc} <span className="text-[10px] text-[#54653D]">EPC</span></div>
                  <div className="text-[#54653D] text-[11px] font-bold">{offer.cr} <span className="text-[10px]">CR</span></div>
                </td>
                <td className="py-3.5 px-4 text-right whitespace-nowrap font-mono">
                  <div className="text-sm sm:text-base font-black text-[#111A05]">
                    {offer.payout}
                  </div>
                </td>
                <td className="py-3.5 px-4 text-center whitespace-nowrap shrink-0">
                  <a
                    href={offer.affiliateUrl}
                    target="_blank"
                    rel="sponsored nofollow"
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-[#B5F714] hover:bg-[#A2E20E] text-[#111A05] border border-[#111A05]/20 shadow-xs active:scale-95 transition-all"
                  >
                    <span>Run Offer</span>
                    <ExternalLink className="w-3 h-3 stroke-[2.5]" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
```

---

### 8. Production Decap CMS Configuration (`public/admin/config.yml`)

The production configuration file with Netlify Identity and Git Gateway backend:

```yaml
backend:
  name: git-gateway
  branch: main

local_backend: true
media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  # 1. Offers Collection
  - name: "offers"
    label: "CPA Offers & Smartlinks"
    folder: "content/offers"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Offer Name", name: "title", widget: "string" }
      - { label: "Category", name: "category", widget: "select", options: ["Dating", "Gaming", "E-commerce", "Finance & Crypto", "Nutra & Health", "Sweepstakes", "Software & Utilities", "Smartlinks", "Surveys & Rewards"] }
      - { label: "Payout Amount", name: "payout", widget: "string" }
      - { label: "Payout Value Numeric", name: "payoutValue", widget: "number", value_type: "float" }
      - { label: "Smartlink / Affiliate URL", name: "affiliateUrl", widget: "string" }
      - { label: "Target Countries / GEOs", name: "targetGeos", widget: "list" }
      - { label: "Network Name", name: "network", widget: "string" }
      - { label: "Offer Type", name: "type", widget: "select", options: ["CPA", "CPL", "Smartlink", "RevShare", "CPI"] }
      - { label: "Description", name: "description", widget: "markdown" }

  # 2. Featured Sidebar Items (Left Section)
  - name: "featured_networks"
    label: "Featured Sponsors & Networks"
    folder: "content/sponsors"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Sponsor/Network Name", name: "name", widget: "string" }
      - { label: "Logo Image", name: "logo", widget: "image" }
      - { label: "Rating Score", name: "rating", widget: "number", value_type: "float", min: 1, max: 5 }
      - { label: "Target Link", name: "link", widget: "string" }
      - { label: "Min Payout", name: "minPayout", widget: "string" }
      - { label: "Payment Frequency", name: "paymentFrequency", widget: "string" }

  # 3. Ad Spaces & Adsterra Scripts (Right Banner Section)
  - name: "ad_spaces"
    label: "Ad Spaces & Adsterra Scripts"
    folder: "content/ads"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Ad Placement Name", name: "name", widget: "string" }
      - { label: "Ad Type", name: "adType", widget: "select", options: ["Raw HTML Script Code (Adsterra/Popads)", "Image Banner with Link"] }
      - { label: "Active Toggle", name: "active", widget: "boolean", default: true }
      - { label: "Raw HTML / Script Code", name: "htmlCode", widget: "code", required: false }
      - { label: "Image Banner URL", name: "imageUrl", widget: "image", required: false }
      - { label: "Destination Target URL", name: "targetUrl", widget: "string", required: false }
```

---

### 9. Decap CMS HTML Entrypoint (`public/admin/index.html`)

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Decap CMS Admin Panel | CPA Offer Directory</title>
  <!-- Netlify Identity Widget for authentication on Netlify -->
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <!-- Decap CMS script -->
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
  <script>
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
  </script>
</body>
</html>
```

---

### 10. Deployment & Admin Access Guide

1. **Deploy to Netlify**:
   - Push repository to GitHub/GitLab.
   - Connect repository to Netlify.
   - In Netlify: Go to **Settings** → **Identity** → click **Enable Identity**.
   - Under **Services** → click **Enable Git Gateway**.
   - Under **Registration preferences**, set to **Invite only** so random users cannot create CMS accounts.
2. **Accessing Decap CMS**:
   - The regular website will **never** display any Admin or CMS buttons to normal visitors.
   - Only authorized administrators access the panel by navigating directly to `https://yoursite.com/admin/`.
   - Log in using Netlify Identity to manage Offers, Sidebar Sponsors, and Adsterra ad scripts.
