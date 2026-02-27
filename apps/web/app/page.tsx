'use client';

import { useState } from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────
interface PricingPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

interface Testimonial {
  name: string;
  role: string;
  restaurant: string;
  city: string;
  quote: string;
  recovered: string;
}

interface Stat {
  value: string;
  label: string;
  sublabel: string;
}

// ─── Data ───────────────────────────────────────────────────────────────────
const STATS: Stat[] = [
  { value: '€127', label: 'avg daily waste', sublabel: 'per Italian restaurant' },
  { value: '68%', label: 'recovery rate', sublabel: 'with CiboSync AI' },
  { value: '4 min', label: 'setup time', sublabel: 'zero POS integration needed' },
  { value: '34x', label: 'avg ROI', sublabel: 'vs subscription cost' },
];

const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    price: 49,
    period: 'month',
    description: 'Perfect for a single location getting started',
    features: [
      'Up to 500 WhatsApp messages/month',
      'Basic AI waste predictions',
      'Manual inventory input',
      '1 customer segment',
      'Email support',
      'Basic analytics dashboard',
    ],
    cta: 'Start free trial',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 129,
    period: 'month',
    description: 'For restaurants serious about waste reduction',
    features: [
      'Unlimited WhatsApp messages',
      'Advanced GPT-4o AI predictions',
      'POS integration (Cassa in Cloud, Lightspeed)',
      'Up to 5 customer segments',
      'Priority support',
      'Full analytics + revenue attribution',
      'A/B testing for messages',
      'Custom message templates',
    ],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 399,
    period: 'month',
    description: 'For restaurant groups and chains',
    features: [
      'Everything in Pro',
      'Up to 10 locations',
      'White-label (your branding)',
      'Custom POS integrations',
      'Dedicated account manager',
      'SLA guarantee',
      'API access',
      'Custom AI training on your data',
    ],
    cta: 'Contact sales',
    highlighted: false,
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Marco Rossi',
    role: 'Owner',
    restaurant: 'Trattoria della Nonna',
    city: 'Milan',
    quote:
      'Before CiboSync I was throwing €80 of fish and pasta every Thursday. Now I send a WhatsApp at 4pm and it\'s all sold by 7pm. My regulars love the exclusivity.',
    recovered: '€1,840/mo',
  },
  {
    name: 'Chiara Bianchi',
    role: 'Manager',
    restaurant: 'Osteria del Porto',
    city: 'Genova',
    quote:
      'The AI knows my customers better than I do. It suggested sending the seafood offers only to customers who ordered fish before. Conversion went from 12% to 67%.',
    recovered: '€2,210/mo',
  },
  {
    name: 'Lorenzo Ferrari',
    role: 'Chef-Owner',
    restaurant: 'Ristorante Fiorenza',
    city: 'Florence',
    quote:
      'I was sceptical about AI. But this is just WhatsApp messages that actually work. Setup took 4 minutes. First campaign sold 8 portions of bistecca in 20 minutes.',
    recovered: '€1,560/mo',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Connect your inventory',
    description:
      'Link your POS system or manually enter today\'s inventory in 2 minutes. CiboSync learns your patterns over time.',
    icon: '📦',
  },
  {
    step: '02',
    title: 'AI predicts what won\'t sell',
    description:
      'Every day at 15:00, our GPT-4o agent analyses inventory + historical data + local events to flag waste-risk items.',
    icon: '🤖',
  },
  {
    step: '03',
    title: 'WhatsApp campaigns send automatically',
    description:
      'Personalised flash-sale messages go to the right customers at 16:30. Each message is unique — not a bulk blast.',
    icon: '💬',
  },
  {
    step: '04',
    title: 'Revenue recovered, waste prevented',
    description:
      'Track what sold, what revenue you recovered, and how much waste you prevented. The AI improves with every campaign.',
    icon: '📈',
  },
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: submit to Supabase waitlist table
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            <span className="font-bold text-gray-900 text-lg">CiboSync</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#how-it-works" className="hover:text-gray-900 transition-colors">Come funziona</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Prezzi</a>
            <a href="#testimonials" className="hover:text-gray-900 transition-colors">Testimonianze</a>
          </div>
          <a
            href="#waitlist"
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Prova gratis
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Nuovo: integrazione con Cassa in Cloud
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Trasforma gli sprechi
            <br />
            <span className="text-gradient">in guadagni</span>
          </h1>

          <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
            CiboSync predice cosa non venderai stasera e manda offerte flash personalizzate
            ai tuoi clienti fedeli via WhatsApp — automaticamente.
          </p>

          <p className="text-sm text-gray-500 mb-10">
            I ristoranti italiani sprecano in media <strong>€127/giorno</strong>. CiboSync ne recupera il 68%.
          </p>

          {/* WhatsApp Preview */}
          <div className="relative max-w-sm mx-auto mb-12">
            <div className="bg-[#e5ddd5] rounded-2xl p-4 shadow-xl">
              <div className="bg-[#075e54] rounded-t-2xl px-4 py-3 flex items-center gap-3 -mx-4 -mt-4 mb-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm">🍽️</div>
                <div className="text-left">
                  <div className="text-white text-sm font-medium">Trattoria della Nonna</div>
                  <div className="text-green-300 text-xs">online</div>
                </div>
              </div>
              <div className="bg-[#dcf8c6] rounded-2xl rounded-bl-none p-3 shadow-sm text-left text-sm">
                <p className="text-gray-800">
                  🐟 <strong>Ciao Giulia!</strong> Stasera abbiamo del tonno fresco fantastico
                  che non vogliamo sprecare.
                </p>
                <p className="text-gray-800 mt-2">
                  Tartare di tonno per 2 → <strong>€8 invece di €22</strong>
                  <br />⏳ Solo 5 porzioni, offerta fino alle 19:30
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 bg-[#25d366] text-white text-xs py-2 rounded-full font-medium">
                    ✅ Prenoto!
                  </button>
                  <button className="flex-1 bg-white text-gray-600 text-xs py-2 rounded-full border">
                    Magari la prossima
                  </button>
                </div>
                <div className="text-right text-xs text-gray-400 mt-1">16:32 ✓✓</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleWaitlist} id="waitlist" className="flex gap-3 max-w-md mx-auto">
            {submitted ? (
              <div className="w-full bg-green-50 text-green-700 py-3 rounded-lg text-center font-medium">
                ✅ Sei in lista! Ti contatteremo presto.
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="la-tua@email.com"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors whitespace-nowrap text-sm"
                >
                  Voglio provarlo →
                </button>
              </>
            )}
          </form>
          <p className="text-xs text-gray-400 mt-3">Prova gratuita 14 giorni · Nessuna carta richiesta · Cancella quando vuoi</p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm font-medium text-gray-700 mt-1">{stat.label}</div>
              <div className="text-xs text-gray-400">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Come funziona</h2>
          <p className="text-center text-gray-600 mb-12">Quattro passi automatici ogni giorno</p>
          <div className="grid md:grid-cols-2 gap-8">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-xl">
                  {step.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-green-600 mb-1">STEP {step.step}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem / Solution ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Il problema che costa €127 al giorno</h2>
              <div className="space-y-4">
                {[
                  { icon: '😤', text: 'Ingredienti freschi che scadono ogni sera' },
                  { icon: '📉', text: 'Marketplace come Too Good To Go diluiscono il brand' },
                  { icon: '🎰', text: 'Clienti cazuali che non tornano a prezzo pieno' },
                  { icon: '⏰', text: 'Nessun tempo per fare marketing manuale' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-gray-600">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">La soluzione CiboSync</h2>
              <div className="space-y-4">
                {[
                  { icon: '✅', text: 'Il tuo agente AI lavora ogni giorno alle 15:00' },
                  { icon: '✅', text: 'WhatsApp con il tuo nome — non un marketplace' },
                  { icon: '✅', text: 'I tuoi clienti fedeli, non deal-hunter anonimi' },
                  { icon: '✅', text: 'Zero lavoro manuale dopo il setup iniziale' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-gray-600 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Cosa dicono i ristoratori</h2>
          <div className="relative">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 card-shadow">
              <div className="text-4xl mb-4">"</div>
              <p className="text-gray-700 text-lg mb-6 italic">
                {TESTIMONIALS[activeTestimonial].quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
                  {TESTIMONIALS[activeTestimonial].name[0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{TESTIMONIALS[activeTestimonial].name}</div>
                  <div className="text-sm text-gray-500">
                    {TESTIMONIALS[activeTestimonial].role} · {TESTIMONIALS[activeTestimonial].restaurant}, {TESTIMONIALS[activeTestimonial].city}
                  </div>
                </div>
                <div className="ml-auto bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  +{TESTIMONIALS[activeTestimonial].recovered}
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === activeTestimonial ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Prezzi semplici</h2>
          <p className="text-center text-gray-600 mb-12">14 giorni gratis · Nessuna carta richiesta · Cancella quando vuoi</p>
          <div className="grid md:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl p-8 ${
                  plan.highlighted
                    ? 'ring-2 ring-green-600 shadow-xl relative'
                    : 'border border-gray-200'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs px-4 py-1 rounded-full font-medium">
                    Più popolare
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-gray-900">€{plan.price}</span>
                  <span className="text-gray-500">/{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-600 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className={`block text-center py-3 rounded-xl font-medium transition-colors ${
                    plan.highlighted
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 px-4 bg-green-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Smetti di buttare €127 al giorno
          </h2>
          <p className="text-green-100 mb-8">
            Unisciti ai ristoratori italiani che usano CiboSync per recuperare il 68% degli sprechi.
            Setup in 4 minuti. Risultati dal primo giorno.
          </p>
          <a
            href="#waitlist"
            className="inline-block bg-white text-green-700 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-shadow"
          >
            Inizia gratis — 14 giorni →
          </a>
          <p className="text-green-200 text-sm mt-4">Nessuna carta richiesta</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍽️</span>
              <span className="font-bold text-white">CiboSync</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-white transition-colors">Termini</a>
              <a href="mailto:hello@cibosync.com" className="hover:text-white transition-colors">Contatti</a>
            </div>
            <div className="text-sm text-gray-500">
              © 2026 CiboSync · Made in Italy 🇮🇹
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
