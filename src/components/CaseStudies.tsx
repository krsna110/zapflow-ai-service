import { motion } from 'motion/react'

const cases = [
  {
    industry: 'Healthcare',
    name: 'Nova Clinic',
    service: 'AI Voice Receptionist',
    metric: 'Missed calls: 40% → 4%',
    desc: 'An AI receptionist now handles 200+ daily calls, books appointments, and routes emergencies — zero hold time.',
  },
  {
    industry: 'Food / E-comm',
    name: 'Urban Eats',
    service: 'AI WhatsApp Agent',
    metric: '200+ daily order queries automated',
    desc: 'From order status to menu suggestions, the WhatsApp agent serves customers faster than any human team could.',
  },
  {
    industry: 'Media',
    name: 'Kavi Studio',
    service: 'AI Video Generation',
    metric: 'Production time cut 70%',
    desc: 'Social reels, product demos, and ad creatives — all generated in minutes instead of days.',
  },
  {
    industry: 'Real Estate',
    name: 'Bright Realty',
    service: 'AI Voice Agent',
    metric: 'Response time: 4hrs → 90sec',
    desc: 'Leads get instant callbacks, property info, and viewing bookings — even at 2am on a Saturday.',
  },
  {
    industry: 'Retail',
    name: 'Loop Fashion',
    service: 'AI Image Generation',
    metric: '500+ product shots in 48hrs',
    desc: 'Studio-quality product photography generated at scale — no photographer, no studio rental.',
  },
]

export default function CaseStudies() {
  return (
    <section id="work" className="py-24 md:py-32 max-w-7xl mx-auto px-8 md:px-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display text-4xl md:text-5xl text-ink font-bold mb-12"
      >
        recent work
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cases.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-white rounded-2xl overflow-hidden border border-black/5 hover:shadow-xl transition-shadow duration-300 group"
          >
            {/* Gradient header bar */}
            <div className="h-2 bg-gradient-to-r from-brand-green/60 to-brand-green/10" />

            <div className="p-7">
              {/* Industry pill */}
              <span className="inline-block bg-brand-green/10 text-xs font-medium text-ink px-3 py-1 rounded-full mb-4">
                {c.industry}
              </span>

              <h3 className="font-display text-xl font-semibold text-ink mb-1">
                {c.name}
              </h3>
              <p className="text-sm text-muted mb-4">{c.service}</p>

              {/* Key metric */}
              <div className="bg-bg-base rounded-xl p-4 mb-4">
                <p className="font-display text-lg font-bold text-ink">{c.metric}</p>
              </div>

              <p className="text-sm text-zinc-500 leading-relaxed mb-4">{c.desc}</p>

              <span className="text-sm font-medium text-ink opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-1">
                view case
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2.5L13 7l-5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
