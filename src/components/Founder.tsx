import { motion } from 'motion/react'

const credentials = [
  'Vaidya AI — healthcare diagnostic system',
  'FluxDial — voice AI calling platform',
  'Freelance AI automation clients across India',
]

export default function Founder() {
  return (
    <section id="about" className="py-24 md:py-32 max-w-7xl mx-auto px-8 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-200 to-zinc-300 group">
            {/* Gradient placeholder with initials */}
            <div className="absolute inset-0 bg-gradient-to-br from-ink/80 via-zinc-700 to-ink/90 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-brand-green/20 border-2 border-brand-green/40 flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-3xl font-bold text-brand-green">K</span>
                </div>
                <p className="text-white/40 text-xs uppercase tracking-widest">founder</p>
              </div>
            </div>
            {/* Green accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-green" />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="inline-block bg-brand-green/10 text-xs font-medium text-ink px-3 py-1 rounded-full mb-4">
            meet the founder
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-4">
            Krish
          </h2>
          <p className="text-lg text-zinc-500 mb-6 leading-relaxed">
            Final-year AI/ML engineer building AI agents that actually ship.
            Obsessed with turning complex automation into elegant, deploy-ready systems.
          </p>

          <ul className="space-y-3 mb-8">
            {credentials.map((c) => (
              <li key={c} className="flex items-start gap-3 text-sm text-zinc-600">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                {c}
              </li>
            ))}
          </ul>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-zinc-500 hover:text-ink hover:border-brand-green/40 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-zinc-500 hover:text-ink hover:border-brand-green/40 transition-all duration-200"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
