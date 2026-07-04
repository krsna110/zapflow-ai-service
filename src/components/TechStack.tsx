import { motion } from 'motion/react'

const techs = ['FastAPI', 'LangChain', 'n8n', 'Gemini', 'Groq', 'React']
const doubledTechs = [...techs, ...techs, ...techs, ...techs] // Repeat enough to fill screens and wrap seamlessly

export default function TechStack() {
  return (
    <motion.section
      id="tech-stack"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-10 border-y border-black/5 overflow-hidden w-full relative bg-bg-base/20"
    >
      {/* Left/Right masks for smooth blending */}
      <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-bg-base to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-bg-base to-transparent z-10 pointer-events-none" />

      <div className="w-full flex">
        <div className="animate-marquee flex gap-12 md:gap-16 items-center px-4">
          {doubledTechs.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="font-mono text-xs uppercase tracking-widest text-zinc-500 whitespace-nowrap flex items-center gap-12 md:gap-16"
            >
              {t}
              <span className="text-zinc-300">·</span>
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
