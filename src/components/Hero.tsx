import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'

/* ─── Canvas Particle Background ─── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: {
      x: number
      y: number
      vx: number
      vy: number
      r: number
    }[] = []

    const PARTICLE_COUNT = 70
    const CONNECTION_DIST = 140
    const BRAND_GREEN = '#9fff00'
    const mouse = { x: -9999, y: -9999 }

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    function initParticles() {
      particles = []
      const w = canvas!.offsetWidth
      const h = canvas!.offsetHeight
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 1,
        })
      }
    }

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      // Update positions
      for (const p of particles) {
        // Natural drift
        p.x += p.vx
        p.y += p.vy

        // Mouse repulsion
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            const force = (100 - dist) / 100
            const angle = Math.atan2(dy, dx)
            p.x += Math.cos(angle) * force * 1.8
            p.y += Math.sin(angle) * force * 1.8
          }
        }

        // Keep inside bounds
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > w) { p.x = w; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > h) { p.y = h; p.vy *= -1; }
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        // Connection to mouse
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = particles[i].x - mouse.x
          const dy = particles[i].y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.28
            ctx.beginPath()
            ctx.strokeStyle = BRAND_GREEN
            ctx.globalAlpha = alpha
            ctx.lineWidth = 1.0
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15
            ctx.beginPath()
            ctx.strokeStyle = BRAND_GREEN
            ctx.globalAlpha = alpha
            ctx.lineWidth = 0.8
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath()
        ctx.globalAlpha = 0.25
        ctx.fillStyle = BRAND_GREEN
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    initParticles()
    draw()

    window.addEventListener('resize', () => {
      resize()
      initParticles()
    })
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-[10vh] left-0 w-full h-[90vh] z-0 pointer-events-none"
    />
  )
}

/* ─── Hero Component ─── */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[110vh] w-full flex flex-col items-center justify-start overflow-hidden bg-bg-base"
    >
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Gradient mask at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg-base to-transparent z-[1]" />

      {/* Hero content */}
      <div className="max-w-7xl w-full mx-auto px-8 md:px-16 relative z-10 pt-[28vh] md:pt-[30vh]">
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="font-display text-[2.5rem] md:text-[4rem] lg:text-[4.8rem] font-bold leading-[1.08] tracking-tight"
            >
              <span className="text-ink">ZapFlow builds AI agents that</span>
              <br />
              <span className="text-muted">handle your calls, chats,</span>
              <br />
              <span className="text-muted">content, and{' '}</span>
              {/* Green pill with pulsing dot */}
              <span className="inline-flex items-center justify-center w-[16px] md:w-[42px] h-[16px] md:h-[24px] border-[2px] border-brand-green rounded-full mx-1 align-middle">
                <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse-green" />
              </span>
              {' '}
              <span className="text-muted">customers —</span>
              <br />
              <span className="text-muted">while you sleep.</span>
            </motion.h1>

            {/* WhatsApp CTA Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              className="mt-10 md:mt-12"
            >
              <a
                href="https://wa.me/918103278068"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white rounded-[6px] border border-black/[0.05] p-1 pl-4 shadow-sm hover:shadow-md transition-shadow duration-300 gap-3"
              >
                <span className="text-sm text-zinc-500">
                  Ask us to automate anything...
                </span>
                <span className="bg-ink text-white w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h12m0 0L8 2.5M13 7l-5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Architectural edge anchors */}
      {/* Right — services scroll cue */}
      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 items-center gap-2 bg-white/50 backdrop-blur-lg border border-black/5 rounded-full px-4 py-2 text-xs text-zinc-500 hover:bg-white/80 transition-all duration-300"
      >
        services ↓
      </motion.a>

      {/* Bottom-left — year */}
      <span className="absolute bottom-8 left-8 md:left-16 z-10 text-xs text-zinc-400 tracking-wide">
        2026
      </span>

      {/* Bottom-right — tagline */}
      <span className="absolute bottom-8 right-8 md:right-16 z-10 text-xs text-zinc-400 tracking-wide">
        ai automation agency
      </span>
    </section>
  )
}
