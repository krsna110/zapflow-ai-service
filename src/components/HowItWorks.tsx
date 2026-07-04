import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const steps = [
  {
    num: '01',
    title: 'discover',
    desc: 'We audit your workflows, spot bottlenecks, and map every automation opportunity.',
  },
  {
    num: '02',
    title: 'build',
    desc: 'Custom AI agents are architected, trained on your data, and integrated end-to-end.',
  },
  {
    num: '03',
    title: 'automate',
    desc: 'Agents go live — handling calls, chats, content, and customer interactions 24/7.',
  },
  {
    num: '04',
    title: 'scale',
    desc: 'We monitor, optimize, and expand — your AI workforce grows as you grow.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 md:py-32 max-w-7xl mx-auto px-8 md:px-16"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display text-4xl md:text-5xl text-ink font-bold mb-16"
      >
        how it works
      </motion.h2>

      <div className="relative">
        {/* Connecting line (desktop) */}
        <div className="hidden md:block absolute top-5 left-0 right-0 h-[1px] bg-black/10">
          <motion.div
            className="h-full bg-brand-green origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative"
            >
              {/* Step dot */}
              <div className="w-10 h-10 rounded-full border-2 border-brand-green bg-bg-base flex items-center justify-center mb-4 relative z-10">
                <span className="font-display text-sm font-semibold text-brand-green">
                  {step.num}
                </span>
              </div>

              {/* Mobile connecting line */}
              {i < steps.length - 1 && (
                <div className="md:hidden absolute top-10 left-5 w-[1px] h-8 bg-black/10" />
              )}

              <h3 className="font-display text-lg font-semibold text-ink mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
