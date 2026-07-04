import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'

interface MetricItem {
  label: string
  value: number
  suffix: string
  prefix: string
}

const metrics: MetricItem[] = [
  { label: 'projects delivered', value: 5, suffix: '+', prefix: '' },
  { label: 'hrs automated', value: 1200, suffix: '+', prefix: '' },
  { label: 'avg response time', value: 90, suffix: 'sec', prefix: '' },
]

function CountUp({ target, inView }: { target: number; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const stepTime = 16
    const totalSteps = duration / stepTime
    const increment = target / totalSteps

    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [inView, target])

  return <span>{count.toLocaleString()}</span>
}

export default function Metrics() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-8 md:px-16" ref={ref}>
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex-1 bg-white/60 backdrop-blur-xl border border-black/5 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
          >
            <p className="font-display text-4xl md:text-5xl font-bold text-ink mb-2">
              {m.prefix}
              <CountUp target={m.value} inView={isInView} />
              {m.suffix}
            </p>
            <p className="text-sm text-zinc-500">{m.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
