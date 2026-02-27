# CiboSync 🍽️

> **AI-powered WhatsApp Waste & Revenue Agent for Italian restaurants**

CiboSync connects to a restaurant's POS/inventory system, predicts what will go unsold each day, and automatically generates personalised WhatsApp flash-sale offers to loyal customers — recovering revenue that would otherwise be thrown away.

Think **Too Good To Go** meets **AI sales agent**, but white-labelled for the restaurant and running natively on WhatsApp instead of a marketplace app.

---

## The Problem

Italian restaurants waste an average of **12–18% of daily food inventory** worth €80–200/day. Current solutions (Too Good To Go, Karma) require the restaurant to join a third-party marketplace, dilute the brand, and attract deal-hunters rather than loyal regulars.

## The Solution

CiboSync runs as the restaurant's own private agent:

1. **Reads inventory** from the POS (or manual entry) at 15:00 each day
2. **Predicts** what won't sell tonight using AI + historical patterns
3. **Crafts personalised WhatsApp messages** to loyal customer segments
4. **Tracks** revenue recovered vs. waste prevented
5. **Learns** from customer responses to improve future predictions

**Example message sent at 16:30:**
> 🐟 Ciao Giulia! Stasera abbiamo del tonno fresco fantastico che non vogliamo sprecare.
> Tartare di tonno per 2 persone → **€8 invece di €22** — solo 5 porzioni!
> Prenota subito: [link] ⏳ Offerta valida fino alle 19:30

---

## Business Model

| Tier | Target | Price | Features |
|------|--------|-------|----------|
| **Starter** | 1 location | €49/mo | Up to 500 WhatsApp msgs/mo, basic predictions |
| **Pro** | 1–3 locations | €129/mo | Unlimited msgs, advanced AI, analytics |
| **Enterprise** | Chains / Groups | €399+/mo | Multi-location, white-label, API access |

**Unit economics:** Average restaurant recovers €45–90/day → ~€1,200–2,500/month additional revenue on a €49–129 subscription.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend API | Fastify + TypeScript |
| AI Agent | OpenAI GPT-4o |
| WhatsApp | WhatsApp Business API (Meta) |
| Frontend | Next.js 14 + Tailwind CSS |
| Database | Supabase (PostgreSQL + Realtime) |
| Payments | Stripe |
| Hosting | Railway (API) + Vercel (Web) |
| Monorepo | pnpm workspaces |

---

## Project Structure

```
cibosync/
├── apps/
│   ├── api/          # Fastify backend
│   │   ├── src/
│   │   │   ├── routes/       # inventory, predictions, whatsapp, campaigns
│   │   │   ├── services/     # AI agent, waste predictor, WhatsApp
│   │   │   ├── plugins/      # Supabase, auth
│   │   │   └── types/
│   └── web/          # Next.js frontend
│       ├── app/
│       │   ├── page.tsx      # Landing page
│       │   ├── dashboard/    # Restaurant dashboard
│       │   └── api/webhooks/ # Stripe webhooks
│       └── components/       # WasteTracker, RevenueRecovery, WhatsAppPreview
├── packages/
│   └── shared/       # TypeScript types + constants
├── SPRINT_LOG.md     # Daily progress log
└── .env.example
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm 8+
- Supabase account
- OpenAI API key
- WhatsApp Business API access (Meta)
- Stripe account

### Installation

```bash
# Clone the repo
git clone https://github.com/BabaScience/cibosync.git
cd cibosync

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
# Edit .env with your API keys

# Start development servers
pnpm dev
```

### Environment Setup

See `.env.example` for all required environment variables.

---

## Sprint Log

See [SPRINT_LOG.md](./SPRINT_LOG.md) for daily progress.

**Day 1 (2026-02-27):** Market research, competitive analysis, project scaffold ✅

---

## License

MIT — see LICENSE
