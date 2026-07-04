import { motion } from 'motion/react'

const testimonials = [
  {
    quote:
      'They shipped our AI receptionist in under two weeks. We went from losing 40% of calls to missing almost none. Genuinely transformative.',
    attribution: '— Healthcare client, Bhopal',
  },
  {
    quote:
      'The WhatsApp agent handles 200+ queries a day without breaking a sweat. Our support team can finally focus on the complex stuff.',
    attribution: '— E-commerce client, Mumbai',
  },
  {
    quote:
      'We needed 500 product shots in 48 hours. They delivered studio-quality images without a single photographer. Insane turnaround.',
    attribution: '— Retail client, Pune',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 max-w-7xl mx-auto px-8 md:px-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display text-4xl md:text-5xl text-ink font-bold mb-12"
      >
        what they say
      </motion.h2>

      {/* Desktop grid / mobile horizontal scroll */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white/60 backdrop-blur-xl border border-black/5 rounded-2xl p-8 flex flex-col justify-between"
          >
            {/* Quote mark */}
            <div className="mb-4">
              <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                <path
                  d="M0 24V14.4C0 6.4 5.6 1.6 12 0l1.6 3.2C8.8 4.8 6.4 8 6.4 12H12v12H0zm18 0V14.4C18 6.4 23.6 1.6 30 0l1.6 3.2C26.8 4.8 24.4 8 24.4 12H30v12H18z"
                  fill="#9fff00"
                  opacity="0.3"
                />
              </svg>
            </div>
            <p className="text-zinc-600 italic leading-relaxed text-[15px] mb-6 flex-1">
              "{t.quote}"
            </p>
            <p className="text-xs text-zinc-400 font-medium">{t.attribution}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
