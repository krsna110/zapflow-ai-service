import { motion } from 'motion/react'

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="22" height="16" rx="2" />
        <path d="M10 25h8" />
        <path d="M14 21v4" />
        <path d="M9 12l3 2-3 2" />
        <path d="M15 16h4" />
      </svg>
    ),
    name: 'AI Video',
    desc: 'Auto-generated product demos, social reels, and explainers — no cameras, no crew.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 20.5l3-3.5h5l2 2h6l3 3.5" />
        <path d="M8 14V8a4 4 0 018 0v6" />
        <circle cx="14" cy="18" r="6" />
        <path d="M14 15v4" />
        <path d="M12 17h4" />
      </svg>
    ),
    name: 'AI WhatsApp Agent',
    desc: 'Instant replies, order tracking, FAQs — your 24/7 customer rep that never clocks out.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="20" height="20" rx="3" />
        <circle cx="10" cy="10" r="2" />
        <path d="M4 20l5-5 3 3 5-5 7 7" />
      </svg>
    ),
    name: 'AI Images',
    desc: 'Product photography, marketing creatives, and brand visuals generated at scale.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a9 9 0 019 9v1a5 5 0 01-5 5h-1" />
        <circle cx="10" cy="18" r="5" />
        <path d="M10 16v4" />
        <path d="M8 18h4" />
        <path d="M4 8l2 2" />
        <path d="M7 4l1 2" />
      </svg>
    ),
    name: 'AI Voice Agent',
    desc: 'Picks up calls, books appointments, qualifies leads — with a voice your customers trust.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h20" />
        <path d="M4 12h14" />
        <path d="M4 18h8" />
        <path d="M4 24h16" />
        <circle cx="22" cy="18" r="4" />
        <path d="M22 16v4" />
        <path d="M20 18h4" />
      </svg>
    ),
    name: 'AI Content',
    desc: 'Blog posts, captions, scripts, and newsletters — AI-drafted, human-approved.',
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 max-w-7xl mx-auto px-8 md:px-16">
      <motion.h2
        {...fadeInUp}
        className="font-display text-4xl md:text-5xl text-ink font-bold"
      >
        what we automate
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        {services.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-white/60 backdrop-blur-xl border border-black/5 rounded-2xl p-8 hover:border-brand-green/40 hover:-translate-y-1 transition-all duration-300 group cursor-default"
          >
            <div className="mb-5 text-ink group-hover:text-brand-green transition-colors duration-300">
              {s.icon}
            </div>
            <h3 className="font-display text-xl font-semibold text-ink mb-2">{s.name}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
